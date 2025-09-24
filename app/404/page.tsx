export default function Pagina404() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <div className="flex text-gray-800 text-center font-semibold">
                <p className="text-[clamp(1rem,5vw,2rem)]">
                    <strong className="text-bold text-orange-400">404:</strong> Esta página no existe.
                </p>
            </div>
        </div>
    );
};