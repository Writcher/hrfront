import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import { esqueletoProps } from "../../types";

export const Esqueleto = ({ filas }: esqueletoProps) => (
    <TableBody>
        {Array.from({ length: filas }).map((_, index) => (
            <TableRow key={index}>
                <TableCell align="center" size="small" width="15%">
                    <div className="flex items-center justify-center">
                        <Skeleton variant="text" width={50} />
                    </div>
                </TableCell>
                <TableCell align="left" size="small" width="85%">
                    <div className="flex items-center justify-start">
                        <Skeleton variant="text" width={100} />
                    </div>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
);