import { Button, Card, CardActions, CardContent, Divider, Link } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SearchIcon from '@mui/icons-material/Search';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

export default function InicioAdministrativo() {
    return (
        <div className="flex flex-row gap-2 items-center justify-center w-full h-full">
            <Card raised={false} className="flex flex-col gap-2 w-[25%] h-auto border-2 border-[#ED6C02] !shadow-none">
                <CardContent className="flex flex-col gap-4">
                    <div className='text-center text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]'>
                        Informes de Jornadas
                    </div>
                    <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                    <div className="text-center text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                        Importar archivo Excel con el informe diario de marcas del control de acceso, o revisar y validar los informes previamente cargados. <br /><br />
                        Tener en cuenta que cada informe debe ser validado manualmente para garantizar la exactitud en el cálculo de las horas. <br />
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardActions>
                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            component={Link}
                            href={"/administrativo/importaciones/importar"}
                            variant="contained"
                            className="!bg-gray-800 !text-white hover:!bg-orange-100 hover:!text-orange-600"
                            disableElevation
                            fullWidth
                            endIcon={<UploadFileRoundedIcon />}
                        >
                            Importar Informe
                        </Button>
                        <Button
                            component={Link}
                            href={"/administrativo/importaciones"}
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
            <Card raised={false} className="flex flex-col gap-2 w-[25%] h-auto border-2 border-[#ED6C02] !shadow-none">
                <CardContent className="flex flex-col gap-4">
                    <div className='text-center text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]'>
                        Jornadas Cargadas
                    </div>
                    <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                    <div className="text-center text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                        Visualizar la lista de jornadas registradas por empleado y cargar jornadas manualmente en caso de ausencias o errores de importación. <br /><br />
                        Recuerda que las ausencias deben cargarse manualmente por empleado en el día correspondiente. En el caso de ausencias prolongadas, solo es necesario registrarlas en el primer día. <br />
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardActions>
                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            component={Link}
                            href={"/administrativo/jornadas"}
                            variant="contained"
                            className="!bg-gray-800 !text-white hover:!bg-orange-100 hover:!text-orange-600"
                            disableElevation
                            fullWidth
                            endIcon={<SummarizeRoundedIcon />}
                        >
                            Listado de Jornadas
                        </Button>
                    </div>
                </CardActions>
            </Card>
            <Card raised={false} className="flex flex-col gap-2 w-[25%] h-auto border-2 border-[#ED6C02] !shadow-none">
                <CardContent className="flex flex-col gap-4">
                    <div className='text-center text-gray-700 font-bold text-[clamp(0.25rem,5vw,1rem)]'>
                        Listado de Empleados
                    </div>
                    <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                    <div className="text-center text-gray-700 font-medium text-[clamp(0.25rem,4vw,0.9rem)]" style={{ userSelect: "none" }}>
                        Editar la información de empleados, dar de alta nuevos de forma manual o dar de baja empleados antiguos. <br /><br />
                        Ten en cuenta que la carga automática de empleados durante la importación de informes no considera el número de legajo. Además, a los empleados dados de baja no se les podrán cargar jornadas manualmente.<br />
                    </div>
                </CardContent>
                <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
                <CardActions>
                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            component={Link}
                            href={"/administrativo/empleados"}
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