import { useForm } from "react-hook-form";
import { empleadoFormularioDatos } from "../types";

export const useEmpleadoFormulario = () => {
    return useForm<empleadoFormularioDatos>({
        defaultValues: {
            nombre: '',
            id_reloj: '',
            id_proyecto: '',
            legajo: '',
            id_tipoempleado: '',
            id_turno: '',
        },
    });
};