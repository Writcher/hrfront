import { useForm } from "react-hook-form";
import { tablaJornadasFormularioDatos } from "../types";

export const useTablaJornadaFormulario = () => {
  return useForm<tablaJornadasFormularioDatos>({
    defaultValues: {
      filtroMes: '',
      filtroQuincena: '',
      filtroMarcasIncompletas: false,
      entrada: '',
      salida: '',
      entradaTarde: '',
      salidaTarde: '',
      tipoJornada: '',
      tipoAusencia: '',
      duracionAusencia: '',
      observacion: '',
      fecha: '',
    }
  });
};