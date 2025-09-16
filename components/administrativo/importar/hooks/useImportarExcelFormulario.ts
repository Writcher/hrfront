import { useForm } from "react-hook-form";
import { importarExcelFormularioDatos } from "../types";

export const useImportarExcelFormulario = () => {
  return useForm<importarExcelFormularioDatos>({
    defaultValues: {
      proyecto: '',
      tipoJornada: '',
      archivo: null
    },
  });
};