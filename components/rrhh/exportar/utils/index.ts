export const getFileName = (watch: any, selectDatos: any) => {
    const proyecto = watch("proyecto");
    const mes = watch("mes");
    const quincena = watch("quincena");

    const getNombreMes = (mes: number | undefined) => {
        if (!mes) return "";
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return meses[mes - 1] ?? "";
    };

    const datosMes = selectDatos?.meses.find(
        (m: { id: number; mes: number; id_año: number }) => m.id === mes
    );

    const valorMes = datosMes?.mes;
    const año = datosMes?.id_año;

    const nombreMes = getNombreMes(valorMes);

    const nombreProyecto = selectDatos?.proyectos.find(
        (p: { id: number; nombre: string }) => p.id === proyecto
    )?.nombre;

    return `Resumen Horas - ${nombreProyecto ?? "Proyecto"} ${quincena !== "" ? `- Quincena ${quincena} -` : "-"} ${nombreMes} de ${año ?? ""}`;
};

export const getNombreMes = (mes: number) => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[mes - 1] ?? "";
};