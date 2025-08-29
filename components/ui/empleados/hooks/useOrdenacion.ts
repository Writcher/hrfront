export const useOrdenacion = (setValue: any, watch: any) => {
  const ordenDireccion = watch("ordenDireccion");

  const ordenColumna = watch("ordenColumna");

  const handleOrdenacion = (columna: string) => {
    const nuevaDireccion = ordenColumna === columna && ordenDireccion === 'ASC' ? 'DESC' : 'ASC';
    setValue("ordenColumna", columna);
    setValue("ordenDireccion", nuevaDireccion);
    setValue("idFilaExpandida", null);
  };
  return {
    ordenDireccion,
    ordenColumna,
    handleOrdenacion
  };
};