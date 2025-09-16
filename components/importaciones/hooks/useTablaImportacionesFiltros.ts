import { useForm } from "react-hook-form"
import { tablaImportacionesFiltrosDatos } from "../types"

export const useTablaImportacionesFiltros = () => {
    return useForm<tablaImportacionesFiltrosDatos>({
        defaultValues: {
            filtroProyecto: '',
            filtroIncompletas: false,
        }
    });
};