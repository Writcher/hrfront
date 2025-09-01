import { useForm } from "react-hook-form"
import { TablaImportacionJornadasFormularioDatos } from "../types"

export const useTablaImportacionJornadasFormulario = () => {
    return useForm<TablaImportacionJornadasFormularioDatos>({
        defaultValues: {
            filtroMarcasIncompletas: false,
            pagina: 0,
            filasPorPagina: 25,
            totalIncompleto: 0,
        }
    })
}