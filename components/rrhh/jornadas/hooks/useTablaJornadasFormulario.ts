import { useForm } from "react-hook-form";
import { tablaJornadasFormularioDatos } from "../types";
import { useEffect } from "react";

interface UseTablaJornadaFormularioProps {
  meses: any
}

export const useTablaJornadaFormulario = ({ meses }: UseTablaJornadaFormularioProps) => {
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const año = fechaActual.getFullYear();
  const quincena = dia <= 15 ? 1 : 2;

  const form = useForm<tablaJornadasFormularioDatos>({
    defaultValues: {
      filtroMes: '',
      filtroQuincena: '',
    }
  });

  const { reset } = form;

  useEffect(() => {
    if (meses && meses.length > 0) {
      const mesEncontrado = meses.find(
        (m: any) => m.mes === mes && m.id_año === año
      );

      if (mesEncontrado) {
        reset({
          filtroMes: mesEncontrado.id,
          filtroQuincena: quincena,
        });
      }
    }
  }, [meses, mes, año, quincena, reset]);

  return form;
};