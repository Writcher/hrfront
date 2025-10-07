import { TextField, MenuItem, Skeleton } from "@mui/material";
import { formularioFiltrosPadreProps, proyecto, tipoAusencia, tipoEmpleado, mes } from "../../types";
import { getNombreMesGen } from "../../utils";

export const Formulario = ({
  mostrarBusquedaNombre,
  mostrarFiltroProyecto,
  mostrarBusquedaLegajo,
  mostrarFiltroTipoEmpleado,
  mostrarFiltroTipoAusencia,
  busquedaNombreNormal,
  filtroProyecto,
  busquedaLegajoNormal,
  filtroTipoEmpleado,
  filtroTipoAusencia,
  filtroQuincena,
  filtroMes,
  proyectos,
  tiposEmpleado,
  tiposAusencia,
  meses,
  cargando,
  onCambioBusquedaNombre,
  onCambioFiltroProyecto,
  onCambioBusquedaLegajo,
  onCambioFiltroTipoEmpleado,
  onCambioFiltroTipoAusencia,
  onCambioFiltroQuincena,
  onCambioFiltroMes
}: formularioFiltrosPadreProps) => (
  <form className="flex items-center justify-start w-full">
    <div className="flex items-center w-2/6">
      {mostrarBusquedaNombre && (
        <TextField
          id="busquedaNombre"
          name="busquedaNombre"
          label="Buscar por Nombre de Empleado"
          type="search"
          variant="outlined"
          color="warning"
          size="small"
          fullWidth
          value={busquedaNombreNormal}
          onChange={onCambioBusquedaNombre}
        />
      )}
      {mostrarBusquedaLegajo && (
        <TextField
          id="busquedaLegajo"
          name="busquedaLegajo"
          label="Buscar por Legajo"
          type="number"
          variant="outlined"
          color="warning"
          size="small"
          fullWidth
          value={busquedaLegajoNormal}
          onChange={onCambioBusquedaLegajo}
        />
      )}
      {mostrarFiltroProyecto && (
        <TextField
          id="filtroProyecto"
          name="filtroProyecto"
          label="Filtrar por Proyecto"
          type="text"
          variant="outlined"
          color="warning"
          size="small"
          select
          fullWidth
          value={filtroProyecto}
          onChange={onCambioFiltroProyecto}
          disabled={proyectos.length === 0}
        >
          {proyectos.map((proyectos: proyecto) => (
            <MenuItem key={proyectos.id} value={proyectos.id}>
              {proyectos.nombre}
            </MenuItem>
          ))}
        </TextField>
      )}
      {mostrarFiltroTipoEmpleado && (
        <TextField
          id="filtroTipoEmpleado"
          name="filtroTipoEmpleado"
          label="Filtrar por Tipo de Empleado"
          type="text"
          variant="outlined"
          color="warning"
          size="small"
          select
          fullWidth
          value={filtroTipoEmpleado}
          onChange={onCambioFiltroTipoEmpleado}
          disabled={tiposEmpleado.length === 0}
        >
          {tiposEmpleado.map((tipoEmpleado: tipoEmpleado) => (
            <MenuItem key={tipoEmpleado.id} value={tipoEmpleado.id}>
              {tipoEmpleado.nombre}
            </MenuItem>
          ))}
        </TextField>
      )}
      {mostrarFiltroTipoAusencia && (
        cargando ?
          <Skeleton
            variant="rectangular"
            width="100%"
            height="40px"
            sx={{ borderRadius: "5px" }}
          /> :
          <TextField
            id="filtroTipoAusencia"
            name="filtroTipoAusencia"
            label="Filtrar por Tipo de Ausencia"
            type="text"
            variant="outlined"
            color="warning"
            size="small"
            select
            fullWidth
            value={filtroTipoAusencia}
            onChange={onCambioFiltroTipoAusencia}
            disabled={tiposAusencia.length === 0}
          >
            {tiposAusencia.map((tipoAusencia: tipoAusencia) => (
              <MenuItem key={tipoAusencia.id} value={tipoAusencia.id}>
                {tipoAusencia.nombre}
              </MenuItem>
            ))}
          </TextField>
      )}
    </div>
    <div className="flex grow" />
    <div className="flex items-center w-3/6 gap-2">
      {cargando ?
        <Skeleton
          variant="rectangular"
          width="100%"
          height="40px"
          sx={{ borderRadius: "5px" }}
        /> :
        <TextField
          id="month"
          name="month"
          label="Filtrar por Mes"
          type="text"
          variant="outlined"
          color="warning"
          size="small"
          select
          fullWidth
          value={filtroMes}
          onChange={onCambioFiltroMes}
          disabled={meses.length === 0}
        >
          {meses.map((mes: mes) => (
            <MenuItem key={mes.id} value={mes.id}>{getNombreMesGen(mes.mes)} de {mes.id_año}</MenuItem>
          ))}
        </TextField>
      }
      <TextField
        id="quincena"
        name="quincena"
        label="Filtrar por Quincena"
        type="text"
        variant="outlined"
        color="warning"
        size="small"
        select
        fullWidth
        value={filtroQuincena}
        onChange={onCambioFiltroQuincena}
        disabled={filtroMes === ''}
      >
        <MenuItem key={1} value={1}>Primera Quincena</MenuItem>
        <MenuItem key={2} value={2}>Segunda Quincena</MenuItem>
      </TextField>
    </div>
  </form>
);