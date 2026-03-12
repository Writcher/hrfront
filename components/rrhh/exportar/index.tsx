'use client';

import { useMutation } from '@tanstack/react-query';
import { Formulario } from './components/formulario';
import { useExportarExcelFormulario } from './hooks/useExportarExcelFormulario';
import { exportarExcelDatos } from './types';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/lib/context/snackbarcontext';
import { useEffect } from 'react';
import { Botones } from './components/botones';
import { useSelectDatos } from './hooks/useSelectDatos';
import { exportResumen } from '@/services/exportar/exportar.service';

export default function ExcelExportFormulario() {

    const { control, handleSubmit, watch, reset, formState: { isValid } } = useExportarExcelFormulario();

    const { showSuccess, showError, showWarning } = useSnackbar();

    const router = useRouter();

    const {
        proyectos,
        meses,
        tiposEmpleado,
        cargando,
        error
    } = useSelectDatos();

    const mutacionExport = useMutation({
        mutationFn: (data: exportarExcelDatos) => exportResumen(data),
        onSuccess: (response) => {

            const url = window.URL.createObjectURL(response.resumen);
            const a = document.createElement('a');
            a.href = url;
            a.download = response.nombre;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            showSuccess('Archivo exportado correctamente');

            router.push(`/rrhh/jornadas`);
            reset();
        },
        onError: () => {
            showError('Error al exportar archivo');
        }
    });

    const onExport = (data: exportarExcelDatos) => {
        mutacionExport.mutate(data);
    };

    useEffect(() => {
        if (error) {
            showWarning('Error al cargar los datos');
        };
    }, [error, showWarning]);

    return (
        <div className='flex flex-col gap-4 items-center justify-center w-full h-full'>
            <form onSubmit={handleSubmit(onExport)} className='flex flex-col justify-between items-center w-full h-full gap-2'>
                <div className='flex flex-col pt-[25vh] w-[80%] gap-2'>
                    <Formulario
                        control={control}
                        selectCargando={cargando}
                        selectDatos={{ proyectos, meses, tiposEmpleado }}
                        watch={watch}
                    />
                </div>
                <Botones
                    exportando={mutacionExport.isPending}
                    camposValidos={isValid}
                />
            </form>
        </div>
    );
};