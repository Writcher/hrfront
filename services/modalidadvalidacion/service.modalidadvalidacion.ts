'use server'

import CONFIG from '@/config';
import { getToken } from '@/lib/utils/getToken';

export async function fetchModalidadesValidacion() {
    try {
        const token = await getToken();

        const modalidadesValidacionRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_MODALIDADVALIDACION}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!modalidadesValidacionRaw.ok) {
            throw new Error(`Error fetching modalidadesValidacion: ${modalidadesValidacionRaw.status} - ${modalidadesValidacionRaw.statusText}`);
        };

        const modalidadesValidacion = await modalidadesValidacionRaw.json();

        return modalidadesValidacion;
    } catch (error) {
        console.error('Fetch modalidadesValidacion failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};