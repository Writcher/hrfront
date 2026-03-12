'use server'

import CONFIG from '@/config';
import { getToken } from '@/lib/utils/getToken';

export async function fetchModalidadesTrabajo() {
    try {
        const token = await getToken();

        const modalidadesTrabajoRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_MODALIDADTRABAJO}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!modalidadesTrabajoRaw.ok) {
            throw new Error(`Error fetching modalidadesTrabajo: ${modalidadesTrabajoRaw.status} - ${modalidadesTrabajoRaw.statusText}`);
        };

        const modalidadesTrabajo = await modalidadesTrabajoRaw.json();

        return modalidadesTrabajo;
    } catch (error) {
        console.error('Fetch modalidadesTrabajo failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};