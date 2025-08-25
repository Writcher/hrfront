interface FiltrosActivosProps {
  filtrosActivos: { [key: string]: any };
  getNombreProyectoPorId: (id: number) => string;
}

export const FiltrosActivos: React.FC<FiltrosActivosProps> = ({
  filtrosActivos,
  getNombreProyectoPorId
}) => (
  <div className="flex flex-row flex-wrap gap-2">
    {Object.entries(filtrosActivos).map(([key, value]) => (
      value && (
        <span key={key} className="border border-gray-700 p-2 rounded text-xs md:text-sm">
          {key === "busquedaNombre" && `${value}`}
          {key === "filtroProyecto" && `${getNombreProyectoPorId(value)}`}
        </span>
      )
    ))}
  </div>
);