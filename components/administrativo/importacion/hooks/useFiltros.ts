export const useFiltros = (setValue: any, watch: any) => {
    const filtroIncompletas = watch("filtroIncompletas");

    const handleLimpiarFiltros = () => {
        setValue("filtroProyecto", 0);
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