'use server'

import CONFIG from '@/config';
import { ExportResumenDto, ExportAsistenciaDto } from '@/lib/dtos/exportar';
import { getToken } from '@/lib/utils/getToken';

export async function exportResumen(params: ExportResumenDto) {
    try {
        const token = await getToken();

        const resumenParams: Record<string, string> = {
            id_mes: params.mes.toString(),
        };

        if (params.tipoEmpleado !== '' && params.tipoEmpleado !== 0) {
            resumenParams.id_tipoempleado = params.tipoEmpleado.toString();
        };

        if (params.quincena !== '' && params.quincena !== 0) {
            resumenParams.quincena = params.quincena.toString();
        };

        const resumenUrlParams = new URLSearchParams(resumenParams);

        params.proyectos.forEach(id => {
            resumenUrlParams.append('ids_proyecto', id.toString());
        });

        const resumenRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EXPORTAR}/resumen?${resumenUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!resumenRaw.ok) {
            throw new Error(`Error exporting resumen: ${resumenRaw.status} - ${resumenRaw.statusText}`);
        };

        const contentDisposition = resumenRaw.headers.get('content-disposition');
        const filenameMatch = contentDisposition?.match(/filename='(.+)'/);
        const nombre = filenameMatch ? filenameMatch[1] : 'exportacion.xlsx';

        const resumen = await resumenRaw.blob();

        return {
            resumen,
            nombre
        };
    } catch (error) {
        console.error('Export resumen failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function exportAsistencia(data: ExportAsistenciaDto) {
    try {
        const token = await getToken();

        const asistenciaUrlParams = new URLSearchParams({
            id_proyecto: data.proyecto.toString(),
            fecha: data.fecha,
        });

        const asistenciaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EXPORTAR}/asistencia?${asistenciaUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!asistenciaRaw.ok) {
            throw new Error(`Error exporting asistencia: ${asistenciaRaw.status} - ${asistenciaRaw.statusText}`);
        };

        const asistencia = await asistenciaRaw.blob();

        return asistencia;
    } catch (error) {
        console.error('Export asistencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};