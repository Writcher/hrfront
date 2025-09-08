import { hookGenericoHijoProps } from "../types";

export const useConfirmar = ({ setValue, watch }: hookGenericoHijoProps) => {
    const confirmarBorrar = watch("confirmarBorrar");
    const confirmarValidar = watch("confirmarValidar");

    const handleConfirmarBorrar = (bool?: boolean) => {
        if (typeof bool === "boolean") {
            setValue("confirmarBorrar", bool);
        } else {
            setValue("confirmarBorrar", !confirmarBorrar);
        };
    };

    const handleConfirmarValidar = (bool?: boolean) => {
        if (typeof bool === "boolean") {
            setValue("confirmarValidar", bool);
        } else {
            setValue("confirmarValidar", !confirmarValidar);
        };
    };

    return {
        confirmarBorrar,
        confirmarValidar,
        handleConfirmarBorrar,
        handleConfirmarValidar,
    };
};