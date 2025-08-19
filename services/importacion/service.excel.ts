"use server";

import CONFIG from "@/config";
import { insertJornadasExcelParams } from "@/lib/dtos/excel";

export async function insertJornadasExcel(data: insertJornadasExcelParams) {
    try {
        const formData = new FormData();

        formData.append("file", data.archivo!);
        formData.append("id_proyecto", data.proyecto.toString() === '' ? '0' : data.proyecto.toString());
        formData.append("id_tipojornada", data.tipoJornada.toString() === '' ? '0' : data.tipoJornada.toString());

        const responseRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EXCEL}`, {
            method: "POST",
            body: formData,
        });

        const respuesta = await responseRaw.json();
        
        if (!responseRaw.ok) {
            throw new Error(respuesta.error || "Error desconocido al importar excel");
        };

        return respuesta;
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