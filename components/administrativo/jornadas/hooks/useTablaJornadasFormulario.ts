import { useForm } from "react-hook-form";
import { tablaJornadasFormularioDatos } from "../types";

export const useTablaJornadaFormulario = () => {
  return useForm<tablaJornadasFormularioDatos>({
    defaultValues: {
      filtroMes: '',
      filtroQuincena: '',
      filtroMarcasIncompletas: false,
      pagina: 0,
      filasPorPagina: 16,
      formularioVisible: false,
      entrada: '',
      salida: '',
      entradaTarde: '',
      salidaTarde: '',
      tipoJornada: '',
      tipoAusencia: '',
      observacion: '',
      fecha: '',
      jornadaPartida: false,
    }
  });
};