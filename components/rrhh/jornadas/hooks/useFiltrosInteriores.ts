export const useFiltrosInteriores = (setValue: any,  watch: any) => {
    
    const handleLimpiarFiltros = () => {
        setValue("filtroQuincena", '');
    };
    const handleCambioFiltroMes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("filtroMes", Number(event.target.value));
    };
    const getNombreMes = (mes: number) => {
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return meses[mes - 1] ?? "";
    };
    const handleCambioFiltroQuincena = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("filtroQuincena", Number(event.target.value));
    };

    return {
        handleLimpiarFiltros,
        handleCambioFiltroMes,
        handleCambioFiltroQuincena,
        getNombreMes
    };
};