import { useState } from "react";

export const useJornadaPartida = () => {

    const [ jornadaPartida, setJornadaPartida ] = useState<boolean>(false);

    const onCambioJornadaPartida = () => {
        setJornadaPartida(!jornadaPartida)
    };

    return { onCambioJornadaPartida, jornadaPartida };
};