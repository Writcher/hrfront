import { useForm } from "react-hook-form";
import { controlFormularioDatos } from "../types";

export const useControlFormulario = () => {
    return useForm<controlFormularioDatos>({
        defaultValues: {
            serie: '',
            id_proyecto: '',
        },
    });
};