import { Skeleton, TableCell, TableRow } from "@mui/material";

export const Esqueleto = () => (
    <TableRow>
        <TableCell align="center" size="small" width="10%">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small" width="10%">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="left" size="small" width="80%">
            <div className="flex items-center justify-start">
                <Skeleton variant="text" width={350} />
            </div>
        </TableCell>
    </TableRow>
);