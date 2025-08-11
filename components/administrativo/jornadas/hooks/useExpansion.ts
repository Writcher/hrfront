export const useExpansion = (setValue: any, watch: any) => {
 const idFilaExpandida = watch("idFilaExpandida");

  const toggleExpandirFila = (id: number) => {
    setValue("idFilaExpandida", idFilaExpandida === id ? null : id);
    setValue("filtroMes", 0);
    setValue("filtroQuincena", 0);
    setValue("filtroMarcasIncompletas", false);
  };

  return {
    idFilaExpandida,
    toggleExpandirFila,
  };
};