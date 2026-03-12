'use server'

import CONFIG from '@/config';
import { DeactivateEmpleadoDto, EditEmpleadoDto, FetchEmpleadosDto, FetchAsistenciaDto } from '@/lib/dtos/empleado';
import { getToken } from '@/lib/utils/getToken';

export async function fetchEmpleados(params: FetchEmpleadosDto) {
    try {
        const token = await getToken();

        const empleadosParams: Record<string, string> = {
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
            column: params.ordenColumna,
            direction: params.ordenDireccion,
            id_tipoausencia: params.filtroTipoAusencia != null ? params.filtroTipoAusencia.toString() === '' ? '0' : params.filtroTipoAusencia.toString() : '-1',
        };

        if (params.filtroMes != undefined && params.filtroMes !== '' && params.filtroMes !== 0) {
            empleadosParams.id_mes = params.filtroMes.toString();
        };

        if (params.filtroQuincena != undefined && params.filtroQuincena !== '' && params.filtroQuincena !== 0) {
            empleadosParams.quincena = params.filtroQuincena.toString();
        };

        if (params.filtroMarcaManual) {
            empleadosParams.manual = params.filtroMarcaManual.toString();
        };

        if (params.busquedaNombre !== '') {
            empleadosParams.nombre = params.busquedaNombre;
        };

        if (params.busquedaLegajo !== '') {
            empleadosParams.legajo = params.busquedaLegajo.toString();
        };

        if (params.filtroTipoEmpleado !== '') {
            empleadosParams.id_tipoempleado = params.filtroTipoEmpleado.toString();
        };

        if (params.filtroProyecto !== '') {
            empleadosParams.id_proyecto = params.filtroProyecto.toString();
        };

        const empleadosUrlParams = new URLSearchParams(empleadosParams);

        const empleadosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADO}?${empleadosUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!empleadosRaw.ok) {
            throw new Error(`Error fetching empleados: ${empleadosRaw.status} - ${empleadosRaw.statusText}`);
        };

        const empleados = await empleadosRaw.json();

        return empleados;
    } catch (error) {
        console.error('Fetch empleados failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deactivateEmpleado(params: DeactivateEmpleadoDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADO}/${params.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deactivating empleado with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Deactivate empleado failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editEmpleado(params: EditEmpleadoDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADO}/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_modalidadvalidacion: params.id_modalidadvalidacion
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error editing empleado with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Edit empleado failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function fetchAsistencia(params: FetchAsistenciaDto) {
    try {
        const token = await getToken();

        const asistenciaUrlParams = new URLSearchParams({
            id_proyecto: params.proyecto.toString(),
            fecha: params.fecha,
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
        });

        const asistenciaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_ASISTENCIA}?${asistenciaUrlParams.toString()}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!asistenciaRaw.ok) {
            throw new Error(`Error fetching asistencia: ${asistenciaRaw.status} - ${asistenciaRaw.statusText}`);
        };

        const asistencia = await asistenciaRaw.json();

        console.log(asistencia)

        return asistencia;
    } catch (error) {
        console.error('Fetch asistencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};