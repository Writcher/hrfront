import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import { esqueletoProps } from "../types";

export const Esqueleto = ({ filas }: esqueletoProps) => (
    <TableBody>
        {Array.from({ length: filas }).map((_, index) => (
            <TableRow key={index}>
                <TableCell align="left" size="small" width="25%">
                    <div className="flex items-center justify-start">
                        <Skeleton variant="text" width={150} />
                    </div>
                </TableCell>
                <TableCell align="center" size="small" width="25%">
                    <div className="flex items-center justify-center">
                        <Skeleton variant="text" width={150} />
                    </div>
                </TableCell>
                <TableCell align="center" size="small" width="25%">
                    <div className="flex items-center justify-center">
                        <Skeleton variant="rectangular" className="!rounded" width={100} height={30} />
                    </div>
                </TableCell>
                <TableCell align="right" size="small" width="25%">
                    <div className="flex items-center justify-end gap-2">
                        <Skeleton variant="rectangular" className="!rounded" width={60} height={30} />
                        <Skeleton variant="rectangular" className="!rounded" width={60} height={30} />
                    </div>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
);