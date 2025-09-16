import { hookGenericoProps } from "../types";

export const useFiltros = ({ setValue, watch }: hookGenericoProps) => {

    const filtroIncompletas = watch("filtroIncompletas");

    const handleLimpiarFiltros = () => {
        setValue("filtroProyecto", '');
        setValue("filtroIncompletas", false)
    };

    const handleCambioFiltroIncompletas = () => {
        setValue("filtroIncompletas", !filtroIncompletas)
    };

    const handleCambioFiltroProyecto = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("filtroProyecto", Number(event.target.value));
    };
    
    return {
        handleCambioFiltroIncompletas,
        handleCambioFiltroProyecto,
        handleLimpiarFiltros
    };
};