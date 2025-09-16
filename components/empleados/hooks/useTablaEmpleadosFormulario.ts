import { useForm } from "react-hook-form";
import { tablaEmpleadosFormularioDatos } from "../types";

export const useTablaEmpleadosFormulario = () => {
  return useForm<tablaEmpleadosFormularioDatos>({
    defaultValues: {
      busquedaNombre: "",
      busquedaNombreNormal: "",
      filtroProyecto: '',
      busquedaLegajo: '',
      busquedaLegajoNormal: '',
    }
  });
};