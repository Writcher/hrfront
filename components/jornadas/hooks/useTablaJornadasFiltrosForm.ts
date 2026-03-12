import { useForm } from 'react-hook-form';
import { TablaJornadasFiltrosForm } from '../types/tablaJornadas/useTablaJornadasFiltrosForm';

export const useTablaJornadasFiltrosForm = () => {
  return useForm<TablaJornadasFiltrosForm>({
    defaultValues: {
        filtroMes: '',
        filtroQuincena: ''
    }
  });
};