import { TableCell, TableHead, TableRow } from "@mui/material";

export const Encabezado = () => (
    <TableHead
        sx={{
            '& .MuiTableCell-root': {
                borderBottom: '2px solid #ED6C02 !important',
                backgroundColor: '#fff !important',
                zIndex: 1100,
            }
        }}
    >
        <TableRow>
            <TableCell align="left" width="25%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    ID
                </div>
            </TableCell>
            <TableCell align="center" width="25%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Nombre
                </div>
            </TableCell>
            <TableCell align="center" width="25%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Estado
                </div>
            </TableCell>
            <TableCell align="right" width="25%">
                <div style={{ userSelect: "none" }}
                    className={`text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]`}>
                    Acciones
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
);