import { Skeleton, TableCell, TableRow } from "@mui/material";

export const Esqueleto = () => (
    <TableRow>
        <TableCell align="left" size="small">
            <div className="flex items-center justify-start">
                <Skeleton variant="text" width={150} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={225} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="rectangular" className="!rounded" width={250} height={40} />
            </div>
        </TableCell>
        <TableCell align="center" size="small">
            <div className="flex items-center justify-center">
                <Skeleton variant="rectangular" className="!rounded" width={250} height={40} />
            </div>
        </TableCell>
        <TableCell align="right" size="small">
            <div className="flex items-center justify-end gap-2">
                <Skeleton variant="rectangular" className="!rounded" width={60} height={30} />
                <Skeleton variant="rectangular" className="!rounded" width={60} height={30} />
                <Skeleton variant="rectangular" className="!rounded" width={60} height={30} />
            </div>
        </TableCell>
    </TableRow>
);