import { useForm } from "react-hook-form"
import { importacionJornadasFormularioDatos } from "../types"

export const useImportacionJornadasFormulario = () => {
    return useForm<importacionJornadasFormularioDatos>({
        defaultValues: {
            filtroMarcasIncompletas: false,
            pagina: 0,
            filasPorPagina: 25,
            totalIncompleto: 0,
        }
    });
};