import { Skeleton, TableCell, TableRow } from "@mui/material";

export const Esqueleto = () => (
    <TableRow>
        <TableCell align="left" size="small">
            <div className="flex items-center justify-start">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-end">
                <Skeleton variant="rectangular" className="!rounded" width={60} height={25} />
            </div>
        </TableCell>
    </TableRow>
);