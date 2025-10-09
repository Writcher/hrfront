import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { fetchTiposEmpleado } from "@/services/tipoempleado/service.tipoempleado";
import { useQuery } from "@tanstack/react-query";

export const useSelectDatos = () => {
    const { data: proyectos, isLoading: proyectosCargando, isError: proyectosError } = useQuery({
        queryKey: ["fetchProyectos"],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false,
    });

    const { data: tiposEmpleado, isLoading: tiposEmpleadoCargando, isError: tiposEmpleadoError } = useQuery({
        queryKey: ["fetchTiposEmpleado"],
        queryFn: () => fetchTiposEmpleado(),
        refetchOnWindowFocus: false,
    });

    const cargando = proyectosCargando || tiposEmpleadoCargando;

    const error = proyectosError || tiposEmpleadoError;

    return {
        proyectos,
        tiposEmpleado,
        cargando,
        error
    };
};