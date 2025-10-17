import { Chip, MenuItem, TableCell, TableRow, TextField } from "@mui/material";
import { deleteProyectoParametros, editProyectoParametros, filaProyectoProps, modalidadTrabajo, proyectoFormularioDatos } from "../../types";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProyecto, editProyecto } from "@/services/proyecto/service.proyecto";
import { useProyectoFormulario } from "../../hooks/useProyectoFormulario";
import { useConfirmar } from "@/components/hooks/useConfirmar";
import { fetchModalidadesTrabajo } from "@/services/modalidadtrabajo/service.modalidadtrabajo";
import { useEffect } from "react";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import { Controller } from "react-hook-form";
import { BotonesFila } from "./filaProyectoBotones";

export default function FilaProyecto({ proyecto }: filaProyectoProps) {

    const { showError, showWarning, showSuccess } = useSnackbar();

    const { control, formState: { isValid }, setValue, handleSubmit, reset } = useProyectoFormulario()

    const { confirmar: confirmarBorrar, handleConfirmar: handleConfirmarBorrar } = useConfirmar();

    const { formularioVisible, setFormularioVisible } = useMostrarFormulario();

    const queryClient = useQueryClient();

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchModalidadesTrabajo"],
        queryFn: () => fetchModalidadesTrabajo(),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (proyecto) {
            setValue('nombre', proyecto.nombre ? proyecto.nombre : '');
            setValue('id_modalidadtrabajo', proyecto.id_modalidadtrabajo ? proyecto.id_modalidadtrabajo : '');
        };
    }, [proyecto, setValue, formularioVisible]);

    const mutacionEdit = useMutation({
        mutationFn: (data: editProyectoParametros) => editProyecto(data),
        onSuccess: () => {
            reset();
            setFormularioVisible(!formularioVisible)
            showSuccess("Proyecto editado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchProyectosABM"]
            });
        },
        onError: () => {
            showError("Error al eliminar proyecto");
        },
    });

    const onEdit = (data: proyectoFormularioDatos) => {
        mutacionEdit.mutate({
            id_proyecto: proyecto.id,
            nombre: data.nombre,
            id_modalidadtrabajo: data.id_modalidadtrabajo as number,
        });
    };

    const mutacionDelete = useMutation({
        mutationFn: (data: deleteProyectoParametros) => deleteProyecto(data),
        onSuccess: () => {
            reset();
            showSuccess("Proyecto eliminado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchProyectosABM"]
            });
        },
        onError: () => {
            showError("Error al eliminar proyecto");
        },
    });

    const onDelete = () => {
        mutacionDelete.mutate({
            id_proyecto: proyecto.id
        });
    };

    useEffect(() => {
        if (selectError) {
            showWarning("Error al cargar los datos")
        };
    }, [selectError])

    return (
        <TableRow>
            <TableCell align="left" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {proyecto.id}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible ? (
                        <Controller
                            name="nombre"
                            control={control}
                            rules={{ required: "Debe ingresar un nombre" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="nombre"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    ) : (
                        <>
                            {proyecto.nombre}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible ? (
                        <Controller
                            name="id_modalidadtrabajo"
                            control={control}
                            rules={{ required: "Debe seleccionar una modalidad" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="id_tipoempleado"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    select
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    disabled={selectDatos?.length === 0 || !selectDatos}
                                >
                                    {selectDatos?.map((modalidadtrabajo: modalidadTrabajo) => (
                                        <MenuItem key={modalidadtrabajo.id} value={modalidadtrabajo.id}>
                                            {modalidadtrabajo.nombre}
                                        </MenuItem>
                                    )) || []}
                                </TextField>
                            )}
                        />
                    ) : (
                        <>
                            {proyecto.modalidadtrabajo}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    <Chip
                        label={proyecto.estadoparametro}
                        className="!rounded"
                        color={proyecto.estadoparametro.toLowerCase() === 'activo' ? 'success' : 'error'}
                    />
                </div>
            </TableCell>
            <TableCell align="right" size="small">
                <BotonesFila
                    editando={mutacionEdit.isPending}
                    borrando={mutacionDelete.isPending}
                    isValid={isValid}
                    formularioVisible={formularioVisible}
                    handleMostrarFormulario={() => {
                        reset();
                        setFormularioVisible(!formularioVisible);
                    }}
                    handleSubmit={handleSubmit(onEdit)}
                    onDelete={onDelete}
                    confirmarBorrar={confirmarBorrar}
                    onClickBorrar={handleConfirmarBorrar}
                    estado={proyecto.estadoparametro}
                />
            </TableCell>
        </TableRow>
    );
};