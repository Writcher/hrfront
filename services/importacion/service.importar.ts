"use server";

import CONFIG from "@/config";
import { exportJornadasExcelDTO, insertJornadasExcelDTO } from "@/lib/dtos/excel";
import { getToken } from "@/lib/utils/getToken";

export async function insertJornadasExcel(data: insertJornadasExcelDTO) {
    try {
        const token = await getToken();

        const formData = new FormData();

        formData.append("file", data.archivo!);
        formData.append("id_proyecto", data.proyecto.toString() === '' ? '0' : data.proyecto.toString());
        formData.append("id_tipojornada", data.tipoJornada.toString() === '' ? '0' : data.tipoJornada.toString());
        formData.append("id_tipoimportacion", data.tipoInforme.toString() === '' ? '0' : data.tipoInforme.toString());
        formData.append("fecha", data.fecha);

        const responseRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EXCEL_IMPORT}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
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

export async function exportJornadasExcel(data: exportJornadasExcelDTO) {
    try {
        const token = await getToken();

        const resumenParametros = new URLSearchParams({
            proyecto: data.proyecto.toString(),
            mes: data.mes.toString(),
            quincena: data.quincena.toString() === '' ? '0' : data.quincena.toString(),
            accion: "resumen",
        });

        const resumenRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EXCEL_EXPORT}?${resumenParametros.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!resumenRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const resumen = await resumenRaw.blob();

        return resumen;
    } catch (error) {
        throw error;
    };
};