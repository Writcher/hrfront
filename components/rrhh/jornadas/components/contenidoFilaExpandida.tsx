import { Button, TableCell, TableRow } from "@mui/material";
import { useFiltrosInteriores } from "../hooks/useFiltrosInteriores";
import { usePaginacion } from "../hooks/usePaginacion";
import { useQuery } from "@tanstack/react-query";
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { FormularioFiltros } from "./formularioFiltrosInteriores";
import { TablaJornadas } from "./tablaJornadas";
import { useTablaJornadaFormulario } from "../hooks/useTablaJornadasFormulario";
import { fetchMeses } from "@/services/mes/service.mes";
import { fetchJornadas } from "@/services/jornada/service.jornada";

interface ContenidoFilaExpandidaProps {
    idFilaExpandida: number,
    idFilaExpandidaProp: number,
}

export function ContenidoFilaExpandida({
    idFilaExpandida,
    idFilaExpandidaProp
}: ContenidoFilaExpandidaProps) {
    const { data: selectDatos, isLoading: selectCargando } = useQuery({
        queryKey: ["fetchDatosSelectTablaJornadas"],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });

    const { watch, setValue } = useTablaJornadaFormulario({ meses: selectDatos });

    const filtros = useFiltrosInteriores(setValue, watch);

    const { data: jornadasDatos, isLoading: jornadasCargando, isError: jornadasError } = useQuery({
        queryKey: [
            "fetchJornadasEmpleado",
            idFilaExpandida,
            watch("filtroMes"),
            watch("filtroQuincena"),
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: watch("filtroMes"),
            filtroQuincena: watch("filtroQuincena"),
        }),
        refetchOnWindowFocus: false
    });
    return (
        <TableRow className={`cursor-pointer ${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: "4px" }}>
                <div className="flex flex-col gap-2 items-start justify-center h-full rounded bg-white p-[5px] pt-[10px]" style={{ border: "2px solid #ED6C02", }}>
                    <div className="flex flex-row gap-2 w-full h-11 items-center">
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            className="!h-[40px]"
                            disableElevation
                            onClick={filtros.handleLimpiarFiltros}
                        >
                            Limpiar Quincena
                        </Button>
                        <FormularioFiltros
                            filtroMes={watch("filtroMes")}
                            filtroQuincena={watch("filtroQuincena")}
                            selectCargando={selectCargando}
                            selectDatos={selectDatos}
                            onCambioFiltroMes={filtros.handleCambioFiltroMes}
                            onCambioFiltroQuincena={filtros.handleCambioFiltroQuincena}
                            getNombreMes={filtros.getNombreMes}
                        />
                        <div className="flex grow" />
                    </div>
                    <div className="flex grow flex-col justify-between w-full">
                        <TablaJornadas
                            jornadasDatos={jornadasDatos}
                            jornadasCargando={jornadasCargando}
                        />
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
};