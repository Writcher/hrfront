import { fetchProyectos } from "@/services/proyecto/service.proyecto";
import { fetchTiposEmpleado } from "@/services/tipoempleado/service.tipoempleado";
import { fetchTurnos } from "@/services/turno/service.turno";
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

    const { data: turnos, isLoading: turnosCargando, isError: turnosError } =useQuery({
        queryKey: ["fetchTurnos"],
        queryFn: () => fetchTurnos(),
        refetchOnWindowFocus: false,
    });

    const cargando = proyectosCargando || tiposEmpleadoCargando || turnosCargando;

    const error = proyectosError || tiposEmpleadoError || turnosError;

    return {
        proyectos,
        tiposEmpleado,
        turnos,
        cargando,
        error
    };
};