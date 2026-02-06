import { Button } from "@mui/material";
import Link from "next/link";

export default function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <div className="flex flex-col items-center justify-center gap-12 h-[50vh] w-[40vw] bg-white rounded" style={{ border: "2px solid #ED6C02" }}>
        <p className="text-[clamp(1rem,5vw,2rem)]">
          Registro de Jornadas
        </p>
        <Link href="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="success"
            disableElevation
          >
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    </div>
  );
};