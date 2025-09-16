import { useEffect, useState } from "react";
import { deshabilitarBotonProps } from "../types";

export const useEstadoBoton = ({ totalIncompletoProp, cargando }: deshabilitarBotonProps) => {

    const [ totalIncompleto, setTotalIncompleto ] = useState<number>(0)

    useEffect(() => {
        if (totalIncompletoProp !== undefined && !cargando) {
            setTotalIncompleto(totalIncompletoProp)
        }
    }, [totalIncompletoProp])

    const deshabilitado = totalIncompleto !== 0;

    return deshabilitado;
};