import { TableCell, TableRow } from "@mui/material";
import { filaPresentesProps } from "../types";

export default function FilaPresentes({ empleado, index }: filaPresentesProps) {
    return (
        <TableRow>
            <TableCell align="left" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.75rem)]" style={{ userSelect: "none" }}>
                    {index}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {empleado.nombre}
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                    {empleado.tipoempleado}
                </div>
            </TableCell>
        </TableRow>
    );
};