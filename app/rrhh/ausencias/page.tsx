import { auth } from "@/auth";
import TablaAusenciasJornadas from "@/components/ausencias";

export default async function PaginaAusenciasEmpleados() {
    const sesion = await auth();
    const tipoUsuario = sesion?.user?.tipoUsuario;

    return(
        <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex items-center justify-center h-[10%] text-gray-800 text-center font-bold">
                <p className="text-[clamp(1rem,5vw,2rem)]">
                    Ausencias
                </p>
            </div>
            <div className="flex items-center justify-center h-[90%]">
                <TablaAusenciasJornadas 
                    esAdministrativo={tipoUsuario === 'Administrativo'}
                    esRRHH={tipoUsuario === 'Recursos Humanos'}
                />
            </div>
        </div>
    );
};