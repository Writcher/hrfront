import { useEffect } from "react";
import { deshabilitarBotonProps } from "../types";

export const useDeshabilitarBoton = ({ setValue, watch, jornadasDatos, jornadasCargando }: deshabilitarBotonProps) => {

    useEffect(() => {
        if (jornadasDatos && jornadasDatos.totalIncompleto !== undefined && !jornadasCargando) {
            setValue("totalIncompleto", jornadasDatos.totalIncompleto)
        }
    }, [jornadasDatos?.totalIncompleto])

    const botonDeshabilitado = Number(watch("totalIncompleto")) !== 0;

    return botonDeshabilitado;
};