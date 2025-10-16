import { Button } from "@mui/material";
import { useMostrarFormulario } from "../../hooks/useMostrarFormulario";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export default function Controles() {

    const { formularioVisible, setFormularioVisible } = useMostrarFormulario();

    return (
        <div className="flex flex-col gap-1 items-start w-full h-full p-1">
            <div className="flex flex-row gap-2 w-full">
                <div className="flex grow" />
                <Button
                    variant="contained"
                    color={formularioVisible ? "error" : "success"}
                    size="small"
                    className="!h-[40px]"
                    disableElevation
                    onClick={() => setFormularioVisible(true)}
                    endIcon={formularioVisible ? <ClearRoundedIcon /> : <AddRoundedIcon />}
                >
                    {formularioVisible ? "Cancelar" : "Cargar Control"}
                </Button>
            </div>
            {formularioVisible
                ? <div> formulario </div>
                : <div> tabla controles </div>
            }
        </div>
    );
};