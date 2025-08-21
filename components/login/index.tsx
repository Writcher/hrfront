"use client"

import { Button } from "@mui/material";
import { FormularioInicioSesion } from "./components/formularioInicioSesion";
import { useIniciarSesionFormulario } from "./hooks/useIniciarSesionFormulario";
import SyncIcon from '@mui/icons-material/Sync';
import { iniciarSesionFormularioDatos } from "./types";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "@/services/auth/service.auth";

export default function PantallaInicioSesion() {
    const { control, handleSubmit } = useIniciarSesionFormulario();

    const mutacion = useMutation({
        mutationFn: (data: iniciarSesionFormularioDatos) => logIn(data),
        onSuccess: (response) => {
            console.log("logged In")
        },
    });

    const onSubmit = (data: iniciarSesionFormularioDatos) => {
        mutacion.mutate(data);
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full" >
            <div className="flex items-center justify-center text-gray-800 text-center font-bold">
                <p className="text-[clamp(1rem,5vw,2rem)]">
                    Iniciar Sesión
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[95%] space-y-4">
                <div className="flex flex-col justify-center items-center gap-4 w-full" >
                    <FormularioInicioSesion
                        control={control}
                    />
                    <div className="flex w-[40%]">
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            disableElevation
                            endIcon={
                                mutacion.isPending ? (
                                    <SyncIcon className="animate-spin" />
                                ) : ""
                            }
                            disabled={mutacion.isPending}
                        >
                            {!mutacion.isPending ? "Iniciar Sesión" : "Iniciando Sesión"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};