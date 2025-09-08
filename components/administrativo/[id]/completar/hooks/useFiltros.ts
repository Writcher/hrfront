import { hookGenericoPadreProps } from "../types";

export const useFiltros = ({ setValue, watch }: hookGenericoPadreProps<'setValue' | 'watch'>) => {
    
    const filtroMarcasIncompletas = watch("filtroMarcasIncompletas");

    const handleCambioFiltroIncompletas = () => {
        setValue("filtroMarcasIncompletas", !filtroMarcasIncompletas)
    };

    return {
        handleCambioFiltroIncompletas
    };
};