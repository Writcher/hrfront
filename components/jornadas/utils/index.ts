import { Proyecto } from "@/lib/types/entites/proyecto";
import { TipoEmpleado } from "@/lib/types/entites/tipoEmpleado";

export const getNombreProyecto = (selectDatos: Proyecto[]) => {
    const getNombreProyectoPorId = (id: number) => {
        const nombreProyecto = selectDatos?.find((proyecto: Proyecto) => proyecto.id === Number(id));
        return nombreProyecto ? nombreProyecto.nombre : 'Desconocida';
    };

    return getNombreProyectoPorId;
};

export const getNombreTipoEmpleado = (selectDatos: TipoEmpleado[]) => {
    const getNombreTipoEmpleadoPorId = (id: number) => {
        const nombreTipoempleado = selectDatos?.find((tipoEmpleado: TipoEmpleado) => tipoEmpleado.id === Number(id));
        return nombreTipoempleado ? nombreTipoempleado.nombre : 'Desconocida';
    };

    return getNombreTipoEmpleadoPorId;
};

export const formatHorasMinutos = (total: number) => {
    const horas = Math.floor(total);
    const minutos = Math.round((total - horas) * 60);
    const minutosFormateados = String(minutos).padStart(2, '0');
    return `${horas}:${minutosFormateados} hs`;
};

export const getDia = (fecha: string) => {
    const fechaDate = new Date(fecha);
    const dia = fechaDate.getDay();
    return dia;
};

export const getNombreMes = (mes: number) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes - 1] ?? '';
};