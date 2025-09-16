import { useForm } from "react-hook-form"
import { useObservacionFormularioDatos } from "../types"

export const useObservacionFormulario = () => {
    return useForm<useObservacionFormularioDatos>({
        defaultValues: {
            observacion: '',
        }
    });
};