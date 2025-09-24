import { useState } from "react";
import { hookGenericoHijoAdministrativoProps } from "../types";


export const useMostrarFormulario = ({ reset }: hookGenericoHijoAdministrativoProps<'reset'>) => {

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