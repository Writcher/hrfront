import { Button, Card, CardActions, CardContent, Divider, Link } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

export default function InicioRRHH() {
    return (
        <div className="flex flex-row gap-2 items-center justify-center w-full h-full">
            <Card raised={false} className="flex flex-col justify-between gap-2 w-[25%] h-[50%] border-2 border-[#ED6C02] !shadow-none">
                <CardContent className="flex flex-col gap-4">
                    <div className='text-center text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]'>
                        Resumen de Jornadas
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardContent className="flex flex-col grow justify-center gap-4">
                    <div className="text-center text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                        Visualizar el resumen de jornadas por empleado, o exportar el mismo en formato excel. <br />
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardActions>
                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            component={Link}
                            href={"/rrhh/jornadas"}
                            variant="contained"
                            className="!bg-gray-800 !text-white hover:!bg-orange-100 hover:!text-orange-600"
                            disableElevation
                            fullWidth
                            endIcon={<SummarizeRoundedIcon />}
                        >
                            Resumen de Jornadas
                        </Button>
                        <Button
                            component={Link}
                            href={"/rrhh/jornadas/exportar"}
                            variant="contained"
                            className="!bg-gray-800 !text-white hover:!bg-orange-100 hover:!text-orange-600"
                            disableElevation
                            fullWidth
                            endIcon={<DownloadRoundedIcon />}
                        >
                            Exportar Resumen
                        </Button>
                    </div>
                </CardActions>
            </Card>
            <Card raised={false} className="flex flex-col justify-between gap-2 w-[25%] h-[50%] border-2 border-[#ED6C02] !shadow-none">
                <CardContent className="flex flex-col gap-4">
                    <div className='text-center text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]'>
                        Informe de Jornadas
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardContent className="flex flex-col grow justify-center gap-4">
                    <div className="text-center text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                        Visualizar los informes importados por el personal del proyecto y consultar su estado. <br /><br />
                        Los informes deben tener estado "Completo" para considerarce validados. <br />
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardActions>
                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            component={Link}
                            href={"/rrhh/importaciones"}
                            variant="contained"
                            className="!bg-gray-800 !text-white hover:!bg-orange-100 hover:!text-orange-600"
                            disableElevation
                            fullWidth
                            endIcon={<SearchIcon />}
                        >
                            Revisar Informes
                        </Button>
                    </div>
                </CardActions>
            </Card>
            <Card raised={false} className="flex flex-col justify-between gap-2 w-[25%] h-[50%] border-2 border-[#ED6C02] !shadow-none">
                <CardContent className="flex flex-col gap-4">
                    <div className='text-center text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]'>
                        Listado de Empleados
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardContent className="flex flex-col grow justify-center gap-4">
                    <div className="text-center text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                        Editar la información de empleados, dar de alta nuevos de forma manual o dar de baja empleados antiguos. <br /><br />
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardActions>
                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            component={Link}
                            href={"/rrhh/empleados"}
                            variant="contained"
                            className="!bg-gray-800 !text-white hover:!bg-orange-100 hover:!text-orange-600"
                            disableElevation
                            fullWidth
                            endIcon={<PeopleAltRoundedIcon />}
                        >
                            Listado de Empleados
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
};