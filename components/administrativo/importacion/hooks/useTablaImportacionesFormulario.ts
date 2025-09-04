import { useForm } from "react-hook-form"
import { tablaImportacionesFormularioDatos } from "../types"

export const useTablaImportacionesFormulario = () => {
    return useForm<tablaImportacionesFormularioDatos>({
        defaultValues: {
            filtroProyecto: '',
            filtroIncompletas: false,
            pagina: 0,
            filasPorPagina: 16,
        }
    });
};