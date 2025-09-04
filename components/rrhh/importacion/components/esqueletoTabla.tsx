import { Skeleton, TableCell, TableRow } from "@mui/material";

export const Esqueleto = () => (
    <TableRow>
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
        <TableCell align="right" size="small" width="25%">
            <div className="flex items-center justify-end">
                <Skeleton variant="rectangular" className="!rounded" width={100} height={30} />
            </div>
        </TableCell>
    </TableRow>
);