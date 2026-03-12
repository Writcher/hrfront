import { Mes } from '@/lib/types/entites/mes';

export type TablaJornadasFiltrosFormularioProps = {
  filtroMes: number | '',
  filtroQuincena: number | '',
  cargando: boolean,
  meses: Mes[],
  onCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void,
  getNombreMes: (mes: number) => string,
};