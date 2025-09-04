import { useForm } from "react-hook-form"
import { tablaImportacionesDatos } from "../types"

export const useTablaImportacionesFormulario = () => {
    return useForm<tablaImportacionesDatos>({
        defaultValues: {
            filtroProyecto: '',
            filtroIncompletas: false,
            pagina: 0,
            filasPorPagina: 16,
        }
    });
};