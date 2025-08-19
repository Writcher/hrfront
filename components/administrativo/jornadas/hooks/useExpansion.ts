export const useExpansion = (setValue: any, watch: any) => {
 const idFilaExpandida = watch("idFilaExpandida");

  const toggleExpandirFila = (id: number) => {
    setValue("idFilaExpandida", idFilaExpandida === id ? null : id);
    setValue("filtroMes", '');
    setValue("filtroQuincena", '');
    setValue("filtroMarcasIncompletas", false);
  };

  return {
    idFilaExpandida,
    toggleExpandirFila,
  };
};