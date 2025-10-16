import { Chip, MenuItem, TableCell, TableRow, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useUsuarioFormulario } from "../hooks/useUsuarioFormulario";
import { useMostrarFormulario } from "../hooks/useMostrarFormulario";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { editUsuarioParametros, usuarioFormularioDatos, formularioFilaUsuarioProps, tipoUsuario } from "../types";
import { BotonesFila } from "./filaUsuarioBotones";
import { useConfirmar } from "@/components/hooks/useConfirmar";
import { fetchTiposUsuario } from "@/services/tipousuario/service.tipousuario";
import { deleteUsuario, editUsuario } from "@/services/usuario/service.usuario";

export default function FilaUsuario({ usuario }: formularioFilaUsuarioProps) {

    const { control, formState: { isValid }, setValue, handleSubmit, reset } = useUsuarioFormulario()

    const { showSuccess, showError } = useSnackbar();

    const queryClient = useQueryClient();

    const { formularioVisible, handleMostrarFormulario } = useMostrarFormulario({ reset });

    const { confirmar: confirmarBorrar, handleConfirmar: handleConfirmarBorrar } = useConfirmar();

    const { data: selectData } = useQuery({
        queryKey: ["fetchTiposUsuario"],
        queryFn: () => fetchTiposUsuario(),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (usuario) {
            setValue('correo', usuario.correo ? usuario.correo : '');
            setValue('nombre', usuario.nombre ? usuario.nombre : '');
            setValue('id_tipousuario', usuario.id_tipousuario ? usuario.id_tipousuario : '');
        };
    }, [usuario, setValue, formularioVisible]);

    const mutacionEdit = useMutation({
        mutationFn: (data: editUsuarioParametros) => editUsuario(data),
        onSuccess: () => {
            handleMostrarFormulario();
            showSuccess("Usuario editado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchUsuariosTabla"]
            });
        },
        onError: () => {
            showError("Error al eliminar empleado");
        },
    });

    const onEdit = (data: usuarioFormularioDatos) => {
        mutacionEdit.mutate({
            id: usuario.id,
            correo: data.correo,
            nombre: data.nombre,
            id_tipousuario: data.id_tipousuario,
        });
    };

    const mutacionDelete = useMutation({
        mutationFn: (id: number) => deleteUsuario(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchUsuariosTabla"]
            });
            showSuccess("Usuario eliminado correctamente");
        },
        onError: () => {
            showError("Error al eliminar usuario");
        },
    });

    const onDelete = () => {
        mutacionDelete.mutate(
            usuario.id
        );
    };

    return (
        <TableRow>
            <TableCell align="left" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
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
                            {usuario.nombre}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible ? (
                        <Controller
                            name="correo"
                            control={control}
                            rules={{ required: "Debe ingresar un correo" }}
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
                            {usuario.correo}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible ? (
                        <Controller
                            name="id_tipousuario"
                            control={control}
                            rules={{ required: "Debe seleccionar un tipo" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="id_tipoempleado"
                                    label="Seleccionar Tipo de Usuario"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    select
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    disabled={selectData?.length === 0 || !selectData}
                                >
                                    {selectData?.map((tipoUsuario: tipoUsuario) => (
                                        <MenuItem key={tipoUsuario.id} value={tipoUsuario.id}>
                                            {tipoUsuario.nombre}
                                        </MenuItem>
                                    )) || []}
                                </TextField>
                            )}
                        />
                    ) : (
                        <>
                            {usuario.tipousuario}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    <Chip
                        label={usuario.estadousuario}
                        className="!rounded"
                        color={
                            usuario.estadousuario.toLowerCase() === 'activo' ? 'success' : 'error'
                        }
                    />
                </div>
            </TableCell>
            <TableCell align="right" size="small">
                <BotonesFila
                    editando={mutacionEdit.isPending}
                    borrando={mutacionDelete.isPending}
                    isValid={isValid}
                    formularioVisible={formularioVisible}
                    handleMostrarFormulario={handleMostrarFormulario}
                    handleSubmit={handleSubmit(onEdit)}
                    onDelete={onDelete}
                    confirmarBorrar={confirmarBorrar}
                    onClickBorrar={handleConfirmarBorrar}
                    estado={usuario.estadousuario}
                />
            </TableCell>
        </TableRow>
    );
};