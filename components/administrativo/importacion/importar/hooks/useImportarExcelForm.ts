import { useForm } from "react-hook-form";
import { importarExcelDatos } from "../types";

export const useImportarExcelForm = () => {
  return useForm<importarExcelDatos>({
    defaultValues: {
      proyecto: '',
      tipoJornada: '',
      archivo: null
    }
  });
};