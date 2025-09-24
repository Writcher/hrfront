import LightTooltip from "@/components/ui/tooltip";
import { InfoOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { tooltipObservacionesProps } from "../../types";

export const Tooltip = ({
    observaciones
}: tooltipObservacionesProps) => (
    <Box className="flex items-center justify-end">
        {observaciones && observaciones.length > 0 && (
            <LightTooltip
                title={
                    <Box sx={{ maxWidth: 300 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Observaciones:
                        </Typography>
                        {observaciones.map((observacion: any, index: any) => (
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
                    disabled={observaciones.length === 0}
                >
                    <InfoOutlined />
                </Button>
            </LightTooltip>
        )}
    </Box>
);