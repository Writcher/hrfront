import LightTooltip from "@/components/ui/tooltip";
import { InfoOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

interface TooltipObservacionesProps {
    row: any
}

export const TooltipObservaciones: React.FC<TooltipObservacionesProps> = ({
    row
}) => (
    <Box className="flex items-center justify-center">
        {row.observaciones && row.observaciones.length > 0 && (
            <LightTooltip
                title={
                    <Box sx={{ maxWidth: 300 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Observaciones:
                        </Typography>
                        {row.observaciones.map((observacion: any, index: any) => (
                            <Typography
                                key={index}
                                variant="body2"
                                sx={{ mb: 0.5, '&:last-child': { mb: 0 } }}
                            >
                                • {observacion}
                            </Typography>
                        ))}
                    </Box>
                }
                arrow
                placement="left"
            >
                <Button
                    size="small"
                    disableRipple
                    disableElevation
                    className="!items-center !justify-center !text-white !font-medium hover:!bg-orange-100 hover:!text-orange-600"
                    color="warning"
                    variant="contained"
                    disabled={row.observaciones.length === 0}
                >
                    <InfoOutlined fontSize="small" />
                </Button>
            </LightTooltip>
        )}
    </Box>
);