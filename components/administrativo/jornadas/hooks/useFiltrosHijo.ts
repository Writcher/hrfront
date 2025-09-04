import { hookGenericoHijoProps } from "../types";

export const useFiltrosInteriores = ({ setValue, watch }: hookGenericoHijoProps<'setValue' | 'watch'>) => {
    const filtroMarcasIncompletas = watch("filtroMarcasIncompletas")
    
    const handleLimpiarFiltros = () => {
        setValue("filtroMes", '');
        setValue("filtroQuincena", '');
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