import { deshabilitarBotonProps } from "../types";

export const useEstadoBoton = ({ totalIncompletoProp, cargando }: deshabilitarBotonProps) => {
    const deshabilitado = cargando || (totalIncompletoProp !== undefined && Number(totalIncompletoProp) !== 0);

    return deshabilitado;
};