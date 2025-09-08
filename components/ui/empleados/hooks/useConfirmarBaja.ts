import { hookGenericoHijoProps } from "../types";

export const useConfirmarBaja = ({ setValue, watch }: hookGenericoHijoProps) => {
    const confirmarBaja = watch("confirmarBaja");

    const handleConfirmarBaja = (bool?: boolean) => {
        if (typeof bool === "boolean") {
            setValue("confirmarBaja", bool);
        } else {
            setValue("confirmarBaja", !confirmarBaja);
        };
    };

    return {
        confirmarBaja,
        handleConfirmarBaja,
    };
};