import { useForm } from "react-hook-form";
import { proyectoFormularioDatos } from "../types";

export const useProyectoFormulario = () => {
    return useForm<proyectoFormularioDatos>({
        defaultValues: {
            nombre: '',
            id_modalidadtrabajo: '',
        },
    });
};