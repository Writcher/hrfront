import { useForm } from "react-hook-form"
import { useFormularioTipoAusenciaDatos } from "../types"

export const useFormularioTipoAusencia = () => {
    return useForm<useFormularioTipoAusenciaDatos>({
        defaultValues: {
            tipoAusencia: '',
        }
    });
};