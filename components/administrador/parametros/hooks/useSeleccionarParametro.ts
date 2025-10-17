import { useState } from "react";

export const useSeleccionarParametro = () => {
    const [parametro, setParametro] = useState<string>('')

    return {
        parametro,
        setParametro,
    };
};