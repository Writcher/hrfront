'use server'

import CONFIG from '@/config';
import { DeleteImportacionDto, FetchImportacionesDto, SetImportacionCompletaDto } from '@/lib/dtos/importacion';
import { getToken } from '@/lib/utils/getToken';

export async function fetchImportaciones(params: FetchImportacionesDto) {
    try {
        const token = await getToken();

        const importacionesParams: Record<string, string> = {
            incompletas: params.filtroIncompletas.toString(),
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
        };

        if (params.filtroProyecto !== '' && params.filtroProyecto !== 0) {
            importacionesParams.id_proyecto = params.filtroProyecto.toString()
        };

        const importacionesUrlParams = new URLSearchParams(importacionesParams);

        const importacionesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION}?${importacionesUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!importacionesRaw.ok) {
            throw new Error(`Error fetching importaciones: ${importacionesRaw.status} - ${importacionesRaw.statusText}`);
        };

        const datosEmpleados = await importacionesRaw.json();

        return datosEmpleados;
    } catch (error) {
        console.error('Fetch importaciones failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function setImportacionCompleta(params: SetImportacionCompletaDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION}/${params.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error editing importacion with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json()

        return respuesta;
    } catch (error) {
        console.error('Edit importacion failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteImportacion(params: DeleteImportacionDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION}/${params.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deleting importacion with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Delete importacion failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};
