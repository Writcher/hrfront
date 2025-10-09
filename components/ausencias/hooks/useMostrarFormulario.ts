import { useState } from "react";
import { hookGenericoHijoProps } from "../types";
import { FieldValues } from "react-hook-form";

export function useMostrarFormulario<T extends FieldValues>({ reset }: hookGenericoHijoProps<T>) {

    const [formularioVisible, setFormularioVisible] = useState<boolean>(false);

    const handleMostrarFormulario = () => {
        setFormularioVisible(!formularioVisible);
        reset();
    };

    return {
        formularioVisible,
        handleMostrarFormulario,
    };
};