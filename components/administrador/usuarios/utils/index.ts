import { tipoUsuario } from "../types";

export const getNombreTipoUsuario = (selectDatos: tipoUsuario[]) => {
    const getNombreTipoUsuarioPorId = (id: number) => {
        const nombreTipoUsuario = selectDatos?.find((tipoUsuario: tipoUsuario) => tipoUsuario.id === Number(id));
        return nombreTipoUsuario ? nombreTipoUsuario.nombre : 'Desconocida';
    };

    return getNombreTipoUsuarioPorId;
};
