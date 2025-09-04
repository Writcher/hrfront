import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { empleadoFormularioDatos, hookGenericoHijoProps } from "../types";

export const useMostrarFormulario = ({ setValue, watch }: hookGenericoHijoProps) => {

    const formularioVisible = watch("formularioVisible");

    const handleMostrarFormulario = () => {
        setValue("formularioVisible", !formularioVisible);
        setValue("nombre", "");
        setValue("id_reloj", "");
        setValue("id_proyecto", "");
        setValue("legajo", "");
    };

    return {
        formularioVisible,
        handleMostrarFormulario
    };
};