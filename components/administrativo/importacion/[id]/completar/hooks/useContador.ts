import { hookGenericoPadreProps } from "../types";

export const useContadorIncompletos = ({ setValue, getValues }: hookGenericoPadreProps<'setValue' | 'getValues'>) => {

    const contador = getValues("totalIncompleto");

    const handleGuardarFila = () => {
        setValue("totalIncompleto", contador - 1);
    };
    
    return { 
        handleGuardarFila
     };
};