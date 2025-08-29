export const useMostrarFormulario = (setValue: any, watch: any ) => {
    const formularioVisible = watch("formularioVisible");

    const handleMostrarFormulario = () => {
        setValue("formularioVisible", !formularioVisible);
        setValue("nombre", "");
        setValue("id_reloj", "");
        setValue("id_proyecto", "");
        setValue("legajo", "");
    };

    return {
        formularioVisible,
        handleMostrarFormulario
    };
};