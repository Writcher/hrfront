import Importar from "@/components/administrativo/importar";

export default function PaginaImportar() {
    return(
        <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex items-center justify-center h-[10%] text-gray-800 text-center font-bold">
                <p className="text-[clamp(1rem,5vw,2rem)]">
                    Importar Informe
                </p>
            </div>
            <div className="flex items-center justify-center h-[90%]">
                <Importar/>
            </div>
        </div>
    );
};