import { useForm } from "react-hook-form"
import { TablaImportacionesFormularioDatos } from "../types"

export const useTablaImportacionesFormulario = () => {
    return useForm<TablaImportacionesFormularioDatos>({
        defaultValues: {
            filtroProyecto: '',
            filtroIncompletas: false,
            pagina: 0,
            filasPorPagina: 16,
        }
    })
}