import { useForm } from 'react-hook-form';
import { exportarExcelDatos } from '../types';

export const useExportarExcelFormulario = () => {
  return useForm<exportarExcelDatos>({
    defaultValues: {
      proyectos: [],
      tipoEmpleado: '',
      mes: '',
      quincena: ''
    }
  });
};