import { useOrdenacionProps } from "@/lib/types/hooks";
import { useState } from "react";

export const useOrdenacion = ({ columnaInicial }: useOrdenacionProps) => {

  const [ direccion, setDireccion ] = useState<'ASC' | 'DESC'>('ASC')

  const [ columna, setColumna ] = useState<string>(columnaInicial)

  const handleOrdenacion = (nuevaColumna: string) => {
    const nuevaDireccion = columna === nuevaColumna && direccion === 'ASC' ? 'DESC' : 'ASC';
    setColumna(nuevaColumna);
    setDireccion(nuevaDireccion);
  };
  return {
    direccion,
    columna,
    handleOrdenacion
  };
};