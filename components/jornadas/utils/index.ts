import { proyecto } from "../types";

export const getNombreProyecto = (selectDatos: proyecto[]) => {
    const getNombreProyectoPorId = (id: number) => {
        const nombreProyecto = selectDatos?.find((proyecto: { id: number; }) => proyecto.id === Number(id));
        return nombreProyecto ? nombreProyecto.nombre : 'Desconocida';
    };

    return getNombreProyectoPorId;
};

export const formatHorasMinutos = (total: number) => {
    const horas = Math.floor(total);
    const minutos = Math.round((total - horas) * 60);
    const minutosFormateados = String(minutos).padStart(2, "0");
    return `${horas}:${minutosFormateados} hs`;
};

export const getDia = (fecha: string) => {
    const fechaDate = new Date(fecha);
    const dia = fechaDate.getDay();
    return dia;
};

export const getNombreMes = (mes: number) => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[mes - 1] ?? "";
};