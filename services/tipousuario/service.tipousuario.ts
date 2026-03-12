'use server'

import CONFIG from '@/config';
import { FetchTipoUsuarioPorIdDto } from '@/lib/dtos/tipousuario';
import { getToken } from '@/lib/utils/getToken';

export async function fetchTipoUsuarioPorId(params: FetchTipoUsuarioPorIdDto) {
    try {
        const tipoUsuarioRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOUSUARIO}/${params.id}`, {
            method: 'GET'
        });

        if (!tipoUsuarioRaw.ok) {
            throw new Error(`Error fetching tipoUsuario with id ${params.id}: ${tipoUsuarioRaw.status} - ${tipoUsuarioRaw.statusText}`);
        };

        const tipoUsuario = await tipoUsuarioRaw.json();

        return tipoUsuario;
    } catch (error) {
        console.error('Fetch tipoUsuario failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function fetchTiposUsuario() {
    try {
        const token = await getToken();

        const tiposUsuarioRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOUSUARIO}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposUsuarioRaw.ok) {
            throw new Error(`Error fetching tipoUsuario: ${tiposUsuarioRaw.status} - ${tiposUsuarioRaw.statusText}`);
        };

        const tiposUsuario = await tiposUsuarioRaw.json();

        return tiposUsuario;
    } catch (error) {
        console.error('Fetch tiposUsuario failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};