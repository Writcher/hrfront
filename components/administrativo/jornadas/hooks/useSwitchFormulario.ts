export const useSwitchFormulario = (setValue: any, watch: any) => {
    const jornadaPartida = watch("jornadaPartida");

    const onCambioJornadaPartida = () => {
        setValue("jornadaPartida", !jornadaPartida)
    };

    return { onCambioJornadaPartida, jornadaPartida };
};