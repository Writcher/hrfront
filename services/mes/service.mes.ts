"use server"

import CONFIG from "@/config";

export async function fetchMeses() {
    try {
        const mesesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_MESES}`, {
            method: "GET"
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