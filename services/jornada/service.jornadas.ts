"use server"

import { fetchProyectos } from "../proyecto/service.proyecto";
import { fetchTiposAusencia } from "../tipoausencia/service.tipoausencia";
import { fetchTiposEmpleado } from "../tipoempleado/service.tipoempleado";
import { fetchTiposJornada } from "../tipojornada/service.tipojornada";

export async function fetchDatosSelectFormularioJornada() {
    try {
        const tiposJornada = await fetchTiposJornada();

        const tiposAusencia = await fetchTiposAusencia();

        let id_ausencia;
        let id_jornadaNormal;

        if (tiposJornada && tiposAusencia) {
            const tipo = tiposJornada.find(
                (item: { id: number, nombre: string }) => item.nombre === "Ausencia"
            );

            id_ausencia = tipo ? tipo.id : null;
        };


        if (tiposJornada && tiposAusencia) {
            const tipo = tiposJornada.find(
                (item: { id: number, nombre: string }) => item.nombre === "Jornada Normal"
            );

            id_jornadaNormal = tipo ? tipo.id : null;
        };

        return { tiposJornada, tiposAusencia, id_ausencia, id_jornadaNormal };
    } catch (error) {
        throw error;
    };
};

export async function fetchDatosSelectTablaEmpleados() {
    try {
        const tiposEmpleado = await fetchTiposEmpleado();

        const proyectos = await fetchProyectos();

        return { tiposEmpleado, proyectos };
    } catch (error) {
        throw error;
    };
};