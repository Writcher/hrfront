import { Chip, TableCell, TableRow, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateEmpleado, editEmpleado } from "@/services/empleado/service.empleado";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEmpleadoFormulario } from "../hooks/useEmpleadoFormulario";
import { useMostrarFormulario } from "../hooks/useMostrarFormulario";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { editEmpleadoParametros, empleadoFormularioDatos, formularioFilaEmpleadoProps } from "../types";
import { BotonesFila } from "./botonesFila";

export default function FormularioEditarEmpleado({ empleado }: formularioFilaEmpleadoProps) {

    const { control, formState: { isValid }, watch, setValue, handleSubmit } = useEmpleadoFormulario()
    const { showSuccess, showError } = useSnackbar();
    const queryClient = useQueryClient();

    const formularioVisible = useMostrarFormulario({ setValue, watch });

    useEffect(() => {
        if (empleado) {
            setValue('id_reloj', empleado.id_reloj ? empleado.id_reloj : '');
            setValue('legajo', empleado.legajo ? empleado.legajo : '');
            setValue('nombre', empleado.nombre ? empleado.nombre : '');
        };
    }, [empleado, setValue, formularioVisible.formularioVisible]);

    const mutacionEdit = useMutation({
        mutationFn: (data: editEmpleadoParametros) => editEmpleado(data),
        onSuccess: () => {
            formularioVisible.handleMostrarFormulario();
            showSuccess("Empleado editado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchEmpleadosTablaJornadas"]
            });
        },
        onError: () => {
            showError("Error al eliminar empleado");
        },
    });

    const onEdit = (data: empleadoFormularioDatos) => {
        mutacionEdit.mutate({
            id_reloj: data.id_reloj,
            legajo: data.legajo,
            nombre: data.nombre,
            id: empleado.id
        });
    };

    const mutacionDeactivate = useMutation({
        mutationFn: (id: number) => deactivateEmpleado(id),
        onSuccess: () => {
            showSuccess("Empleado dado de baja correctamente");
            queryClient.invalidateQueries({
                queryKey: ["fetchEmpleadosTablaJornadas"]
            });
        },
        onError: () => {
            showError("Error al dar de baja empleado");
        },
    });

    const onDeactivate = () => {
        mutacionDeactivate.mutate(
            empleado.id
        );
    };
    return (
        <TableRow>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible.formularioVisible ? (
                        <Controller
                            name="legajo"
                            control={control}
                            rules={{ required: "Debe ingresar legajo" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="legajo"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    type="number"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    ) : (
                        <>
                            {empleado.legajo}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible.formularioVisible ? (
                        <Controller
                            name="id_reloj"
                            control={control}
                            rules={{ required: "Debe ingresar ID en reloj" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="nombre"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    type="number"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    ) : (
                        <>
                            {empleado.id_reloj}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible.formularioVisible ? (
                        <Controller
                            name="nombre"
                            control={control}
                            rules={{ required: "Debe ingresar nombre y apellido" }}
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
                            {empleado.nombre}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {empleado.nombreproyecto}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    <Chip
                        label={empleado.estadoempleado}
                        className="!rounded"
                        color={
                            empleado.estadoempleado.toLowerCase() === 'activo' ? 'success' : 'error'
                        }
                    />
                </div>
            </TableCell>
            <TableCell align="right" size="small">
                <BotonesFila
                    editando={mutacionEdit.isPending}
                    desactivando={mutacionDeactivate.isPending}
                    isValid={isValid}
                    estadoempleado={empleado.estadoempleado}
                    formularioVisible={formularioVisible.formularioVisible}
                    handleMostrarFormulario={formularioVisible.handleMostrarFormulario}
                    handleSubmit={handleSubmit(onEdit)}
                    onDeactivate={onDeactivate}
                />
            </TableCell>
        </TableRow>
    );
};