"use server"

import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTurnos() {
    try {
        const token = await getToken();

        const turnosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TURNOS}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!turnosRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const turnos = await turnosRaw.json();

        return turnos;
    } catch (error) {
        throw error;
    };
};