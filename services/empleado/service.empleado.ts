"use server"

import { insertempleadoParametros } from "@/components/empleados/types";
import CONFIG from "@/config";
import { editEmpleadoDTO, fetchEmpleadosDTO } from "@/lib/dtos/empleado";
import { getToken } from "@/lib/utils/getToken";

export async function fetchEmpleados(parametros: fetchEmpleadosDTO) {
    try {
        const token = await getToken();

        const empleadosParametros = new URLSearchParams({
            busquedaNombre: parametros.busquedaNombre,
            filtroProyecto: parametros.filtroProyecto.toString() === '' ? '0' : parametros.filtroProyecto.toString(),
            pagina: parametros.pagina.toString(),
            filasPorPagina: parametros.filasPorPagina.toString(),
            ordenColumna: parametros.ordenColumna,
            ordenDireccion: parametros.ordenDireccion,
            busquedaLegajo: parametros.busquedaLegajo.toString() === '' ? '0' : parametros.busquedaLegajo.toString(),
            filtroTipoEmpleado: parametros.filtroTipoEmpleado.toString() === '' ? '0' : parametros.filtroTipoEmpleado.toString(),
        });

        const empleadosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADOS}?${empleadosParametros.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!empleadosRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const empleados = await empleadosRaw.json();

        return empleados;
    } catch (error) {
        throw error;
    };
};

export async function insertEmpleado(parametros: insertempleadoParametros) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CREAR_EMPLEADO}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parametros),
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function deactivateEmpleado(id: number) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADO!.replace("{id}", id!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                accion: "deshabilitar" 
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function editEmpleado(parametros: editEmpleadoDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADO!.replace("{id}", parametros.id!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                accion: "editar" ,
                nombre: parametros.nombre,
                legajo: parametros.legajo,
                id_reloj: parametros. id_reloj,
                id_tipoempleado: parametros.id_tipoempleado,
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};