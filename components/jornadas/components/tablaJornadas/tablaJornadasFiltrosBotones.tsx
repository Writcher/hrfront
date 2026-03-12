import { Button } from '@mui/material';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { TablaJornadasFiltrosFormulario } from './tablaJornadasFiltrosFormulario';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import SyncIcon from '@mui/icons-material/Sync';
import { getNombreMes } from '@/components/rrhh/exportar/utils';
import { TablaJornadasFiltrosBotonesProps } from '../../types/tablaJornadas/tablaJornadasFiltrosBotonesProps';

export const TablaJornadasFiltrosBotones = ({
    formularioVisible,
    handleLimpiarFiltros,
    filtroMes,
    filtroQuincena,
    cargando,
    meses,
    creando,
    camposValidos,
    handleCambioFiltroQuincena,
    handleCambioFiltroMes,
    handleMostrarFormulario,
    estado,
    onCreate,
    esAdministrativo
}: TablaJornadasFiltrosBotonesProps) => (
    <>
        {!formularioVisible &&
            <>
                <div className='shrink-0'>
                    <Button
                        variant='contained'
                        color='error'
                        size='small'
                        className='!h-10'
                        disableElevation
                        onClick={handleLimpiarFiltros}
                        endIcon={<FilterAltOffRoundedIcon />}
                    >
                        Limpiar Filtros
                    </Button>
                </div>
                <div className='flex-1 min-w-[280px] max-w-2xl'>
                <TablaJornadasFiltrosFormulario
                    filtroMes={filtroMes}
                    filtroQuincena={filtroQuincena}
                    cargando={cargando}
                    meses={meses}
                    onCambioFiltroMes={handleCambioFiltroMes}
                    onCambioFiltroQuincena={handleCambioFiltroQuincena}
                    getNombreMes={getNombreMes}
                />
                </div>
                <div className='flex grow shrink-0' />
            </>
        }
        {esAdministrativo &&
            <Button
                variant='contained'
                color={formularioVisible ? 'error' : 'success'}
                size='small'
                className='!h-10'
                disableElevation
                onClick={handleMostrarFormulario}
                endIcon={formularioVisible ? <CloseRoundedIcon /> : <UploadRoundedIcon />}
                disabled={estado.toLowerCase() === 'baja'}

            >
                {formularioVisible ? 'Cancelar' : 'Carga Manual'}
            </Button>
        }
        {formularioVisible &&
            <>
                <div className='flex grow shrink-0' />
                <Button
                    variant='contained'
                    color='success'
                    size='small'
                    className='!h-10'
                    disableElevation
                    endIcon={
                        creando ? (
                            <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />
                        ) : <SaveAsRoundedIcon />
                    }
                    onClick={onCreate}
                    disabled={creando || !camposValidos}
                >
                    {!creando ? 'Guardar' : 'Guardando'}
                </Button>
            </>
        }
    </>
);