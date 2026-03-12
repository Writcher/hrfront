import { Mes } from '@/lib/types/entites/mes';

export type TablaJornadasFiltrosBotonesProps = {
  formularioVisible: boolean,
  handleLimpiarFiltros: () => void,
  filtroMes: number | '',
  filtroQuincena: number | '',
  cargando: boolean,
  meses: Mes[],
  creando: boolean,
  camposValidos: boolean,
  handleCambioFiltroQuincena: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCambioFiltroMes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleMostrarFormulario: () => void,
  estado: string,
  onCreate: (event?: React.BaseSyntheticEvent) => Promise<void>,
  esAdministrativo: boolean
};
