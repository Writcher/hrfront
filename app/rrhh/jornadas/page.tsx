import { auth } from '@/auth';
import TablaEmpleadosJornadas from '@/components/jornadas';

export default async function PaginaResumenEmpleados() {
    const sesion = await auth();
    const tipoUsuario = sesion?.user?.tipoUsuario;

    return (
        <div className='flex flex-col gap-2 sm:gap-3 w-full h-full overflow-hidden'>
            <div className='flex items-center justify-center min-h-[60px] shrink-0 text-gray-800 text-center font-bold'>
                <p className='text-xl sm:text-2xl lg:text-3xl'>
                    Resumen de Jornadas
                </p>
            </div>
            <div className='flex flex-1 min-h-0 overflow-hidden'>
                <TablaEmpleadosJornadas
                    esAdministrativo={tipoUsuario === 'Administrativo'}
                    esRRHH={tipoUsuario === 'Recursos Humanos'}
                />
            </div>
        </div>
    );
};