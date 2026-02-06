import { useForm } from "react-hook-form";
import { consultaFormularioDatos } from "../types";

export const useConsultaFormulario = () => {
    return useForm<consultaFormularioDatos>({
        defaultValues: {
            fecha: '',
            proyecto: '',
        },
    });
};