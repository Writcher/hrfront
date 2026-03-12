import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { TablaResumenFiltrosForm, TablaResumenFiltrosFormProps } from '../types/tablaResumen/useTablaResumenFiltrosForm';
import { Mes } from '@/lib/types/entites/mes';

export const useTablaResumenFiltrosForm = ({ meses }: TablaResumenFiltrosFormProps) => {
  const fechaActual = new Date();
  const diaActual = fechaActual.getDate();
  const mesActual = fechaActual.getMonth() + 1;
  const añoActual = fechaActual.getFullYear();
  const quincenaActual = diaActual <= 15 ? 1 : 2;

  const form = useForm<TablaResumenFiltrosForm>({
    defaultValues: {
      filtroMes: '',
      filtroQuincena: '',
    }
  });

  const { reset } = form;

  useEffect(() => {
    if (meses && meses.length > 0) {
      const mesEncontrado = meses.find(
        (mes: Mes) => mes.mes === mesActual && mes.id_año === añoActual
      );

      console.log('mesEncontrado: ', mesEncontrado)

      if (mesEncontrado) {
        reset({
          filtroMes: mesEncontrado.id,
          filtroQuincena: quincenaActual,
        });
      }
    }
  }, [meses]);

  return form;
};