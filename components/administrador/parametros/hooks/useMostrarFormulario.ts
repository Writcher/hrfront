import { useState } from "react";

export const useMostrarFormulario = () => {
    
    const [formularioVisible, setFormularioVisible] = useState<boolean>(false)

    return {
        formularioVisible,
        setFormularioVisible,
    };
};