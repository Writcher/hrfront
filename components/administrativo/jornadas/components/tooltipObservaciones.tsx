import LightTooltip from "@/components/ui/tooltip";
import { InfoOutlined } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";

interface TooltipObservacionesProps {
    row: any
}

export const TooltipObservaciones: React.FC<TooltipObservacionesProps> = ({
    row
}) => (
    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
        <div
            className="text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.8rem)]"
            style={{ userSelect: "none" }}
        >
            {row.observaciones?.length || 0}
        </div>
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
                <IconButton
                    size="small"
                    className="!items-center !justify-center !text-gray-800 !font-medium hover:!bg-orange-100 hover:!text-orange-600"
                    color="warning"
                    disabled={row.observaciones.length === 0}
                >
                    <InfoOutlined fontSize="small" />
                </IconButton>
            </LightTooltip>
        )}
    </Box>
);