export type TablaObservacionesProps = {
  observaciones: ObservacionResumen[],
  cargando: boolean,
  filas: number,
};

export type ObservacionResumen = {
  id: number,
  texto: string,
  fecha: string,
};