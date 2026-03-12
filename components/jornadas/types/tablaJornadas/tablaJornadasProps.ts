export type TablaJornadasProps = {
  jornadas: Jornada[],
  cargando: boolean,
  filas: number,
};

export type Jornada = {
  fecha: string,
  nombreempleado: string,
  estadojornada: string,
  entrada: string,
  salida: string,
  entrada_r: string,
  salida_r: string,
  total: number,
  tipojornada: number,
  tipoausencia: string
  id: number,
  observaciones: {id: number, texto: string}[],
  es_manual: boolean,
};