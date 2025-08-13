"use server"

import { FormularioJornadaFormularioDatos } from "@/components/administrativo/importacion/[id]/completar/types";
import CONFIG from "@/config";
import { fetchEmpleadosTablaJornadasParams, fetchJornadasEmpleadosParams } from "@/lib/dtos/jornadas";

export async function fetchDatosSelectTablaEmpleados() {
    try {
        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTOS}`, {
            method: "GET"
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

export async function fetchEmpleadosTablaJornadas(data: fetchEmpleadosTablaJornadasParams) {
    try {
        const datosEmpleadosParams = new URLSearchParams({
            busquedaNombre: data.busquedaNombre,
            filtroProyecto: data.filtroProyecto.toString(),
            pagina: data.pagina.toString(),
            filasPorPagina: data.filasPorPagina.toString(),
            ordenColumna: data.ordenColumna,
            ordenDireccion: data.ordenDireccion
        });

        const datosEmpleadosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADOS}?${datosEmpleadosParams.toString()}`, {
            method: "GET"
        });

        if (!datosEmpleadosRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const datosEmpleados = await datosEmpleadosRaw.json();

        return datosEmpleados;
    } catch (error) {
        throw error;
    };
};

export async function fetchDatosSelectTablaJornadas() {
    try {
        const mesesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_MESES}`, {
            method: "GET"
        });

        if (!mesesRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const meses = await mesesRaw.json();

        return meses;
    } catch (error) {
        throw error;
    };
};

export async function fetchJornadasEmpleado(data: fetchJornadasEmpleadosParams) {
    try {
        const jornadasEmpleadoParams = new URLSearchParams({
            filtroMes: data.filtroMes.toString(),
            filtroQuincena: data.filtroQuincena.toString(),
            filtroMarcasIncompletas: data.filtroMarcasIncompletas.toString(),
            pagina: data.pagina.toString(),
            filasPorPagina: data.filasPorPagina.toString(),
        });

        const jornadasRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_EMPLEADOJORNADAS!.replace("{id}",data.idEmpleado!.toString())}?${jornadasEmpleadoParams.toString()}`, {
            method: "GET"
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

export async function editJornada(parametros: FormularioJornadaFormularioDatos) {
    try {
        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA!.replace("{id}",parametros.id!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                entrada: parametros.entrada,
                salida: parametros.salida
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