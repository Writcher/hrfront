export type TablaResumenProps = {
  resumen: Resumen,
  cargando: boolean,
  es_mensualizado: boolean,
};

export type Resumen = {
  suma_total: number,
  suma_total_normal: number,
  suma_total_50: number,
  suma_total_100: number,
  suma_total_feriado: number,
  suma_total_nocturno: number,
  total_asistencias: number,
  total_ausencias_injustificadas: number,
  total_ausencias_justificadas: number,
};