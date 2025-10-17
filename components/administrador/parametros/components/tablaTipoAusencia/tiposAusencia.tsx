import { Button, TablePagination } from "@mui/material";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";
import { TablaProyectos } from "./tablaTiposAusencia";
import { insertTipoAusenciaParametros, tipoAusenciaFormularioDatos } from "../../types";
import { Botones } from "./crearTiposAusenciaFormularioBotones";
import { Formulario } from "./crearTiposAusenciaFormulario";
import { usePaginacion } from "@/components/hooks/usePaginacion";
import { useTipoAusenciaFormulario } from "../../hooks/useTipoAusenciaFormulario";
import { fetchTiposAusenciaABM, insertTipoAusencia } from "@/services/tipoausencia/service.tipoausencia";

export default function Proyectos() {

    const { formularioVisible, setFormularioVisible } = useMostrarFormulario();

    const { showError, showWarning, showSuccess } = useSnackbar();

    const { control, formState: { isValid }, setValue, handleSubmit, reset } = useTipoAusenciaFormulario()

    const {
        pagina,
        filasPorPagina,
        handleCambioPagina,
        handleCambioFilasPorPagina
    } = usePaginacion({ filasIniciales: 25 })

    const { data: tiposAusenciaDatos, isLoading: tiposAusenciaCargando, isError: tiposAusenciaError, refetch: tiposAusenciaRefetch } = useQuery({
        queryKey: [
            "fetchTiposAusenciaABM",
            pagina,
            filasPorPagina
        ],
        queryFn: () => fetchTiposAusenciaABM({
            pagina: pagina,
            filasPorPagina: filasPorPagina,
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const mutacionCreate = useMutation({
        mutationFn: (data: insertTipoAusenciaParametros) => insertTipoAusencia(data),
        onSuccess: () => {
            tiposAusenciaRefetch();
            reset();
            setFormularioVisible(false);
            showSuccess("Tipo de Ausencia creado correctamente");
        },
        onError: () => {
            showError("Error al crear Tipo de Ausencia");
        },
    });

    const onSubmit = (data: tipoAusenciaFormularioDatos) => {
        mutacionCreate.mutate({
            nombre: data.nombre,
        });
    };

    useEffect(() => {
        if (tiposAusenciaError) {
            showWarning("Error al cargar Tipos de Ausencia")
        };
    }, [tiposAusenciaError])

    return (
        <div className="flex flex-col gap-1 items-start w-full h-full">
            <div className="flex flex-row gap-2 w-full p-1">
                <div className="flex grow" />
                {!formularioVisible &&
                    <Button
                        variant="contained"
                        color={"success"}
                        size="small"
                        className="!h-[40px]"
                        disableElevation
                        onClick={() => setFormularioVisible(!formularioVisible)}
                        endIcon={<AddRoundedIcon />}
                    >
                        {"Cargar Tipo"}
                    </Button>
                }
            </div>
            {formularioVisible
                ?   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center w-full h-full">
                        <Formulario
                            control={control}
                        />
                        <Botones
                            creando={mutacionCreate.isPending}
                            handleMostrarFormulario={() => {
                                reset();
                                setFormularioVisible(false);
                            }}
                            camposValidos={isValid}
                        />
                    </form>
                : <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded border-2 border-[#ED6C02]">
                    <TablaProyectos
                        tiposAusencia={tiposAusenciaDatos?.tiposAusencia || []}
                        cargando={tiposAusenciaCargando}
                    />
                    {(tiposAusenciaCargando || (tiposAusenciaDatos?.tiposAusencia.length ?? 0) > 0) && (
                        <div className="flex justify-end items-center overflow-x-hide"
                            style={{ borderTop: "2px solid #ED6C02" }}>
                            <TablePagination
                                rowsPerPageOptions={[25, 50, 75, 100]}
                                component="div"
                                count={tiposAusenciaDatos?.totalTiposAusencia || 0}
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
            }
        </div>
    );
};