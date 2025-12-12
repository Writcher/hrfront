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
            setValue('id_reloj', empleado.id_reloj ? empleado.id_reloj : '');
            setValue('legajo', empleado.legajo ? empleado.legajo : '');
            setValue('nombre', empleado.nombre ? empleado.nombre : '');
            setValue('id_tipoempleado', empleado.id_tipoempleado ? empleado.id_tipoempleado : '');
            setValue('id_turno', empleado.id_turno ? empleado.id_turno : '');
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
            id_reloj: data.id_reloj,
            legajo: data.legajo,
            nombre: data.nombre,
            id: empleado.id,
            id_tipoempleado: data.id_tipoempleado,
            id_turno: data.id_turno,
            id_proyecto: data.id_proyecto
        });
    };

    const mutacionDeactivate = useMutation({
        mutationFn: (id: number) => deactivateEmpleado(id),
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
        mutacionDeactivate.mutate(
            empleado.id
        );
    };

    return (
        <TableRow>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {/**{formularioVisible ? (
                        <Controller
                            name="legajo"
                            control={control}
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
                        <>*/}
                            {empleado.legajo}
                        {/**</>
                    )}*/}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {/**{formularioVisible ? (
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
                        <>*/}
                            {empleado.id_reloj}
                        {/**</>
                    )}*/}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {/**{formularioVisible ? (
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
                        <>*/}
                            {empleado.nombre}
                        {/**</>
                    )}*/}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {/**{formularioVisible ? (
                        <Controller
                            name="id_tipoempleado"
                            control={control}
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
                                    disabled={tiposEmpleado?.length === 0 || !tiposEmpleado}
                                >
                                    {tiposEmpleado?.map((tipoEmpleado: tipoEmpleado) => (
                                        <MenuItem key={tipoEmpleado.id} value={tipoEmpleado.id}>
                                            {tipoEmpleado.nombre}
                                        </MenuItem>
                                    )) || []}
                                </TextField>
                            )}
                        />
                    ) : (
                        <>*/}
                            {empleado.tipoempleado}
                        {/**</>
                    )}*/}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {formularioVisible ? (
                        <Controller
                            name="id_turno"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    id="id_turno"
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    select
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    disabled={turnos?.length === 0 || !turnos}
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
                            {empleado.turno}
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {/**{formularioVisible ? (
                        <Controller
                            name="id_proyecto"
                            control={control}
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
                                    disabled={proyectos?.length === 0 || !proyectos} 
                                >
                                    {proyectos?.map((proyecto: proyecto) => (
                                        <MenuItem key={proyecto.id} value={proyecto.id}>
                                            {proyecto.nombre}
                                        </MenuItem>
                                    )) || []}
                                </TextField>
                            )}
                        />
                    ) : (
                        <>*/}
                            {empleado.nombreproyecto}
                        {/**</>
                    )}*/}
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