import { Mes } from '@/lib/types/entites/mes';

export type TablaResumenFiltrosFormProps = {
  meses: Mes[],
};

export type TablaResumenFiltrosForm = {
  filtroMes: number | '',
  filtroQuincena: number | '',
};