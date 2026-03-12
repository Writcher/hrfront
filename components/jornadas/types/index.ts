import { UseFormGetValues, UseFormReset, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TablaJornadasForm } from './tablaJornadas/useTablaJornadasForm';
import { TablaResumenFiltrosForm } from './tablaResumen/useTablaResumenFiltrosForm';
import { TablaEmpleadosFiltrosForm } from './tablaEmpleados/useTablaEmpleadosFiltrosForm';
import { TipoJornada } from '@/lib/types/entites/tipoJornada';
import { TipoAusencia } from '@/lib/types/entites/tipoAusencia';
import { Jornada } from './tablaJornadas/tablaJornadasProps';
import { TablaEmpleadosEmpleado } from './tablaEmpleados/tablaEmpleadosProps';

//responses

export type jornadasDatos = {
  jornadas: Jornada[],
  totalJornadas: number,
};

export type empleadosDatos = {
  empleados: TablaEmpleadosEmpleado[],
  totalEmpleados: number,
};

export type formularioDatos = {
  tiposJornada: TipoJornada[],
  tiposAusencia: TipoAusencia[],
  id_jornadaNormal: number,
  id_ausencia: number,
};

