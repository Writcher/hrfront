import { usePaginacionProps } from "@/lib/types/hooks";
import { useState } from "react";

export const usePaginacion = ({ filasIniciales }: usePaginacionProps) => {

    const [ pagina, setPagina ] = useState<number>(0)
    const [ filasPorPagina, setFilasPorPagina ] = useState<number>(filasIniciales)

    const handleCambioPagina = (event: React.MouseEvent<HTMLButtonElement> | null, nuevaPagina: number) => {
        setPagina(nuevaPagina);
    };

    const handleCambioFilasPorPagina = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFilasPorPagina(parseInt(event.target.value, 10));
        setPagina(0);
    };

    return {
        pagina,
        filasPorPagina,
        handleCambioPagina,
        handleCambioFilasPorPagina
    };  
};