import { useForm } from "react-hook-form";
import { tablaResumenEmpleadosFormularioDatos } from "../types";

export const useTablaResumenEmpleadosFormulario = () => {
  return useForm<tablaResumenEmpleadosFormularioDatos>({
    defaultValues: {
      filtrosAncla: null,
      filtrosActivos: {},
      busquedaNombre: "",
      busquedaNombreNormal: "",
      mostrarBusquedaNombre: false,
      filtroProyecto: '',
      mostrarFiltroProyecto: false,
      busquedaLegajo: '',
      busquedaLegajoNormal: '',
      mostrarBusquedaLegajo: true,
      idFilaExpandida: null,
      pagina: 0,
      filasPorPagina: 25,
      ordenDireccion: "ASC",
      ordenColumna: "nombreapellido"
    }
  });
};