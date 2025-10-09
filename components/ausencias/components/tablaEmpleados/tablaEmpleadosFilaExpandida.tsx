import { TableCell, TablePagination, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { TablaAusencias } from "../tablaAusencias/tablaAusencias";
import { filaExpandidaProps } from "../../types";
import { fetchJornadas } from "@/services/jornada/service.jornada";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";
import { usePaginacion } from "@/components/hooks/usePaginacion";

export function FilaExpandida({ idFilaExpandida, idFilaExpandidaProp, filtroTipoAusencia, filtroMes, filtroQuincena }: filaExpandidaProps) {

    const { showWarning } = useSnackbar();

    const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 16 });

    const { data: jornadasDatos, isLoading: jornadasCargando, isError: jornadasError, refetch: jornadasRefetch } = useQuery({
        queryKey: [
            "fetchAusenciasEmpleado",
            idFilaExpandida,
            filtroMes,
            filtroQuincena,
            pagina,
            filasPorPagina,
            filtroTipoAusencia,
        ],
        queryFn: () => fetchJornadas({
            id_empleado: idFilaExpandida,
            filtroMes: filtroMes,
            filtroQuincena: filtroQuincena,
            filtroMarcasIncompletas: false,
            pagina: pagina,
            filasPorPagina: filasPorPagina,
            ausencias: true,
            filtroTipoAusencia: filtroTipoAusencia,
        }),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (jornadasError) {
            showWarning("Error al cargar jornadas");
        };
    }, [jornadasDatos, showWarning]);

    return (
        <TableRow className={`${idFilaExpandida === idFilaExpandidaProp ? 'bg-orange-100' : ''}`}>
            <TableCell colSpan={3} sx={{ padding: "4px" }}>
                <div className="flex flex-col gap-2 items-start justify-center h-full rounded bg-white p-[5px]" style={{ border: "2px solid #ED6C02", }}>
                    <div className="flex grow flex-col justify-between w-full">
                        <TablaAusencias
                            jornadas={jornadasDatos?.jornadas}
                            cargando={jornadasCargando}
                            filas={filasPorPagina}
                            filtroTipoAusencia={filtroTipoAusencia}
                        />
                        {(jornadasCargando || (jornadasDatos?.jornadas.length ?? 0) > 0) && (
                            <div className="flex justify-end items-end overflow-x-hide">
                                <TablePagination
                                    rowsPerPageOptions={[16, 31]}
                                    component="div"
                                    count={jornadasDatos?.totalJornadas || 0}
                                    rowsPerPage={filasPorPagina}
                                    page={pagina}
                                    onPageChange={handleCambioPagina}
                                    onRowsPerPageChange={handleCambioFilasPorPagina}
                                    labelRowsPerPage="Filas por página"
                                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
                                    slotProps={{
                                        select: {
                                            MenuProps: {
                                                anchorOrigin: { vertical: "top", horizontal: "right" },
                                                transformOrigin: { vertical: "top", horizontal: "left" }
                                            },
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
};