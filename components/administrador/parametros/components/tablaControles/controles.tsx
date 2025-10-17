import { Button, TablePagination } from "@mui/material";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";
import { controlFormularioDatos, insertControlParametros } from "../../types";
import { Botones } from "./crearControlesFormularioBotones";
import { Formulario } from "./crearControlesFormulario";
import { fetchControlesABM, insertControl } from "@/services/control/service.control";
import { useControlFormulario } from "../../hooks/useControlFormulario";
import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { TablaControles } from "./tablaControles";
import { usePaginacion } from "@/components/hooks/usePaginacion";

export default function Controles() {

    const { formularioVisible, setFormularioVisible } = useMostrarFormulario();

    const { showError, showWarning, showSuccess } = useSnackbar();

    const { control, formState: { isValid }, setValue, handleSubmit, reset } = useControlFormulario()

    const {
        pagina,
        filasPorPagina,
        handleCambioPagina,
        handleCambioFilasPorPagina
    } = usePaginacion({ filasIniciales: 25 })

    const { data: controlesDatos, isLoading: controlesCargando, isError: controlesError, refetch: controlesRefetch } = useQuery({
        queryKey: [
            "fetchControlesABM",
            pagina,
            filasPorPagina
        ],
        queryFn: () => fetchControlesABM({
            pagina: pagina,
            filasPorPagina: filasPorPagina,
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchProyectos"],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false,
    });

    const mutacionCreate = useMutation({
        mutationFn: (data: insertControlParametros) => insertControl(data),
        onSuccess: () => {
            controlesRefetch();
            reset();
            setFormularioVisible(false);
            showSuccess("Control creado correctamente");
        },
        onError: () => {
            showError("Error al crear control");
        },
    });

    const onSubmit = (data: controlFormularioDatos) => {
        mutacionCreate.mutate({
            serie: data.serie,
            id_proyecto: data.id_proyecto as number,
        });
    };

    useEffect(() => {
        if (controlesError) {
            showWarning("Error al cargar controles")
        };
        if (selectError) {
            showWarning("Error al cargar los datos")
        };
    }, [controlesError, selectError])

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
                        {"Cargar Control"}
                    </Button>
                }
            </div>
            {formularioVisible
                ?   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center w-full h-full">
                        <Formulario
                            control={control}
                            cargando={selectCargando}
                            proyectos={selectDatos || []}
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
                :   <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded border-2 border-[#ED6C02]">
                        <TablaControles
                            controles={controlesDatos?.controles || []}
                            cargando={controlesCargando}
                        />
                        {(controlesCargando || (controlesDatos?.controles.length ?? 0) > 0) && (
                            <div className="flex justify-end items-center overflow-x-hide"
                                style={{ borderTop: "2px solid #ED6C02" }}>
                                <TablePagination
                                    rowsPerPageOptions={[25, 50, 75, 100]}
                                    component="div"
                                    count={controlesDatos?.totalControles || 0}
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