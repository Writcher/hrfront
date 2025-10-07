import { fetchMeses } from "@/services/mes/service.mes";
import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { useQuery } from "@tanstack/react-query";

export const useSelectDatos = () => {
    const { data: proyectos, isLoading: proyectosCargando, isError: proyectosError } = useQuery({
        queryKey: ["fetchProyectos"],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false,
    });

    const { data: meses, isLoading: mesesCargando, isError: mesesError } = useQuery({
        queryKey: ["fetchMeses"],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
    });

    const cargando = proyectosCargando || mesesCargando;

    const error = proyectosError || mesesError;

    return {
        proyectos,
        meses,
        cargando,
        error
    };
};