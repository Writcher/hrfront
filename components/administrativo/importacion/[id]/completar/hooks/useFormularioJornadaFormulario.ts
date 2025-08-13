import { useForm } from "react-hook-form"
import { FormularioJornadaFormularioDatos } from "../types"

export const useFormularioJornadaFormulario = (jornada: any) => {
    return useForm<FormularioJornadaFormularioDatos>({
        defaultValues: {
            id: jornada.id,
            entrada: jornada.entrada ? jornada.entrada : "",
            salida: jornada.salida ? jornada.salida : ""
        }
    })
}