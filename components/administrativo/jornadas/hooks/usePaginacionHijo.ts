import { hookGenericoHijoProps } from "../types";

export const usePaginacion = ({ setValue, watch }: hookGenericoHijoProps<'setValue' | 'watch'>) => {
  const pagina = watch("pagina");
  const filasPorPagina = watch("filasPorPagina");

  const handleCambioPagina = (event: React.MouseEvent<HTMLButtonElement> | null, nuevaPagina: number) => {
    setValue("pagina", nuevaPagina);
  };

  const handleCambioFilasPorPagina = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue("filasPorPagina", parseInt(event.target.value, 10));
    setValue("pagina", 0);
  };

  return {
    pagina,
    filasPorPagina,
    handleCambioPagina,
    handleCambioFilasPorPagina
  };
};