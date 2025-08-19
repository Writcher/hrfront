export const useMostrarFormulario = (setValue: any, watch: any ) => {
    const formularioVisible = watch("formularioVisible");

    const handleMostrarFormulario = () => {
        setValue("formularioVisible", !formularioVisible);
        setValue("entrada", "");
        setValue("salida", "");
        setValue("entradaTarde", "");
        setValue("salidaTarde", "");
        setValue("tipoJornada", '');
        setValue("tipoAusencia", '');
        setValue("fecha", "");
        setValue("observacion", '');
        setValue("feriado", false);
    };

    return {
        formularioVisible,
        handleMostrarFormulario
    };
};