import { Button, ButtonGroup } from "@mui/material";
import { botonesFiltrosProps } from "../types";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';

export const BotonesFiltros = ({ onClick, onClean }: botonesFiltrosProps) => (
    <ButtonGroup variant="outlined" color="inherit">
        <Button
            variant="contained"
            className="!bg-gray-800 hover:!bg-gray-700 !text-white"
            disableElevation
            endIcon={<FilterAltRoundedIcon />}
            onClick={onClick}
        >
            Filtros
        </Button>
        <Button
            variant="contained"
            color="error"
            disableElevation
            onClick={onClean}
        >
            <FilterAltOffRoundedIcon />
        </Button>
    </ButtonGroup>
);