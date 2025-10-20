"use server"

import { insertempleadoParametros } from "@/components/empleados/types";
import CONFIG from "@/config";
import { editEmpleadoDTO, fetchEmpleadosDTO, fetchPresentesDTO } from "@/lib/dtos/empleado";
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
            filtroTipoAusencia: parametros.filtroTipoAusencia != null ? parametros.filtroTipoAusencia.toString() === '' ? '0' : parametros.filtroTipoAusencia.toString() : '-1',
            filtroMes: parametros.filtroMes != null ? parametros.filtroMes.toString() === '' ? '0' : parametros.filtroMes.toString() : '0',
            filtroQuincena: parametros.filtroQuincena != null ? parametros.filtroQuincena.toString() === '' ? '0' : parametros.filtroQuincena.toString() : '0',
            filtroMarcaManual: parametros.filtroMarcaManual ? parametros.filtroMarcaManual.toString() : "false",
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
                legajo: parametros.legajo === '' ? null : parametros.legajo,
                id_reloj: parametros. id_reloj,
                id_tipoempleado: parametros.id_tipoempleado === '' ? null : parametros.id_tipoempleado,
                id_turno: parametros.id_turno === '' ? null : parametros.id_turno,
                id_proyecto: parametros.id_proyecto === '' ? null : parametros.id_proyecto,
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

export async function fetchPresentes(parametros: fetchPresentesDTO) {
    try {
        const token = await getToken();

        const presentesParametros = new URLSearchParams({
            accion: "presentes",
            filtroProyecto: parametros.proyecto.toString() === '' ? '0' : parametros.proyecto.toString(),
            fecha: parametros.fecha,
            pagina: parametros.pagina.toString(),
            filasPorPagina: parametros.filasPorPagina.toString(),
        });

        const empleadosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADOS}?${presentesParametros.toString()}`, {
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