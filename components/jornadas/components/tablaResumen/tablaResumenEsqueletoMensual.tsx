import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

export const EsqueletoMensual = () => (
    <TableBody>
        <TableRow>
            <TableCell align="center" size="small">
                <div className="flex items-center justify-center">
                    <Skeleton variant="text" width={50} />
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="flex items-center justify-center">
                    <Skeleton variant="text" width={50} />
                </div>
            </TableCell>
            <TableCell align="center" size="small">
                <div className="flex items-center justify-center">
                    <Skeleton variant="text" width={50} />
                </div>
            </TableCell>
        </TableRow>
    </TableBody>
);