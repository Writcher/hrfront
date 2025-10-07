import { fetchTiposAusencia } from "@/services/tipoausencia/service.tipoausencia";
import { fetchTiposJornada } from "@/services/tipojornada/service.tipojornada";
import { useQuery } from "@tanstack/react-query";

export const useSelectDatosFormulario = () => {
    const { data: tiposJornada, isLoading: tiposJornadaCargando, isError: tiposJornadaError } = useQuery({
        queryKey: ["fetchTiposJornada"],
        queryFn: () => fetchTiposJornada(),
        refetchOnWindowFocus: false,
    });

    const { data: tiposAusencia, isLoading: tiposAusenciaCargando, isError: tiposAusenciaError } = useQuery({
        queryKey: ["fetchTiposAusencia"],
        queryFn: () => fetchTiposAusencia(),
        refetchOnWindowFocus: false,
    });

    const cargando = tiposJornadaCargando || tiposAusenciaCargando;

    const error = tiposJornadaError || tiposAusenciaError;

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

    return {
        tiposJornada,
        tiposAusencia,
        id_ausencia,
        id_jornadaNormal,
        cargando,
        error
    };
};