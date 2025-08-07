"use server";

import CONFIG from "@/config";
import { insertJornadasExcelData } from "@/lib/dtos/excelimportservice";

export async function insertJornadasExcel(data: insertJornadasExcelData) {
    try {
        const formData = new FormData();

        formData.append("file", data.file!);
        formData.append("id_proyecto", data.id_proyecto.toString());
        formData.append("id_tipojornada", data.id_tipojornada.toString());

        const response = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EXCEL_IMPORT}`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error en el response del backend:", errorText);
            throw new Error(`Error al importar Excel: ${response.status}`);
        };

        return response.status;
    } catch (error) {
        console.error("Error importando Excel: ", error);
        throw error;
    };
};

export async function fetchSelectDataExcelImport() {
    try {
        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTOS}`, {
            method: "GET"
        });

        const tiposJornadaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOJORNADA}`, {
            method: "GET"
        });

        if (!proyectosRaw.ok || !tiposJornadaRaw.ok) {
            throw new Error("Error en alguna de las respuestas del servidor");
        };

        const proyectos = await proyectosRaw.json(); 
        const tiposJornada = await tiposJornadaRaw.json();

        return { proyectos, tiposJornada };
    } catch (error) {
        console.error("Error buscando datos para selec ExcelImport: ", error);
        throw error;
    };
};