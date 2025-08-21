"use server"

import { fetchTiposAusencia } from "../tipoausencia/service.tipoausencia";
import { fetchTiposJornada } from "../tipojornada/service.tipojornada";

export async function fetchDatosSelectFormularioJornada() {
    try {
        const tiposJornada = await fetchTiposJornada();

        const tiposAusencia = await fetchTiposAusencia();

        let id_ausenciaJustificada;
        let id_ausenciaInjustificada;
        let id_jornadaNormal;

        if (tiposJornada && tiposAusencia) {
            const tipo = tiposJornada.find(
                (item: { id: number, nombre: string }) => item.nombre === "Ausencia Justificada"
            );

            id_ausenciaJustificada = tipo ? tipo.id : null;
        };

        if (tiposJornada && tiposAusencia) {
            const tipo = tiposJornada.find(
                (item: { id: number, nombre: string }) => item.nombre === "Ausencia Injustificada"
            );

            id_ausenciaInjustificada = tipo ? tipo.id : null;
        };

        if (tiposJornada && tiposAusencia) {
            const tipo = tiposJornada.find(
                (item: { id: number, nombre: string }) => item.nombre === "Jornada Normal"
            );

            id_jornadaNormal = tipo ? tipo.id : null;
        };

        return { tiposJornada, tiposAusencia, id_ausenciaJustificada, id_jornadaNormal, id_ausenciaInjustificada };
    } catch (error) {
        throw error
    };
};