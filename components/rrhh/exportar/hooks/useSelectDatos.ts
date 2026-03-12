import { fetchMeses } from '@/services/mes/service.mes';
import { fetchProyectos } from '@/services/proyecto/service.proyecto';
import { fetchTiposEmpleado } from '@/services/tipoempleado/service.tipoempleado';
import { useQuery } from '@tanstack/react-query';

export const useSelectDatos = () => {
    const { data: proyectos, isLoading: proyectosCargando, isError: proyectosError } = useQuery({
        queryKey: ['fetchProyectos'],
        queryFn: () => fetchProyectos(),
        refetchOnWindowFocus: false,
    });

    const { data: meses, isLoading: mesesCargando, isError: mesesError } = useQuery({
        queryKey: ['fetchMeses'],
        queryFn: () => fetchMeses(),
        refetchOnWindowFocus: false,
    });

    const { data: tiposEmpleado, isLoading: tiposEmpleadoCargando, isError: tiposEmpleadoError } = useQuery({
        queryKey: ['fetchTiposEmpleado'],
        queryFn: () => fetchTiposEmpleado(),
        refetchOnWindowFocus: false,
    })

    const cargando = proyectosCargando || mesesCargando || tiposEmpleadoCargando;

    const error = proyectosError || mesesError || tiposEmpleadoError;

    return {
        proyectos,
        meses,
        tiposEmpleado,
        cargando,
        error
    };
};