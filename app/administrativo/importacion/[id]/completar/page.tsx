import TablaCompletarImportacion from "@/components/administrativo/importacion/[id]/completar";

export default async function CompletarImportacion({ params }: { params: Promise<{ id: number }> }) {
    const { id: id } = await params;
    return (
        <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex items-center justify-center h-[10%] text-gray-800 text-center font-bold">
                <p className="text-[clamp(1rem,5vw,2rem)]">
                    Completar Importacion
                </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[90%]">
                <TablaCompletarImportacion id_importacion={id} />
            </div>
        </div>
    );
};