import { getNombreProyectoProps, proyecto } from "../types";

export const getNombreProyecto = ({ selectDatos }: getNombreProyectoProps) => {
      const getNombreProyectoPorId = (id: number) => {
        const nombreProyecto = selectDatos?.find((proyecto: proyecto) => proyecto.id === Number(id));
        return nombreProyecto ? nombreProyecto.nombre : 'Desconocida';
      };
      return getNombreProyectoPorId;
};