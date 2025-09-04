import { hookGenericoPadreProps } from "../types";

export const useExpansion = ({ setValue, watch }: hookGenericoPadreProps<'setValue' | 'watch'>) => {
 const idFilaExpandida = watch("idFilaExpandida");

  const toggleExpandirFila = (id: number) => {
    setValue("idFilaExpandida", idFilaExpandida === id ? null : id);
  };

  return {
    idFilaExpandida,
    toggleExpandirFila,
  };
};