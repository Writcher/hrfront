import LightTooltip from '@/components/ui/tooltip';
import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { tooltipObservacionesProps } from '../../types';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export const Tooltip = ({
    observaciones,
    onDelete
}: tooltipObservacionesProps) => (
    <Box className='flex items-center justify-end'>
        {observaciones && observaciones.length > 0 && (
            <LightTooltip
                title={
                    <Box sx={{ maxWidth: 400 }}>
                        <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 'bold' }}>
                            Observaciones:
                        </Typography>
                        <div className='flex flex-col gap-4 '>
                            {observaciones.map((observacion: {id: number, texto: string}, index: any) => (
                                <div className='flex flex-row justify-between items-center gap-8' key={index}>
                                    <Typography
                                        variant='body2'
                                        sx={{ mb: 0.5, '&:last-child': { mb: 0 } }}
                                    >
                                        • {observacion.texto}
                                    </Typography>
                                    <IconButton
                                        size='small'
                                        disableRipple
                                        className='!items-center !justify-center !text-red-500 !font-medium hover:!bg-red-100 hover:!text-red-600'
                                        color='warning'
                                        onClick={() => onDelete(observacion.id)}
                                    >
                                        <DeleteRoundedIcon/>
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </Box>
                }
                arrow
                placement='left'
            >
                <Button
                    size='small'
                    disableRipple
                    disableElevation
                    className='!items-center !justify-center !text-white !font-medium hover:!bg-orange-100 hover:!text-orange-600'
                    color='warning'
                    variant='contained'
                    disabled={observaciones.length === 0}
                >
                    <InfoOutlined />
                </Button>
            </LightTooltip>
        )}
    </Box>
);