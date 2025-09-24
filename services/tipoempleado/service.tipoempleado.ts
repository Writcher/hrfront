"use server"

import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTiposEmpleado() {
    try {
        const token = await getToken();

        const tiposJEmpleadosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOSEMPLEADO}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposJEmpleadosRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const tiposEmpleados = await tiposJEmpleadosRaw.json();

        return tiposEmpleados;
    } catch (error) {
        throw error;
    };
};