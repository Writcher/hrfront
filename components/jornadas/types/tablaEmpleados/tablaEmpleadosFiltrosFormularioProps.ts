import { Proyecto } from '@/lib/types/entites/proyecto';
import { TipoEmpleado } from '@/lib/types/entites/tipoEmpleado';
import { SyntheticEvent } from 'react';

export type TablaEmpleadosFiltrosFormularioProps = {
  mostrarBusquedaNombre: boolean,
  mostrarFiltroProyecto: boolean,
  mostrarBusquedaLegajo: boolean,
  mostrarFiltroTipoEmpleado: boolean,
  filtroMarcaManual: boolean,
  busquedaNombreNormal: string,
  filtroProyecto: number | '',
  busquedaLegajoNormal: number | '',
  filtroTipoEmpleado: number | '',
  proyectos: Proyecto[],
  tiposEmpleado: TipoEmpleado[],
  onCambioBusquedaNombre: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroProyecto: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioBusquedaLegajo: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroTipoEmpleado: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onCambioFiltroMarcaManual: (event: SyntheticEvent<Element, Event>, checked: boolean) => void,
};