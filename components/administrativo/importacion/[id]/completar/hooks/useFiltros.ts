export const useFiltros = (setValue: any, watch: any) => {
    const filtroMarcasIncompletas = watch("filtroMarcasIncompletas");

    const handleCambioFiltroIncompletas = () => {
        setValue("filtroMarcasIncompletas", !filtroMarcasIncompletas)
    };

    return {
        handleCambioFiltroIncompletas
    };
};