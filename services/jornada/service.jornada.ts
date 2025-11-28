"use server"

import CONFIG from "@/config";
import { deleteJornadaDTO, editJornadaDTO, fetchJornadasDTO, fetchJornadasPorImportacionDTO, insertJornadaDTO, updateJornadaTipoAusenciaDTO, validateJornadaDTO } from "@/lib/dtos/jornada";
import { getToken } from "@/lib/utils/getToken";

export async function fetchJornadas(parametros: fetchJornadasDTO) {
    try {
        const token = await getToken();

        const jornadasParametros = new URLSearchParams({
            filtroMes: parametros.filtroMes.toString() === '' ? '0' : parametros.filtroMes.toString(),
            filtroQuincena: parametros.filtroQuincena.toString() === '' ? '0' : parametros.filtroQuincena.toString(),
            filtroMarcasIncompletas: parametros.filtroMarcasIncompletas ? parametros.filtroMarcasIncompletas.toString() : "false",
            pagina: parametros.pagina != null ? parametros.pagina.toString() : '',
            filasPorPagina: parametros.filasPorPagina != null ? parametros.filasPorPagina.toString() : '',
            ausencias: parametros.ausencias ? parametros.ausencias.toString() : "false",
            filtroTipoAusencia: parametros.filtroTipoAusencia != null ? parametros.filtroTipoAusencia.toString() : '0'
        });

        const jornadasRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADOJORNADAS!.replace("{id}", parametros.id_empleado!.toString())}?${jornadasParametros.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!jornadasRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const jornadas = await jornadasRaw.json();

        console.log(jornadas)

        return jornadas;
    } catch (error) {
        throw error;
    };
};

export async function editJornada(parametros: editJornadaDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA!.replace("{id}", parametros.id!.toString())}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                entrada: parametros.entrada,
                salida: parametros.salida,
                accion: 'editar'
            })
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function deleteJornada(parametros: deleteJornadaDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA!.replace("{id}", parametros.id!.toString())}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function validateJornada(parametros: validateJornadaDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA!.replace("{id}", parametros.id!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ accion: "validar" }),
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function updateJornadaTipoAusencia(parametros: updateJornadaTipoAusenciaDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA!.replace("{id}", parametros.id_jornada!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                accion: "justificar",
                tipoAusencia: parametros.tipoAusencia
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function insertJornada(parametros: insertJornadaDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CREAR_JORNADA}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parametros),
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function fetchJornadasPorImportacion(parametros: fetchJornadasPorImportacionDTO) {
    try {
        const token = await getToken();

        const jornadasParametros = new URLSearchParams({
            filtroMarcasIncompletas: parametros.filtroMarcasIncompletas.toString(),
            pagina: parametros.pagina.toString(),
            filasPorPagina: parametros.filasPorPagina.toString()
        });

        const jornadasRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACIONJORNADAS!.replace("{id}", parametros.id_importacion!.toString())}?${jornadasParametros.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!jornadasRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const jornadas = await jornadasRaw.json();

        return jornadas;
    } catch (error) {
        throw error;
    };
};