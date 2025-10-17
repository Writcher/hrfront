"use client"

import { useSeleccionarParametro } from "./hooks/useSeleccionarParametro";
import { Botones } from "./components/seleccionParametrosBotones";
import Proyectos from "./components/tablaProyectos/proyectos";
import Controles from "./components/tablaControles/controles";
import TiposAusencia from "./components/tablaTipoAusencia/tiposAusencia";
import { Divider } from "@mui/material";

export default function Parametros() {

    const { parametro, setParametro } = useSeleccionarParametro();

    return (
        <div className="flex flex-col gap-1 items-start w-full h-full">
            <Botones
                setParametro={setParametro}
                parametro={parametro}
            />
            <div className="flex flex-col justify-between w-full h-full overflow-y-auto">
                {parametro === ''
                    ?   <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                            Seleccionar parametro a gestionar
                        </div>
                    :   parametro === "Proyecto"
                        ?   <Proyectos />
                        :   parametro === "Control"
                            ?   <Controles />
                            :   parametro === "Tipo Ausencia"
                                ?   <TiposAusencia />
                                :   <div className="flex items-center justify-center py-[5vh] h-full w-full text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]">
                                        Seleccionar parametro a gestionar
                                    </div>
                }
            </div>
        </div>
    );
};