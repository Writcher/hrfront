'use server'

import CONFIG from '@/config';
import { getToken } from '@/lib/utils/getToken';

export async function fetchTiposJornada() {
    try {
        const token = await getToken();

        const tiposJornadaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOJORNADA}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposJornadaRaw.ok) {
            throw new Error(`Error fetching tiposJornada: ${tiposJornadaRaw.status} - ${tiposJornadaRaw.statusText}`);
        };

        const tiposJornada = await tiposJornadaRaw.json();

        return tiposJornada;
    } catch (error) {
        console.error('Fetch tiposJornada failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};