import { Button, ButtonGroup } from '@mui/material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { TablaEmpleadosFiltrosBotonesProps } from '../../types/tablaEmpleados/tablaEmpleadosFiltrosBotonesProps';

export const TablaEmpleadosFiltrosBotones = ({ onClick, onClean }: TablaEmpleadosFiltrosBotonesProps) => (
    <ButtonGroup
        variant='outlined'
        color='inherit'
        className='!h-10'
    >
        <Button
            variant='contained'
            className='!bg-gray-800 hover:!bg-gray-700 !text-white'
            disableElevation
            endIcon={<FilterAltRoundedIcon />}
            onClick={onClick}
        >
            Filtros
        </Button>
        <Button
            variant='contained'
            color='error'
            disableElevation
            onClick={onClean}
        >
            <FilterAltOffRoundedIcon />
        </Button>
    </ButtonGroup>
);