import { Dispatch, SetStateAction } from 'react';
import { Jornada } from './tablaJornadasProps';

export type FilaJornadasInformacionProps = {
  jornada: Jornada,
  dia: number,
  onDelete: (id: number) => void,
  setObservacionFormulario: Dispatch<SetStateAction<boolean>>
};