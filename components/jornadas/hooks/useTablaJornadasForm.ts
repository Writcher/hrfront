import { useForm } from 'react-hook-form';
import { TablaJornadasForm } from '../types/tablaJornadas/useTablaJornadasForm';

export const useTablaJornadasForm = () => {
  return useForm<TablaJornadasForm>({
    defaultValues: {
      entrada: '',
      salida: '',
      entradaTarde: '',
      salidaTarde: '',
      tipoJornada: '',
      tipoAusencia: '',
      observacion: '',
      fecha: '',
    }
  });
};