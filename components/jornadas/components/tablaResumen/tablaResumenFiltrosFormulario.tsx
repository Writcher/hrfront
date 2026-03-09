import { TextField, MenuItem, Skeleton } from "@mui/material";
import { formularioFiltrosProps, mes } from "../../types";
import { getNombreMes } from "../../utils";

export const FormularioResumen = ({
    filtroMes,
    filtroQuincena,
    selectCargando,
    selectDatos,
    onCambioFiltroMes,
    onCambioFiltroQuincena,
}: formularioFiltrosProps) => (
    <form className="flex items-center justify-start w-4/6 gap-4">
        {selectCargando ?
            <Skeleton
                variant="rectangular"
                width="100%"
                height="40px"
                sx={{ borderRadius: "5px" }}
            /> :
            <TextField
                id="month"
                name="month"
                label="Filtrar por Mes"
                type="text"
                variant="outlined"
                color="warning"
                size="small"
                select
                fullWidth
                value={filtroMes}
                onChange={onCambioFiltroMes}
                slotProps={{
                    select: {
                        MenuProps: {
                            slotProps: {
                                paper: {
                                    style: {
                                        marginTop: '4px',
                                        maxHeight: '200px',
                                    },
                                },
                            },
                        },
                    },
                }}
            >
                {selectDatos?.map((mes: mes) => (
                    <MenuItem key={mes.id} value={mes.id}>{getNombreMes(mes.mes)} de {mes.id_año}</MenuItem>
                )) || []}
            </TextField>
        }
        <TextField
            id="quincena"
            name="quincena"
            label="Filtrar por Quincena"
            type="text"
            variant="outlined"
            color="warning"
            size="small"
            select
            fullWidth
            value={filtroQuincena}
            onChange={onCambioFiltroQuincena}
            disabled={filtroMes === ''}
            slotProps={{
                select: {
                    MenuProps: {
                        slotProps: {
                            paper: {
                                style: {
                                    marginTop: '4px',
                                    maxHeight: '200px',
                                },
                            },
                        },
                    },
                },
            }}
        >
            <MenuItem key={1} value={1}>Primera Quincena</MenuItem>
            <MenuItem key={2} value={2}>Segunda Quincena</MenuItem>
        </TextField>
    </form>
);