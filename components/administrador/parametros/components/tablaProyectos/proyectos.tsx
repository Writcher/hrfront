import { Button, TablePagination } from "@mui/material";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { fetchProyectosABM, insertProyecto } from "@/services/proyecto/service.proyecto";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";
import { TablaProyectos } from "./tablaProyectos";
import { useProyectoFormulario } from "../../hooks/useProyectoFormulario";
import { insertProyectoParametros, proyectoFormularioDatos } from "../../types";
import { Botones } from "./crearProyectoFormularioBotones";
import { Formulario } from "./crearProyectoFormulario";
import { fetchModalidadesTrabajo } from "@/services/modalidadtrabajo/service.modalidadtrabajo";
import { usePaginacion } from "@/components/hooks/usePaginacion";

export default function Proyectos() {

    const { formularioVisible, setFormularioVisible } = useMostrarFormulario();

    const { showError, showWarning, showSuccess } = useSnackbar();

    const { control, formState: { isValid }, setValue, handleSubmit, reset } = useProyectoFormulario()

    const {
        pagina,
        filasPorPagina,
        handleCambioPagina,
        handleCambioFilasPorPagina
    } = usePaginacion({ filasIniciales: 25 })

    const { data: proyectosDatos, isLoading: proyectosCargando, isError: proyectosError, refetch: proyectosRefetch } = useQuery({
        queryKey: [
            "fetchProyectosABM",
            pagina,
            filasPorPagina
        ],
        queryFn: () => fetchProyectosABM({
            pagina: pagina,
            filasPorPagina: filasPorPagina,
        }),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchModalidadesTrabajo"],
        queryFn: () => fetchModalidadesTrabajo(),
        refetchOnWindowFocus: false,
    });

    const mutacionCreate = useMutation({
        mutationFn: (data: insertProyectoParametros) => insertProyecto(data),
        onSuccess: () => {
            proyectosRefetch();
            reset();
            setFormularioVisible(false);
            showSuccess("Proyecto creado correctamente");
        },
        onError: () => {
            showError("Error al crear proyecto");
        },
    });

    const onSubmit = (data: proyectoFormularioDatos) => {
        mutacionCreate.mutate({
            nombre: data.nombre,
            id_modalidadtrabajo: data.id_modalidadtrabajo as number,
        });
    };

    useEffect(() => {
        if (proyectosError) {
            showWarning("Error al cargar proyectos")
        };
        if (selectError) {
            showWarning("Error al cargar los datos")
        };
    }, [proyectosError, selectError])

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
                        {"Cargar Proyecto"}
                    </Button>
                }
            </div>
            {formularioVisible
                ?   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center w-full h-full">
                        <Formulario
                            control={control}
                            cargando={selectCargando}
                            modalidadesTrabajo={selectDatos || []}
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
                        proyectos={proyectosDatos?.proyectos || []}
                        cargando={proyectosCargando}
                    />
                    {(proyectosCargando || (proyectosDatos?.proyectos.length ?? 0) > 0) && (
                        <div className="flex justify-end items-center overflow-x-hide"
                            style={{ borderTop: "2px solid #ED6C02" }}>
                            <TablePagination
                                rowsPerPageOptions={[25, 50, 75, 100]}
                                component="div"
                                count={proyectosDatos?.totalProyectos || 0}
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