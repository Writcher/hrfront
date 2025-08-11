"use server";

import CONFIG from "@/config";
import { insertJornadasExcelParams } from "@/lib/dtos/excel";

export async function insertJornadasExcel(data: insertJornadasExcelParams) {
    try {
        const formData = new FormData();

        formData.append("file", data.archivo!);
        formData.append("id_proyecto", data.proyecto.toString());
        formData.append("id_tipojornada", data.tipoJornada.toString());

        const responseRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EXCEL}`, {
            method: "POST",
            body: formData,
        });

        if (!responseRaw.ok) {
            const errorText = await responseRaw.text();
            console.error("Error en el response del backend:", errorText);
            throw new Error(`Error al importar Excel: ${responseRaw.status}`);
        };

        const response = await responseRaw.json();

        return response;
    } catch (error) {
        throw error;
    };
};

export async function fetchSelectDataExcelImport() {
    try {
        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTOS}`, {
            method: "GET"
        });

        const tiposJornadaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOSJORNADA}`, {
            method: "GET"
        });

        if (!proyectosRaw.ok || !tiposJornadaRaw.ok) {
            throw new Error("Error en alguna de las respuestas del servidor");
        };

        const proyectos = await proyectosRaw.json(); 
        const tiposJornada = await tiposJornadaRaw.json();

        return { proyectos, tiposJornada };
    } catch (error) {
        throw error;
    };
};