import { Button } from "@mui/material";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { fetchProyectosABM } from "@/services/proyecto/service.proyecto";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useEffect } from "react";
import { TablaProyectos } from "./tablaProyectos";

export default function Proyectos() {

    const { formularioVisible, setFormularioVisible } = useMostrarFormulario();

    const { showError, showWarning, showSuccess } = useSnackbar();

    const { data: proyectosDatos, isLoading: proyectosCargando, isError: proyectosError, refetch: proyectosRefetch } = useQuery({
        queryKey: ["fetchProyectosABM"],
        queryFn: () => fetchProyectosABM(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (proyectosError) {
            showWarning("Error al cargar proyectos")
        };
    }, [proyectosError])

    return (
        <div className="flex flex-col gap-1 items-start w-full h-full">
            <div className="flex flex-row gap-2 w-full p-1">
                <div className="flex grow" />
                <Button
                    variant="contained"
                    color={formularioVisible ? "error" : "success"}
                    size="small"
                    className="!h-[40px]"
                    disableElevation
                    onClick={() => setFormularioVisible(!formularioVisible)}
                    endIcon={formularioVisible ? <ClearRoundedIcon /> : <AddRoundedIcon />}
                >
                    {formularioVisible ? "Cancelar" : "Cargar Proyecto"}
                </Button>
            </div>
            {formularioVisible
                ?   <div> formulario </div>
                :   <div className="flex flex-col justify-between w-full h-full overflow-y-auto rounded border-2 border-[#ED6C02]">
                        <TablaProyectos
                            proyectos={proyectosDatos || []}
                            cargando={proyectosCargando}
                        />
                    </div>
            }
        </div>
    );
};