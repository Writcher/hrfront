import { Button, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchMeses } from "@/services/mes/service.mes";
import { fetchJornadas } from "@/services/jornada/service.jornada";
import { useEffect } from "react";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { Formulario } from "../tablaResumen/tablaResumenFiltrosFormulario";
import { TablaResumen } from "../tablaResumen/tablaResumen";
import { filaExpandidaEmpleadoProps } from "../../types";
import { useFiltros } from "../../hooks/useFiltrosHijoRRHH";
import { useTablaJornadaResumenFormulario } from "../../hooks/useTablaJornadasResumenFormulario";

export function FilaExpandidaRRHH({
    idFilaExpandida,
    idFilaExpandidaProp
}: filaExpandidaEmpleadoProps) {
    
    const { showWarning } = useSnackbar();

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchDatosSelectTablaJornadas"],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });

    const { watch, setValue } = useTablaJornadaResumenFormulario({ meses: selectDatos });

    const {
        handleLimpiarFiltros,
        handleCambioFiltroMes,
        handleCambioFiltroQuincena
    } = useFiltros({ setValue });

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

    useEffect(() => {
        if (selectError) {
            showWarning("Error al cargar los datos");
        };
        if (jornadasError) {
            showWarning("Error al cargar jornadas");
        };
    }, [selectError, jornadasError, showWarning]);

    return (
        <TableRow className={`${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: "4px" }}>
                <div className="flex flex-col gap-2 items-start justify-center h-full rounded bg-white p-[5px] pt-[10px]" style={{ border: "2px solid #ED6C02", }}>
                    <div className="flex flex-row gap-2 w-full h-11 items-center">
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            className="!h-[40px]"
                            disableElevation
                            onClick={handleLimpiarFiltros}
                        >
                            Limpiar Quincena
                        </Button>
                        <Formulario
                            filtroMes={watch("filtroMes")}
                            filtroQuincena={watch("filtroQuincena")}
                            selectCargando={selectCargando}
                            selectDatos={selectDatos}
                            onCambioFiltroMes={handleCambioFiltroMes}
                            onCambioFiltroQuincena={handleCambioFiltroQuincena}
                        />
                        <div className="flex grow" />
                    </div>
                    <div className="flex grow flex-col justify-between w-full">
                        <TablaResumen
                            resumen={jornadasDatos?.resumen}
                            cargando={jornadasCargando}
                        />
                    </div>
                </div>
            </TableCell>
        </TableRow >
    )
};