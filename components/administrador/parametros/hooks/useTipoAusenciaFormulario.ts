import { useForm } from "react-hook-form";
import { tipoAusenciaFormularioDatos } from "../types";

export const useTipoAusenciaFormulario = () => {
    return useForm<tipoAusenciaFormularioDatos>({
        defaultValues: {
            nombre: '',
        },
    });
};