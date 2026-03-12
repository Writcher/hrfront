import { useState } from 'react';

export const useMostrarFormulario = ({ reset }: any) => {

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