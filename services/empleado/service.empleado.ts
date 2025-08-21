"use server"

import CONFIG from "@/config";
import { fetchEmpleadosDTO } from "@/lib/dtos/empleado";

export async function fetchEmpleados(parametros: fetchEmpleadosDTO) {
    try {
        const empleadosParametros = new URLSearchParams({
            busquedaNombre: parametros.busquedaNombre,
            filtroProyecto: parametros.filtroProyecto.toString() === '' ? '0' : parametros.filtroProyecto.toString(),
            pagina: parametros.pagina.toString(),
            filasPorPagina: parametros.filasPorPagina.toString(),
            ordenColumna: parametros.ordenColumna,
            ordenDireccion: parametros.ordenDireccion
        });

        const empleadosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADOS}?${empleadosParametros.toString()}`, {
            method: "GET"
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