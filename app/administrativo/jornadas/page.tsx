import TablaEmpleadosJornadas from "@/components/administrativo/jornadas";

export default function PaginaJornadasEmpleados() {
    return(
        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex flex-col items-center justify-center text-3xl text-gray-800 text-center font-bold h-[10%]">
                <p>
                    Jornadas
                </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[90%]">
                <TablaEmpleadosJornadas />
            </div>
        </div>
    );
};