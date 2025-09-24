import { hookGenericoHijoAdministrativoProps } from "../types";

export const useFiltrosInteriores = ({ setValue, watch }: hookGenericoHijoAdministrativoProps<'setValue' | 'watch'>) => {
    
    const filtroMarcasIncompletas = watch("filtroMarcasIncompletas")
    
    const handleLimpiarFiltros = () => {
        setValue("filtroMes", '');
        setValue("filtroQuincena", '');
        setValue("filtroMarcasIncompletas", false);
    };
    const handleCambioFiltroMes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("filtroMes", Number(event.target.value));
    };
    const handleCambioFiltroQuincena = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("filtroQuincena", Number(event.target.value));
    };
    const handleCambioFiltroMarcasIncompletas = () => {
        setValue("filtroMarcasIncompletas", !filtroMarcasIncompletas)
    };

    return {
        handleLimpiarFiltros,
        handleCambioFiltroMes,
        handleCambioFiltroQuincena,
        handleCambioFiltroMarcasIncompletas,
    };
};