import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { fetchTiposImportacion } from "@/services/tipoimportacion/service.tipoimportacion";
import { fetchTiposJornada } from "@/services/tipojornada/service.tipojornada";
import { useQuery } from "@tanstack/react-query";

export const useSelectDatos = () => {
    const { data: proyectos, isLoading: proyectosCargando, isError: proyectosError } = useQuery({
        queryKey: ["fetchProyectos"],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false,
    });

    const { data: tiposJornada, isLoading: tiposJornadaCargando, isError: tiposJornadaError } = useQuery({
        queryKey: ["fetchTiposJornada"],
        queryFn: () => fetchTiposJornada(),
        refetchOnWindowFocus: false,
    });

    const { data: tiposImportacion, isLoading: tiposImportacionCargando, isError: tiposImportacionError } = useQuery({
        queryKey: ["fetchTiposImportacion"],
        queryFn: () => fetchTiposImportacion(),
        refetchOnWindowFocus: false,
    });

    const cargando = proyectosCargando || tiposJornadaCargando || tiposImportacionCargando;

    const error = proyectosError || tiposJornadaError || tiposImportacionError;

    return {
        proyectos,
        tiposJornada,
        tiposImportacion,
        cargando,
        error
    };
};