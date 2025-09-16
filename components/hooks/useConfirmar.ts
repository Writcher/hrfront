import { useState } from "react";

export const useConfirmar = () => {

    const [ confirmar, setConfirmar ] = useState<boolean>(false)

    const handleConfirmar = (bool?: boolean) => {
        if (typeof bool === "boolean") {
            setConfirmar(bool);
        } else {
            setConfirmar(!confirmar);
        };
    };

    return {
        confirmar,
        handleConfirmar,
    };
};