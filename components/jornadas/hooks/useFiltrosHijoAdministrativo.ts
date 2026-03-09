import { hookGenericoHijoAdministrativoProps } from "../types";

export const useFiltrosInteriores = ({ setValue }: hookGenericoHijoAdministrativoProps<'setValue'>) => {
    
    const handleLimpiarFiltros = () => {
        setValue("filtroMes", '');
        setValue("filtroQuincena", '');
    };
    
    const handleCambioFiltroMes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("filtroMes", Number(event.target.value));
    };
    const handleCambioFiltroQuincena = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("filtroQuincena", Number(event.target.value));
    };

    return {
        handleLimpiarFiltros,
        handleCambioFiltroMes,
        handleCambioFiltroQuincena
    };
};