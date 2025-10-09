import { proyecto, tipoAusencia, tipoEmpleado, mes } from "../types";

export const getNombreProyecto = (selectDatos: proyecto[]) => {
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

export const getNombreTipoAusencia = (selectDatos: tipoAusencia[]) => {
    const getNombreTipoAusenciaPorId = (id: number) => {
        const nombreTipoAusencia = selectDatos?.find((tipoAusencia: tipoAusencia) => tipoAusencia.id === Number(id));
        return nombreTipoAusencia ? nombreTipoAusencia.nombre : 'Desconocida';
    };

    return getNombreTipoAusenciaPorId;
};

export const getIdTipoAusencia = (selectDatos: tipoAusencia[]) => {
    const getIdTipoAusenciaPorNombre = (nombre: string) => {
        const idTipoAusencia = selectDatos?.find((tipoAusencia: tipoAusencia) => tipoAusencia.nombre === nombre);
        return idTipoAusencia ? idTipoAusencia.id : '';
    };

    return getIdTipoAusenciaPorNombre;
};

export const getNombreMes = (selectDatos: mes[]) => {
    const getNombreMesPorId = (id: number) => {
        const nombreMes = selectDatos?.find((mes: mes) => mes.id === Number(id));

        const nombre = nombreMes ? getNombreMesGen(nombreMes.mes) : "Desconocido"

        return nombre
    };

    return getNombreMesPorId;
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

export const getNombreMesGen = (mes: number) => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[mes - 1] ?? "";
};