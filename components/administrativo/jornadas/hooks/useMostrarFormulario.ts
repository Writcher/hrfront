import { hookGenericoHijoProps } from "../types";

export const useMostrarFormulario = ({ setValue, watch }: hookGenericoHijoProps<'setValue' | 'watch'>) => {
    const formularioVisible = watch("formularioVisible");

    const handleMostrarFormulario = () => {
        setValue("formularioVisible", !formularioVisible);
        setValue("jornadaPartida", false);
        setValue("entrada", "");
        setValue("salida", "");
        setValue("entradaTarde", "");
        setValue("salidaTarde", "");
        setValue("tipoJornada", '');
        setValue("tipoAusencia", '');
        setValue("fecha", "");
        setValue("observacion", '');
    };

    return {
        formularioVisible,
        handleMostrarFormulario
    };
};