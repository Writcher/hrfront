import PantallaInicioSesion from "@/components/login";

export default function IniciarSesion() {
    return(
        <div className="flex flex-col gap-2 w-full h-screen">
            <div className="flex items-center justify-center h-full">
                <PantallaInicioSesion/>
            </div>
        </div>
    );
};