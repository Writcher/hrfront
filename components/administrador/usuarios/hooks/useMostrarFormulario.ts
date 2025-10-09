import { useState } from "react";
import { hookGenericoHijoProps } from "../types";

export const useMostrarFormulario = ({ reset }: hookGenericoHijoProps) => {

    const [ formularioVisible, setFormularioVisible ] = useState<boolean>(false);

    const handleMostrarFormulario = () => {
        setFormularioVisible(!formularioVisible);
        reset();
    };

    return {
        formularioVisible,
        handleMostrarFormulario
    };
};