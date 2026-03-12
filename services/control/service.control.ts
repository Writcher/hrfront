'use server'

import CONFIG from '@/config';
import { CreateControlDto, DeleteControlDto, EditControlDto, FetchControlesPaginatedDto } from '@/lib/dtos/control';
import { getToken } from '@/lib/utils/getToken';

export async function fetchControlesPaginated(params: FetchControlesPaginatedDto) {
    try {
        const token = await getToken();

        const controlesUrlParams = new URLSearchParams({
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
        });

        const controlesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CONTROL}?${controlesUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!controlesRaw.ok) {
            throw new Error(`Error fetching controles: ${controlesRaw.status} - ${controlesRaw.statusText}`);
        };

        const controles = await controlesRaw.json();

        return controles;
    } catch (error) {
        console.error('Fetch controles failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function createControl(params: CreateControlDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CONTROL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error creating control: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Create control failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteControl(params: DeleteControlDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CONTROL}/${params.id_control}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deleting control with id ${params.id_control}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Delete control failed: ', {
            id: params.id_control,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editControl(params: EditControlDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CONTROL}/${params.id_control}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                serie: params.serie,
                id_proyecto: params.id_proyecto
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error editing control with id ${params.id_control}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Edit control failed: ', {
            id: params.id_control,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};