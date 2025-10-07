import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { tablaJornadasResumenFormularioDatos, useTablaJornadaResumenFormularioProps, mes } from "../types";

export const useTablaJornadaResumenFormulario = ({ meses }: useTablaJornadaResumenFormularioProps) => {
  const fechaActual = new Date();
  const diaActual = fechaActual.getDate();
  const mesActual = fechaActual.getMonth() + 1;
  const añoActual = fechaActual.getFullYear();
  const quincenaActual = diaActual <= 15 ? 1 : 2;

  const form = useForm<tablaJornadasResumenFormularioDatos>({
    defaultValues: {
      filtroMes: '',
      filtroQuincena: '',
    }
  });

  const { reset } = form;

  useEffect(() => {
    if (meses && meses.length > 0) {
      const mesEncontrado = meses.find(
        (mes: mes) => mes.mes === mesActual && mes.id_año === añoActual
      );

      if (mesEncontrado) {
        reset({
          filtroMes: mesEncontrado.id,
          filtroQuincena: quincenaActual,
        });
      }
    }
  }, [meses, mesActual, añoActual, quincenaActual, reset]);

  return form;
};