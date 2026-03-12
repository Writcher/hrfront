import { useForm } from 'react-hook-form';
import { TablaEmpleadosFiltrosForm } from '../types/tablaEmpleados/useTablaEmpleadosFiltrosForm';

export const useTablaEmpleadosFiltros = () => {
  return useForm<TablaEmpleadosFiltrosForm>({
    defaultValues: {
      busquedaNombre: '',
      busquedaNombreNormal: '',
      filtroProyecto: '',
      busquedaLegajo: '',
      busquedaLegajoNormal: '',
      filtroTipoEmpleado: '',
      filtroMarcaManual: false,
    },
  });
};