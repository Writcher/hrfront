import { proyecto, tipoEmpleado } from "../types";

export const getNombreProyecto = ( selectDatos: proyecto[]) => {
      const getNombreProyectoPorId = (id: number) => {
        const nombreProyecto = selectDatos?.find((proyecto: proyecto) => proyecto.id === Number(id));
        return nombreProyecto ? nombreProyecto.nombre : 'Desconocida';
      };
      return getNombreProyectoPorId;
};

export const getNombreTipoEmpleado = (selectDatos: tipoEmpleado[]) => {
    const getNombreTipoEmpleadoPorId = (id: number) => {
        const nombreTipoempleado = selectDatos?.find((tipoEmpleado: tipoEmpleado) => tipoEmpleado.id === Number(id));
        return nombreTipoempleado ? nombreTipoempleado.nombre : 'Desconocida';
    };

    return getNombreTipoEmpleadoPorId;
};
