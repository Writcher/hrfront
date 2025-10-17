"use client"

import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useConsultaFormulario } from "./hooks/useConsultaFormulario";
import { usePaginacion } from "@/components/hooks/usePaginacion";
import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { fetchPresentes } from "@/services/empleado/service.empleado";
import { Button, TablePagination } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { TablaPresentes } from "./components/tablaPresentes";
import Link from "next/link";
import { Formulario } from "./components/tablaPresentesFormulario";

export default function Presentes() {

    const { control, watch, formState: { isValid } } = useConsultaFormulario();

    const { showWarning } = useSnackbar();

    const { pagina, filasPorPagina, handleCambioPagina, handleCambioFilasPorPagina } = usePaginacion({ filasIniciales: 50 });

    const [primeraBusqueda, setPrimeraBusqueda] = useState<boolean>(false);

    const { data: proyectosDatos, isLoading: proyectosCargando, isError: proyectosError } = useQuery({
        queryKey: ["fetchProyectos"],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false,
    });

    const { data: presentesDatos, isLoading: presentesCargando, isError: presentesError, refetch: presentesRefetch } = useQuery({
        queryKey: [
            "fetchPresentes",
            pagina,
            filasPorPagina,
        ],
        queryFn: () => fetchPresentes({
            pagina: pagina,
            filasPorPagina: filasPorPagina,
            fecha: watch("fecha"),
            proyecto: watch("proyecto"),
        }),
        refetchOnWindowFocus: false,
        enabled: !!watch("proyecto") && !!watch("fecha") && primeraBusqueda,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (proyectosError) {
            showWarning("Error al cargar los datos");
        };
        if (presentesError) {
            showWarning("Error al cargar empleados presentes");
        };
    }, [proyectosError, presentesError]);

    return (
        <div className="flex flex-col gap-1 items-start w-full h-full">
            <div className="flex flex-row gap-2 w-full">
                <Formulario
                    control={control}
                    cargando={proyectosCargando}
                    proyectos={proyectosDatos || []}
                />
                <div className="flex grow" />
                <Button
                    variant="contained"
                    color="success"
                    disableElevation
                    endIcon={<SearchRoundedIcon />}
                    disabled={!isValid}
                    onClick={() => {
                        setPrimeraBusqueda(true);
                        presentesRefetch();
                    }}
                >
                    Consultar Informacion
                </Button>
            </div>
            <div className="flex flex-row gap-1 w-full">
                <div className="flex justify-center items-center gap-2 border-2 border-[#ED6C02] p-2 rounded w-full text-gray-700">Total: {presentesDatos ? presentesDatos.totalPresentes : "-"}</div>
                <div className="flex justify-center items-center gap-2 border-2 border-[#ED6C02] p-2 rounded w-full text-gray-700">Total Directos: {presentesDatos ? presentesDatos.totalJornaleros : "-"}</div>
                <div className="flex justify-center items-center gap-2 border-2 border-[#ED6C02] p-2 rounded w-full text-gray-700">Total Indirectos: {presentesDatos ? presentesDatos.totalMensualizados : "-"}</div>
            </div>
            <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded" style={{ border: "2px solid #ED6C02" }}>
                <TablaPresentes
                    empleados={presentesDatos?.presentes || []}
                    pagina={pagina}
                    filas={filasPorPagina}
                    cargando={presentesCargando}
                />
                {(presentesCargando || (presentesDatos?.presentes.length ?? 0) > 0) && (
                    <div className="flex justify-end items-center overflow-x-hide"
                        style={{ borderTop: "2px solid #ED6C02" }}>
                        <TablePagination
                            rowsPerPageOptions={[50, 75, 100]}
                            component="div"
                            count={presentesDatos?.totalPresentes || 0}
                            rowsPerPage={filasPorPagina}
                            page={pagina}
                            onPageChange={handleCambioPagina}
                            onRowsPerPageChange={handleCambioFilasPorPagina}
                            labelRowsPerPage="Filas por página"
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                            }
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
            <div className="flex w-full justify-between">
                <Button
                    component={Link}
                    variant="contained"
                    color="warning"
                    href={"/administrativo/empleados"}
                    disableElevation
                    startIcon={<ArrowBackRoundedIcon />}
                >
                    Empleados
                </Button>
            </div>
        </div>
    );
};