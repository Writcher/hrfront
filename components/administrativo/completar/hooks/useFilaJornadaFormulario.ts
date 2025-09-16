import { useForm } from "react-hook-form"
import { filaJornadaFormularioDatos, jornada } from "../types"

export const useFilaJornadaFormulario = (jornada: jornada) => {
    return useForm<filaJornadaFormularioDatos>({
        defaultValues: {
            id: jornada.id,
            entrada: jornada.entrada ? jornada.entrada : "",
            salida: jornada.salida ? jornada.salida : "",
        }
    });
};