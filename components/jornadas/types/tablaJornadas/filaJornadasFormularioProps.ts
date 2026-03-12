import { Control } from 'react-hook-form';
import { ObservacionForm } from './useObservacionForm';
import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';

export type FilaJornadaFormularioProps = {
  fecha: string,
  dia: number,
  control: Control<ObservacionForm>,
  creando: boolean,
  camposValidos: boolean,
  onCreate: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
  setObservacionFormulario: Dispatch<SetStateAction<boolean>>,
};