import { IconButton } from "@mui/material";
import { filtrosActivosProps } from "../../types";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const FiltrosActivos = ({
  filtrosActivos,
  getNombreProyectoPorId,
  getNombreTipoEmpleadoPorId,
  handleLimpiarFiltro
}: filtrosActivosProps) => (
  <div className="flex flex-row flex-wrap gap-1">
    {Object.entries(filtrosActivos).map(([key, value]) => (
      value && (
        <div key={key} className="flex items-center gap-2 border-2 border-gray-700 pl-2 pr-1 py-1 rounded">
          <span className="text-gray-800 text-xs md:text-sm">
            {key === "busquedaNombre" && `${value}`}
            {key === "filtroProyecto" && `${getNombreProyectoPorId(value)}`}
            {key === "busquedaLegajo" && `${value}`}
            {key === "filtroTipoEmpleado" && `${getNombreTipoEmpleadoPorId(value)}`}
          </span>
          <IconButton
            onClick={() => handleLimpiarFiltro(key)}
            className="!text-gray-700 hover:!text-red-600"
            size="small"
          >
            <CloseRoundedIcon className="!text-sm" />
          </IconButton>
        </div>
      )
    ))}
  </div>
);