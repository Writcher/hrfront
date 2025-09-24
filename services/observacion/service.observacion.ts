"use server"

import { insertObservacionDatos } from "@/components/jornadas/types";
import CONFIG from "@/config";
import { fetchObservacionesEmpleadoDTO } from "@/lib/dtos/observacion";
import { getToken } from "@/lib/utils/getToken";

export async function insertObservacion(parametros: insertObservacionDatos) {
    try {
        const token = await getToken();

        const datos = {
            observacion: parametros.observacion
        };

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CREAR_OBSERVACION!.replace("{id}", parametros.id_jornada!.toString())}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos),
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

export async function fetchObservacionesEmpleado(parametros: fetchObservacionesEmpleadoDTO) {
        try {
            const token = await getToken();
    
            const observacionesParametros = new URLSearchParams({
                filtroMes: parametros.filtroMes.toString() === '' ? '0' : parametros.filtroMes.toString(),
                filtroQuincena: parametros.filtroQuincena.toString() === '' ? '0' : parametros.filtroQuincena.toString(),
                pagina: parametros.pagina !== null && parametros.pagina !== undefined ? parametros.pagina.toString() : '',
                filasPorPagina: parametros.filasPorPagina !== null && parametros.filasPorPagina !== undefined ? parametros.filasPorPagina.toString() : '',
            });
    
            const observacionesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADOOBSERVACIONES!.replace("{id}", parametros.id_empleado!.toString())}?${observacionesParametros.toString()}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    
            if (!observacionesRaw.ok) {
                throw new Error("Error en la respuesta del servidor");
            };
    
            const observaciones = await observacionesRaw.json();
    
            return observaciones;
        } catch (error) {
            throw error;
        };
};