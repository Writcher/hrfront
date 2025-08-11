import { useForm } from "react-hook-form";
import { importarExcelDatos } from "../types";

export const useImportarExcelForm = () => {
  return useForm<importarExcelDatos>({
    defaultValues: {
      proyecto: 0,
      tipoJornada: 0,
      archivo: null
    }
  });
};