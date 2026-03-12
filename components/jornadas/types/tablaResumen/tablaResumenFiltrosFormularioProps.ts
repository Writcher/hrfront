import { Mes } from '@/lib/types/entites/mes';

export type TablaResumenFiltrosFormularioProps = {
  filtroMes: number | '',
  filtroQuincena: number | '',
  selectCargando: boolean,
  selectDatos: Mes[],
  onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void,
};
