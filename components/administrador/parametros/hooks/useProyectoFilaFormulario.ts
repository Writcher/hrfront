import { useForm } from "react-hook-form";
import { proyectoFilaFormularioDatos } from "../types";

export const useProyectoFilaFormulario = () => {
    return useForm<proyectoFilaFormularioDatos>({
        defaultValues: {
            nombre: '',
            id_modalidadtrabajo: '',
        },
    });
};