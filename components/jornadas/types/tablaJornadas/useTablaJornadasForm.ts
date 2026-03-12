export type TablaJornadasForm = {
  entrada: string | null,
  salida: string | null,
  entradaTarde: string | null,
  salidaTarde: string | null,
  tipoJornada: number | '',
  fecha: string,
  tipoAusencia: number | '',
  observacion: string,
};