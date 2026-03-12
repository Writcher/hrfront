import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { formularioDatos, tablaJornadasFormularioDatos } from '..';

export type TablaJornadasFormularioProps = {
  formularioDatos: formularioDatos | undefined,
  formularioCargando: boolean,
  control: Control<tablaJornadasFormularioDatos>,
  watch: UseFormWatch<tablaJornadasFormularioDatos>,
  onCambioJornadaPartida: () => void;
  jornadaPartida: boolean;
  setValue: UseFormSetValue<tablaJornadasFormularioDatos>,
};