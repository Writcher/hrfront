'use server'

import CONFIG from '@/config';
import { getToken } from '@/lib/utils/getToken';

export async function fetchMeses() {
    try {
        const token = await getToken();

        const mesesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_MES}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!mesesRaw.ok) {
            throw new Error(`Error fetching meses: ${mesesRaw.status} - ${mesesRaw.statusText}`);
        };

        const meses = await mesesRaw.json();

        return meses;
    } catch (error) {
        console.error('Fetch meses failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};