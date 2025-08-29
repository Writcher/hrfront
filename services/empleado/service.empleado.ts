"use server"

import { insertempleadoParametros } from "@/components/ui/empleados/types";
import CONFIG from "@/config";
import { fetchEmpleadosDTO } from "@/lib/dtos/empleado";
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
            ordenDireccion: parametros.ordenDireccion
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