"use server"

import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function fetchModalidadesTrabajo() {
    try {
        const token = await getToken();

        const mesesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_MODALIDADESTRABAJO}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!mesesRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const meses = await mesesRaw.json();

        return meses;
    } catch (error) {
        throw error;
    };
};