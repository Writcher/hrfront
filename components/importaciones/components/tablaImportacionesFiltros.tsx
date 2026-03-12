import { Button } from '@mui/material';
import { Formulario } from './tablaImportacionesFiltrosFormulario';
import Link from 'next/link';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { tablaImportacionesFiltrosProps } from '../types';

export const TablaImportacionesFiltros = ({ proyectos, cargando, filtroIncompletas, filtroProyecto, handleLimpiarFiltros, onCambioFiltroIncompletas, onCambioFiltroProyecto, esAdministrativo }: tablaImportacionesFiltrosProps) => (
    <>
        <div className='shrink-0'>
            <Button
                variant='contained'
                color='error'
                className='!h-10'
                disableElevation
                onClick={handleLimpiarFiltros}
                endIcon={<FilterAltOffRoundedIcon />}
            >
                Limpiar Filtro
            </Button>
        </div>
        <div className='flex-1 max-w-[640px]'>
            <Formulario
                filtroIncompletas={filtroIncompletas}
                filtroProyecto={filtroProyecto}
                onCambioFiltroProyecto={onCambioFiltroProyecto}
                onCambioFiltroIncompletas={onCambioFiltroIncompletas}
                proyectos={proyectos}
                cargando={cargando}
            />
        </div>
        <div className='flex grow' />
        {esAdministrativo &&
            <Button
                component={Link}
                href={'/administrativo/importaciones/importar'}
                variant='contained'
                color='success'
                className='!h-10'
                disableElevation
                endIcon={<UploadFileRoundedIcon />}
            >
                Importar Informe
            </Button>
        }
    </>
);