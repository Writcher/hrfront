import { hookGenericoHijoProps } from "../types";

export const useSwitchFormulario = ({ setValue, watch }: hookGenericoHijoProps<'setValue' | 'watch'>) => {
    const jornadaPartida = watch("jornadaPartida");

    const onCambioJornadaPartida = () => {
        setValue("jornadaPartida", !jornadaPartida)
    };

    return { onCambioJornadaPartida, jornadaPartida };
};