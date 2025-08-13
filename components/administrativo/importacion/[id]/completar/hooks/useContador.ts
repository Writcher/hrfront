export const useContadorIncompletos = (setValue: any, getValues: any) => {
    const contador = getValues("totalIncompleto");
    const handleGuardarFila = () => {
        setValue("totalIncompleto", contador - 1);
    };
    return { 
        handleGuardarFila
     };
};