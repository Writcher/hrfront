'use server'

import CONFIG from '@/config';
import { getToken } from '@/lib/utils/getToken';

export async function fetchTiposEmpleado() {
    try {
        const token = await getToken();

        const tiposEmpleadosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOEMPLEADO}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposEmpleadosRaw.ok) {
            throw new Error(`Error fetching tiposEmpleado: ${tiposEmpleadosRaw.status} - ${tiposEmpleadosRaw.statusText}`);
        };

        const tiposEmpleados = await tiposEmpleadosRaw.json();

        return tiposEmpleados;
    } catch (error) {
        console.error('Fetch tiposEmpleado failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};