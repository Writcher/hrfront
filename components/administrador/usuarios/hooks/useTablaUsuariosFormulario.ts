import { useForm } from "react-hook-form";
import { tablaUsuariosFormularioDatos } from "../types";

export const useTablaUsuariosFormulario = () => {
  return useForm<tablaUsuariosFormularioDatos>({
    defaultValues: {
      busquedaNombre: "",
      busquedaNombreNormal: "",
      filtroTipoUsuario: '',
    }
  });
};