import { useEffect } from "react";

export const useFiltrosInteriores = (setValue: any,  watch: any) => {
    const filtroMarcasIncompletas = watch("filtroMarcasIncompletas")
    
    const handleLimpiarFiltros = () => {
        setValue("filtroMes", 0);
        setValue("filtroQuincena", 0);
        setValue("filtroMarcasIncompletas", false);
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
    const handleCambioFiltroMarcasIncompletas = () => {
        setValue("filtroMarcasIncompletas", !filtroMarcasIncompletas)
    };

    return {
        handleLimpiarFiltros,
        handleCambioFiltroMes,
        handleCambioFiltroQuincena,
        handleCambioFiltroMarcasIncompletas,
        getNombreMes
    };
};