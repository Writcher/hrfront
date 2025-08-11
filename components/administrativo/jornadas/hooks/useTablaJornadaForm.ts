import { useForm } from "react-hook-form";
import { tablaJornadasFormularioDatos } from "../types";

export const useTablaJornadaFormulario = () => {
  return useForm<tablaJornadasFormularioDatos>({
    defaultValues: {
      filtrosAncla: null,
      filtrosActivos: {},
      busquedaNombre: "",
      busquedaNombreNormal: "",
      mostrarBusquedaNombre: true,
      filtroProyecto: 0,
      mostrarFiltroProyecto: false,
      filtroMes: 0,
      filtroQuincena: 0,
      filtroMarcasIncompletas: false,
      idFilaExpandida: null,
      pagina: 0,
      filasPorPagina: 25,
      paginaInterna: 0,
      filasPorPaginaInterna: 16,
      ordenDireccion: "ASC",
      ordenColumna: "nombreapellido"
    }
  });
};