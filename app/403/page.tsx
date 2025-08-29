export default function Pagina403() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <div className="flex text-gray-800 text-center font-semibold">
                <p className="text-[clamp(1rem,5vw,2rem)]">
                    <strong className="text-bold text-orange-400">403:</strong> No estas autorizado para ver esta página.
                </p>
            </div>
        </div>
    );
};