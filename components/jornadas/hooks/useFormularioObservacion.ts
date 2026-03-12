import { useForm } from 'react-hook-form'
import { ObservacionForm } from '../types/tablaJornadas/useObservacionForm';

export const useObservacionFormulario = () => {
    return useForm<ObservacionForm>({
        defaultValues: {
            observacion: '',
        }
    });
};