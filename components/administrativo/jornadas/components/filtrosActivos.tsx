import { filtrosActivosProps } from "../types";

export const FiltrosActivos = ({
  filtrosActivos,
  getNombreProyectoPorId
}: filtrosActivosProps) => (
  <div className="flex flex-row flex-wrap gap-2">
    {Object.entries(filtrosActivos).map(([key, value]) => (
      value && (
        <span key={key} className="border-2 border-gray-700 p-2 rounded text-xs md:text-sm">
          {key === "busquedaNombre" && `${value}`}
          {key === "filtroProyecto" && `${getNombreProyectoPorId(value)}`}
        </span>
      )
    ))}
  </div>
);