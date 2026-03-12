import { TablaEmpleadosEmpleado } from './tablaEmpleadosProps';

export type TablaEmpleadosFilaProps = {
  empleado: TablaEmpleadosEmpleado,
  idFilaExpandidaProp: number | null,
  onExpandirFila: (id: number) => void,
  esAdministrativo?: boolean,
  esRRHH?: boolean,
};
