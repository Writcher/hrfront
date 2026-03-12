import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TablaJornadasForm } from './useTablaJornadasForm';
import { formularioDatos } from '..';

export type TablaJornadasFormularioProps = {
  formularioDatos: formularioDatos | undefined,
  formularioCargando: boolean,
  control: Control<TablaJornadasForm>,
  watch: UseFormWatch<TablaJornadasForm>,
  onCambioJornadaPartida: () => void;
  jornadaPartida: boolean;
  setValue: UseFormSetValue<TablaJornadasForm>,
};