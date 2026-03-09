"use server"

import CONFIG from "@/config";
import { CreateTipoAusencialDto, DeleteTipoAusenciaDto, EditTipoAusenciaDto, FetchTiposAusenciaPaginatedDto } from "@/lib/dtos/tipoausencia";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTiposAusencia() {
    try {
        const token = await getToken();

        const tiposAusenciaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposAusenciaRaw.ok) {
            throw new Error(`Error fetching tiposAusencia: ${tiposAusenciaRaw.status} - ${tiposAusenciaRaw.statusText}`);
        };

        const tiposAusencia = await tiposAusenciaRaw.json();

        return tiposAusencia;
    } catch (error) {
        console.error('Fetch tiposAusencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function fetchTiposAusenciaPaginated(params: FetchTiposAusenciaPaginatedDto) {
    try {
        const token = await getToken();

        const tiposAusenciaUrlParams = new URLSearchParams({
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
        });

        const tiposAusenciaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}/paginated?${tiposAusenciaUrlParams}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposAusenciaRaw.ok) {
            throw new Error(`Error fetching tiposAusencia: ${tiposAusenciaRaw.status} - ${tiposAusenciaRaw.statusText}`);
        };

        const tiposAusencia = await tiposAusenciaRaw.json();

        return tiposAusencia;
    } catch (error) {
        console.error('Fetch tiposAusencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function createTipoAusencia(params: CreateTipoAusencialDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error creating tiposAusencia: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Create tiposAusencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteTipoAusencia(params: DeleteTipoAusenciaDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}/${params.id_tipoausencia}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deleting tiposAusencia with id ${params.id_tipoausencia}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Delete tipoAusencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editTipoAusencia(params: EditTipoAusenciaDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}/${params.id_tipoausencia}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: params.nombre,
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deleting tiposAusencia with id ${params.id_tipoausencia}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Edit tipoAusencia failed: ', {
            id: params.id_tipoausencia,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};