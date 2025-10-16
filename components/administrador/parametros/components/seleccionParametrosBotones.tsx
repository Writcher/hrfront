import { Button } from "@mui/material";
import { botonesSeleccionProps } from "../types";

export const Botones = ({ setParametro, parametro }: botonesSeleccionProps) => (
    <div className="flex flex-row items-center justify-start gap-1 w-full rounded border-2 border-[#ED6C02] p-1">
        <Button
            variant="contained"
            className={`!h-[40px] !text-gray-700 hover:!bg-orange-100 ${parametro === "Proyecto" ? "!bg-orange-100" : "!bg-transparent"}`}
            size="small"
            fullWidth
            disableElevation
            onClick={() => setParametro("Proyecto")}
        >
            Proyectos
        </Button>
        <Button
            variant="contained"
            className={`!h-[40px] !text-gray-700 hover:!bg-orange-100 ${parametro === "Control" ? "!bg-orange-100" : "!bg-transparent"}`}
            size="small"
            fullWidth
            disableElevation
            onClick={() => setParametro("Control")}
        >
            Controles
        </Button>
        <Button
            variant="contained"
            className={`!h-[40px] !text-gray-700 hover:!bg-orange-100 ${parametro === "Tipo Ausencia" ? "!bg-orange-100" : "!bg-transparent"}`}
            size="small"
            fullWidth
            disableElevation
            onClick={() => setParametro("Tipo Ausencia")}
        >
            Tipo de Ausencia
        </Button>
    </div>
);