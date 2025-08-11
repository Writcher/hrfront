export const usePaginacionInterna = (setValue: any, watch: any) => {
  const pagina = watch("paginaInterna");
  const filasPorPagina = watch("filasPorPaginaInterna");

  const handleCambioPagina = (event: React.MouseEvent<HTMLButtonElement> | null, nuevaPagina: number) => {
    setValue("paginaInterna", nuevaPagina);
  };

  const handleCambioFilasPorPagina = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue("filasPorPaginaInterna", parseInt(event.target.value, 10));
    setValue("paginaInterna", 0);
  };

  return {
    pagina,
    filasPorPagina,
    handleCambioPagina,
    handleCambioFilasPorPagina
  };
};