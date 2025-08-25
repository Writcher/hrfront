import { useForm } from "react-hook-form";
import { tablaEmpleadosFormularioDatos } from "../types";

export const useTablaEmpleadosFormulario = () => {
  return useForm<tablaEmpleadosFormularioDatos>({
    defaultValues: {
      filtrosAncla: null,
      filtrosActivos: {},
      busquedaNombre: "",
      busquedaNombreNormal: "",
      mostrarBusquedaNombre: true,
      filtroProyecto: '',
      mostrarFiltroProyecto: false,
      idFilaExpandida: null,
      pagina: 0,
      filasPorPagina: 25,
      ordenDireccion: "ASC",
      ordenColumna: "nombreapellido"
    }
  });
};