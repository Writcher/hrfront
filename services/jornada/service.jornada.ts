'use server'

import CONFIG from '@/config';
import { DeleteJornadaDto, EditJornadaDto, FetchJornadasDto, FetchJornadasPorImportacionDto, CreateJornadaDto, EditJornadaTipoAusenciaDto, ValidateJornadaDto, FetchResumenDto } from '@/lib/dtos/jornada';
import { getToken } from '@/lib/utils/getToken';

export async function fetchJornadas(params: FetchJornadasDto) {
    try {
        const token = await getToken();

        const jornadasParams: Record<string, string> = {
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
        };

        if (params.filtroMes !== '' && params.filtroMes !== 0) {
            jornadasParams.id_mes = params.filtroMes.toString();
        };

        if (params.filtroQuincena !== '' && params.filtroQuincena !== 0) {
            jornadasParams.quincena = params.filtroQuincena.toString();
        };

        if (params.ausencias) {
            jornadasParams.ausencias = params.ausencias.toString();
        };

        if (params.filtroTipoAusencia === '') {
            jornadasParams.id_tipoausencia = '0';
        } else if (params.filtroTipoAusencia != null) {
            jornadasParams.id_tipoausencia = params.filtroTipoAusencia.toString();
        };

        const jornadasUrlParams = new URLSearchParams(jornadasParams);

        const jornadasRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADO}/${params.id_empleado}/jornada?${jornadasUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!jornadasRaw.ok) {
            throw new Error(`Error fetching jornadas for employee with id ${params.id_empleado}: ${jornadasRaw.status} - ${jornadasRaw.statusText}`);
        };

        const jornadas = await jornadasRaw.json();

        return jornadas;
    } catch (error) {
        console.error('Fetch jornadas failed: ', {
            id_empleado: params.id_empleado,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function fetchResumen(params: FetchResumenDto) {
    try {
        const token = await getToken();

        const resumenParams: Record<string, string> = {
            id_mes: params.filtroMes.toString()
        };

        if (params.filtroQuincena !== '' && params.filtroQuincena !== 0) {
            resumenParams.quincena = params.filtroQuincena.toString();
        };

        const resumenUrlParams = new URLSearchParams(resumenParams);

        const resumenRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADO}/${params.id_empleado}/resumen?${resumenUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!resumenRaw.ok) {
            throw new Error(`Error jornadas for employee with id ${params.id_empleado}: ${resumenRaw.status} - ${resumenRaw.statusText}`);
        };

        const resumen = await resumenRaw.json();

        return resumen;
    } catch (error) {
        console.error('Fetch resumen failed: ', {
            id_empleado: params.id_empleado,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editJornada(params: EditJornadaDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id}/editar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entrada: params.entrada,
                salida: params.salida
            })
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error editing jornada with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Edit jornada failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteJornada(params: DeleteJornadaDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deleting jornada with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Delete jornada failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function validateJornada(params: ValidateJornadaDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id}/validar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error validating jornada with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Validate jornada failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editJornadaTipoAusencia(params: EditJornadaTipoAusenciaDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id_jornada}/justificar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_tipoausencia: params.tipoAusencia
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error editing jornada with id ${params.id_jornada}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Edit jornada tipoAusencia failed: ', {
            id: params.id_jornada,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function createJornada(params: CreateJornadaDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entrada: params.entrada,
                salida: params.salida,
                entradaTarde: params.entradaTarde,
                salidaTarde: params.salidaTarde,
                fecha: params.fecha,
                id_tipojornada: params.id_tipojornada === '' ? undefined : params.id_tipojornada,
                id_tipoausencia: params.id_tipoausencia === '' ? undefined : params.id_tipoausencia,
                observacion: params.observacion,
                id_empleado: params.id_empleado
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error creating jornada: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Create jornada failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function fetchJornadasPorImportacion(params: FetchJornadasPorImportacionDto) {
    try {
        const token = await getToken();

        const jornadasUrlParams = new URLSearchParams({
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString()
        });

        const jornadasRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION}/${params.id_importacion}/jornada?${jornadasUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!jornadasRaw.ok) {
            throw new Error(`Error fetching jornadas: ${jornadasRaw.status} - ${jornadasRaw.statusText}`);
        };

        const jornadas = await jornadasRaw.json();

        return jornadas;
    } catch (error) {
        console.error('Fetch jornadas failed: ', {
            id_importacion: params.id_importacion,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};