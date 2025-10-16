import { auth } from "@/auth";
import TablaEmpleadosLista from "@/components/empleados";

export default async function PaginaEmpleados() {
    const sesion = await auth();
    const tipoUsuario = sesion?.user?.tipoUsuario;

    return (
        <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex items-center justify-center h-[10%] text-gray-800 text-center font-bold">
                <p className="text-[clamp(1rem,5vw,2rem)]">
                    Empleados
                </p>
            </div>
            <div className="flex items-center justify-center h-[90%]">
                <TablaEmpleadosLista
                    esAdministrativo={tipoUsuario === "Administrativo"}
                />
            </div>
        </div>
    );
};