"use server"

import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function fetchProyectos() {
    try {
        const token = await getToken();

        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTOS}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!proyectosRaw.ok) {
            throw new Error("Error en alguna de las respuestas del servidor");
        };

        const proyectos = await proyectosRaw.json();

        return proyectos;
    } catch (error) {
        throw error;
    };
};