import { useForm } from "react-hook-form";
import { tablaJornadasFormularioDatos } from "../types";

export const useTablaJornadaFormulario = () => {
  return useForm<tablaJornadasFormularioDatos>({
    defaultValues: {
      filtroMes: '',
      filtroQuincena: '',
      entrada: '',
      salida: '',
      entradaTarde: '',
      salidaTarde: '',
      tipoJornada: '',
      tipoAusencia: '',
      observacion: '',
      fecha: '',
    }
  });
};