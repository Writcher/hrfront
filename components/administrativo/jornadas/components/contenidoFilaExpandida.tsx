import { Button, TableCell, TablePagination, TableRow } from "@mui/material";
import { useFiltrosInteriores } from "../hooks/useFiltrosInteriores";
import { usePaginacionInterna } from "../hooks/usePaginacionInterna";
import { useQuery } from "@tanstack/react-query";

import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { FormularioFiltros } from "./formularioFiltrosInteriores";
import { TablaJornadas } from "./tablaJornadas";
import { fetchDatosSelectTablaJornadas, fetchJornadasEmpleado } from "@/services/jornadas/service.jornadas";

interface ContenidoFilaExpandidaProps {
    idFilaExpandida: number,
    idFilaExpandidaProp: number,
    watch: any,
    setValue: any,
}

export function ContenidoFilaExpandida({
    idFilaExpandida,
    idFilaExpandidaProp,
    watch,
    setValue
}: ContenidoFilaExpandidaProps) {
    const filtros = useFiltrosInteriores(setValue, watch);
    const paginacion = usePaginacionInterna(setValue, watch);

    const { data: selectDatos, isLoading: selectCargando } = useQuery({
        queryKey: ["fetchDatosSelectTablaJornadas"],
        queryFn: () => fetchDatosSelectTablaJornadas(),
        refetchOnWindowFocus: false
    });

    const { data: jornadasDatos, isLoading: jornadasCargando, isError: jornadasError } = useQuery({
        queryKey: ["fetchJornadasEmpleado", idFilaExpandida, watch("filtroMes"), watch("filtroQuincena"), watch("filtroMarcasIncompletas"), paginacion.pagina, paginacion.filasPorPagina],
        queryFn: () => fetchJornadasEmpleado({
            idEmpleado: idFilaExpandida,
            filtroMes: watch("filtroMes"),
            filtroQuincena: watch("filtroQuincena"),
            filtroMarcasIncompletas: watch("filtroMarcasIncompletas"),
            pagina: paginacion.pagina,
            filasPorPagina: paginacion.filasPorPagina
        }),
        refetchOnWindowFocus: false
    });
    return (
        <TableRow className={`cursor-pointer ${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3}>
                <div className="flex flex-col gap-4 items-start justify-center h-full rounded bg-white pt-2 px-2" style={{ border: "2px solid #ED6C02", }}>
                    <div className="flex flex-row gap-2 w-full h-11">
                        <Button
                            variant="contained"
                            color="error"
                            disableElevation
                            onClick={filtros.handleLimpiarFiltros}
                            endIcon={<FilterAltOffRoundedIcon />}
                        >
                            Limpiar Filtro
                        </Button>
                        <FormularioFiltros
                            filtroMes={watch("filtroMes")}
                            filtroQuincena={watch("filtroQuincena")}
                            filtroMarcasIncompletas={watch("filtroMarcasIncompletas")}
                            selectCargando={selectCargando}
                            selectDatos={selectDatos}
                            onCambioFiltroMes={filtros.handleCambioFiltroMes}
                            onCambioFiltroQuincena={filtros.handleCambioFiltroQuincena}
                            onCambioFiltroMarcaIncompleta={filtros.handleCambioFiltroMarcasIncompletas}
                            getNombreMes={filtros.getNombreMes}
                        />
                        <div className="flex grow" />
                    </div>
                    <div className="flex grow flex-col justify-between w-full">
                        <TablaJornadas
                            jornadasDatos={jornadasDatos}
                            jornadasCargando={jornadasCargando}
                            filasPorPagina={paginacion.filasPorPagina}
                        />
                        <div className="flex justify-end items-end overflow-x-hide">
                            <TablePagination
                                rowsPerPageOptions={[16, 31]}
                                component="div"
                                count={jornadasDatos?.totalJornadas || 0}
                                rowsPerPage={paginacion.filasPorPagina}
                                page={paginacion.pagina}
                                onPageChange={paginacion.handleCambioPagina}
                                onRowsPerPageChange={paginacion.handleCambioFilasPorPagina}
                                labelRowsPerPage="Filas por página"
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
                                slotProps={{
                                    select: {
                                        MenuProps: {
                                            anchorOrigin: {
                                                vertical: "top",
                                                horizontal: "right",
                                            },
                                            transformOrigin: {
                                                vertical: "top",
                                                horizontal: "left",
                                            }
                                        },
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
};