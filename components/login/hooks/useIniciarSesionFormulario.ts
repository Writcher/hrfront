import { useForm } from "react-hook-form";
import { iniciarSesionFormularioDatos } from "../types";

export const useIniciarSesionFormulario = () => {
    return useForm<iniciarSesionFormularioDatos>({
        defaultValues: {
            correo: "",
            contraseña: ""
        },
    });
};