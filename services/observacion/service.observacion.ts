'use server'

import CONFIG from '@/config';
import { FetchObservacionesEmpleadoDto, CreateObservacionDto, DeleteObservacionDto } from '@/lib/dtos/observacion';
import { getToken } from '@/lib/utils/getToken';

export async function createObservacion(params: CreateObservacionDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id_jornada}/observacion`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                texto: params.observacion
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error creating observacion: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Create observacion failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function fetchObservacionesEmpleado(params: FetchObservacionesEmpleadoDto) {
    try {
        const token = await getToken();

        const observacionesParams: Record<string, string> = {
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
        };

        if (params.filtroQuincena !== '' && params.filtroQuincena !== 0) {
            observacionesParams.quincena = params.filtroQuincena.toString();
        };

        if (params.filtroMes !== '' && params.filtroMes !== 0) {
            observacionesParams.id_mes = params.filtroMes.toString();
        };

        const observacionesUrlParams = new URLSearchParams(observacionesParams);

        const observacionesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADO}/${params.id_empleado}/observacion?${observacionesUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!observacionesRaw.ok) {
            throw new Error(`Error fetching observaciones for empleado with id ${params.id_empleado}: ${observacionesRaw.status} - ${observacionesRaw.statusText}`);
        };

        const observaciones = await observacionesRaw.json();

        return observaciones;
    } catch (error) {
        console.error('Fetch observaciones failed: ', {
            id_empleado: params.id_empleado,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteObservacion(params: DeleteObservacionDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_OBSERVACION}/${params.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deleting observacion with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Delete observacion failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};