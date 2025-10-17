import { Chip, TableCell, TableRow, TextField } from "@mui/material";
import { deleteTipoAusenciaParametros, editTipoAusenciaParametros, filaTipoAusenciaProps, tipoAusenciaFormularioDatos } from "../../types";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfirmar } from "@/components/hooks/useConfirmar";
import { useEffect } from "react";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import { Controller } from "react-hook-form";
import { BotonesFila } from "./filaTiposAusenciaBotones";
import { useTipoAusenciaFormulario } from "../../hooks/useTipoAusenciaFormulario";
import { deleteTipoAusencia, editTipoAusencia } from "@/services/tipoausencia/service.tipoausencia";

export default function FilaTipoAusencia({ tipoAusencia }: filaTipoAusenciaProps) {

    const { showError, showWarning, showSuccess } = useSnackbar();

    const { control, formState: { isValid }, setValue, handleSubmit, reset } = useTipoAusenciaFormulario()

    const { confirmar: confirmarBorrar, handleConfirmar: handleConfirmarBorrar } = useConfirmar();

    const { formularioVisible, setFormularioVisible } = useMostrarFormulario();

    const queryClient = useQueryClient();

    useEffect(() => {
        if (tipoAusencia) {
            setValue('nombre', tipoAusencia.nombre ? tipoAusencia.nombre : '');
        };
    }, [tipoAusencia, setValue, formularioVisible]);

    const mutacionEdit = useMutation({
        mutationFn: (data: editTipoAusenciaParametros) => editTipoAusencia(data),
        onSuccess: () => {
            reset();
            setFormularioVisible(!formularioVisible)
            showSuccess("Tipo de ausencia editado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchTiposAusenciaABM"]
            });
        },
        onError: () => {
            showError("Error al eliminar tipo de ausencia");
        },
    });

    const onEdit = (data: tipoAusenciaFormularioDatos) => {
        mutacionEdit.mutate({
            id_tipoausencia: tipoAusencia.id,
            nombre: data.nombre,
        });
    };

    const mutacionDelete = useMutation({
        mutationFn: (data: deleteTipoAusenciaParametros) => deleteTipoAusencia(data),
        onSuccess: () => {
            reset();
            showSuccess("Tipo de ausencia eliminado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchTiposAusenciaABM"]
            });
        },
        onError: () => {
            showError("Error al eliminar tipo de ausencia");
        },
    });

    const onDelete = () => {
        mutacionDelete.mutate({
            id_tipoausencia: tipoAusencia.id
        });
    };

    return (
        <TableRow>
            <TableCell align="left" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {tipoAusencia.id}
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
                            {tipoAusencia.nombre}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    <Chip
                        label={tipoAusencia.estadoparametro}
                        className="!rounded"
                        color={tipoAusencia.estadoparametro.toLowerCase() === 'activo' ? 'success' : 'error'}
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
                    estado={tipoAusencia.estadoparametro}
                />
            </TableCell>
        </TableRow>
    );
};