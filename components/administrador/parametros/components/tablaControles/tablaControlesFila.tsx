import { Chip, MenuItem, TableCell, TableRow, TextField } from "@mui/material";
import { controlFormularioDatos, deleteControlParametros, deleteProyectoParametros, editControlParametros, editProyectoParametros, filaControlProps, filaProyectoProps, modalidadTrabajo, proyectoSelect } from "../../types";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProyecto, editProyecto, fetchProyectos } from "@/services/proyecto/service.proyecto";
import { useConfirmar } from "@/components/hooks/useConfirmar";
import { useEffect } from "react";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import { Controller } from "react-hook-form";
import { BotonesFila } from "./filaControlesBotones";
import { useControlFormulario } from "../../hooks/useControlFormulario";
import { deleteControl, editControl } from "@/services/control/service.control";

export default function FilaControl({ control }: filaControlProps) {

    const { showError, showWarning, showSuccess } = useSnackbar();

    const { control: controlForm, formState: { isValid }, setValue, handleSubmit, reset } = useControlFormulario()

    const { confirmar: confirmarBorrar, handleConfirmar: handleConfirmarBorrar } = useConfirmar();

    const { formularioVisible, setFormularioVisible } = useMostrarFormulario();

    const queryClient = useQueryClient();

    const { data: selectDatos, isLoading: selectCargando, isError: selectError } = useQuery({
        queryKey: ["fetchProyectos"],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (control) {
            setValue('serie', control.serie ? control.serie : '');
            setValue('id_proyecto', control.id_proyecto ? control.id_proyecto : '');
        };
    }, [control, setValue, formularioVisible]);

    const mutacionEdit = useMutation({
        mutationFn: (data: editControlParametros) => editControl(data),
        onSuccess: () => {
            reset();
            setFormularioVisible(!formularioVisible)
            showSuccess("Control editado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchControlesABM"]
            });
        },
        onError: () => {
            showError("Error al eliminar control");
        },
    });

    const onEdit = (data: controlFormularioDatos) => {
        mutacionEdit.mutate({
            id_control: control.id,
            serie: data.serie,
            id_proyecto: data.id_proyecto as number,
        });
    };

    const mutacionDelete = useMutation({
        mutationFn: (data: deleteControlParametros) => deleteControl(data),
        onSuccess: () => {
            reset();
            showSuccess("Control eliminado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchControlesABM"]
            });
        },
        onError: () => {
            showError("Error al eliminar control");
        },
    });

    const onDelete = () => {
        mutacionDelete.mutate({
            id_control: control.id
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
                    {control.id}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible ? (
                        <Controller
                            name="serie"
                            control={controlForm}
                            rules={{ required: "Debe ingresar un numero de serie" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="serie"
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
                            {control.serie}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible ? (
                        <Controller
                            name="id_proyecto"
                            control={controlForm}
                            rules={{ required: "Debe seleccionar un proyecto" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="id_proyecto"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    select
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    disabled={selectDatos?.length === 0 || !selectDatos}
                                >
                                    {selectDatos?.map((proyecto: proyectoSelect) => (
                                        <MenuItem key={proyecto.id} value={proyecto.id}>
                                            {proyecto.nombre}
                                        </MenuItem>
                                    )) || []}
                                </TextField>
                            )}
                        />
                    ) : (
                        <>
                            {control.proyectonombre}
                        </>
                    )}
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
                />
            </TableCell>
        </TableRow>
    );
};
