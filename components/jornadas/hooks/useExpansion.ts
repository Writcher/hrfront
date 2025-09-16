import { useState } from "react";

export const useExpansion = () => {
  const [ idFila, setIdFila ] = useState<number | null>(null)

  const handleExpansionFila = (id: number) => {
    setIdFila(idFila === id ? null : id);
  };

  return {
    idFila,
    handleExpansionFila,
  };
};