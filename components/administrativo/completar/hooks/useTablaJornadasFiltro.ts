import { useForm } from "react-hook-form"
import { tablaJornadasFiltroDatos } from "../types"

export const useTablaJornadasFiltro = () => {
    return useForm<tablaJornadasFiltroDatos>({
        defaultValues: {
            filtroMarcasIncompletas: false,
        },
    });
};