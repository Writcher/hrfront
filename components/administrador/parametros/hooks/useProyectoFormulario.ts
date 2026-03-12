import { useForm } from 'react-hook-form';
import { proyectoFormularioDatos } from '../types';

export const useProyectoFormulario = () => {
    return useForm<proyectoFormularioDatos>({
        defaultValues: {
            nomina: '',
            nombre: '',
            id_modalidadtrabajo: '',
        },
    });
};