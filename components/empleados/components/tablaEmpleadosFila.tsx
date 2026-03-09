import { Chip, MenuItem, TableCell, TableRow, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateEmpleado, editEmpleado } from "@/services/empleado/service.empleado";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEmpleadoFormulario } from "../hooks/useEmpleadoFormulario";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { editEmpleadoParametros, empleadoFormularioDatos, formularioFilaEmpleadoProps, turno } from "../types";
import { BotonesFila } from "./filaEmpleadosBotones";
import { useConfirmar } from "../../hooks/useConfirmar";
import { useMostrarFormulario } from "../hooks/useMostrarFormulario";
import { useSelectDatos } from "../hooks/useSelectDatos";
import { DeactivateEmpleadoDto } from "@/lib/dtos/empleado";

export default function FilaEmpleado({ empleado }: formularioFilaEmpleadoProps) {

    const { control, formState: { isValid }, setValue, handleSubmit, reset } = useEmpleadoFormulario()

    const { showSuccess, showError } = useSnackbar();

    const queryClient = useQueryClient();

    const { formularioVisible, handleMostrarFormulario } = useMostrarFormulario({ reset });

    const { confirmar: confirmarBaja, handleConfirmar: handleConfirmarBaja } = useConfirmar();

    const {
        //proyectos,
        //tiposEmpleado,
        turnos,
        //cargando,
        //error
    } = useSelectDatos();

    useEffect(() => {
        if (empleado) {
            setValue('dni', empleado.dni ? empleado.dni : '');
            setValue('legajo', empleado.legajo ? empleado.legajo : '');
            setValue('nombre', empleado.nombre ? empleado.nombre : '');
            setValue('id_tipoempleado', empleado.id_tipoempleado ? empleado.id_tipoempleado : '');
            setValue('id_modalidadvalidacion', empleado.id_modalidadvalidacion ? empleado.id_modalidadvalidacion : '');
            setValue('id_proyecto', empleado.id_proyecto ? empleado.id_proyecto : '');
        };
    }, [empleado, setValue, formularioVisible]);

    const mutacionEdit = useMutation({
        mutationFn: (data: editEmpleadoParametros) => editEmpleado(data),
        onSuccess: () => {
            handleMostrarFormulario();
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
            dni: data.dni,
            legajo: data.legajo,
            nombre: data.nombre,
            id: empleado.id,
            id_tipoempleado: data.id_tipoempleado,
            id_modalidadvalidacion: data.id_modalidadvalidacion,
            id_proyecto: data.id_proyecto
        });
    };

    const mutacionDeactivate = useMutation({
        mutationFn: (data: DeactivateEmpleadoDto) => deactivateEmpleado(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchEmpleadosTablaJornadas"]
            });
            showSuccess("Empleado dado de baja correctamente");
        },
        onError: () => {
            showError("Error al dar de baja empleado");
        },
    });

    const onDeactivate = () => {
        mutacionDeactivate.mutate({
            id: empleado.id
        });
    };

    return (
        <TableRow>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {empleado.legajo}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {empleado.dni}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {empleado.nombre}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {empleado.tipoempleado}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible ? (
                        <Controller
                            name="id_modalidadvalidacion"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="id_modalidadvalidacion"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    select
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    disabled={turnos?.length === 0 || !turnos}
                                    slotProps={{
                                        select: {
                                            MenuProps: {
                                                slotProps: {
                                                    paper: {
                                                        style: {
                                                            marginTop: '4px',
                                                            maxHeight: '200px',
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                >
                                    {turnos?.map((turno: turno) => (
                                        <MenuItem key={turno.id} value={turno.id}>
                                            {turno.nombre}
                                        </MenuItem>
                                    )) || []}
                                </TextField>
                            )}
                        />
                    ) : (
                        <>
                            {empleado.modalidadvalidacion}
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
                    formularioVisible={formularioVisible}
                    handleMostrarFormulario={handleMostrarFormulario}
                    handleSubmit={handleSubmit(onEdit)}
                    onDeactivate={onDeactivate}
                    confirmarBaja={confirmarBaja}
                    onClickBaja={handleConfirmarBaja}
                />
            </TableCell>
        </TableRow>
    );
};