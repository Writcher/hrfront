import { Skeleton, TableCell, TableRow } from "@mui/material";

export const Esqueleto = () => (
    <TableRow>
        <TableCell align="left" size="small" width="10%">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={75} />
            </div>
        </TableCell>
        <TableCell align="center" size="small" width="10%">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={75} />
            </div>
        </TableCell>
        <TableCell align="center" size="small" width="30%">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={200} />
            </div>
        </TableCell>
        <TableCell align="center" size="small" width="20%">
            <div className="flex items-center justify-center">
                <Skeleton variant="text" width={100} />
            </div>
        </TableCell>
        <TableCell align="center" size="small" width="10%">
            <div className="flex items-center justify-center">
                <Skeleton variant="rectangular" className="!rounded" width={60} height={30} />
            </div>
        </TableCell>
        <TableCell align="right" size="small" width="20%">
            <div className="flex items-center justify-end gap-2">
                <Skeleton variant="rectangular" className="!rounded" width={60} height={30} />
                <Skeleton variant="rectangular" className="!rounded" width={60} height={30} />
            </div>
        </TableCell>
    </TableRow>
)