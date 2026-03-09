'use server'

import CONFIG from '@/config';
import { FetchUsuarioPorCorreoDto, FetchUsuariosDto, CreateUsuarioDto, DeleteUsuarioDto, EditUsuarioDto } from '@/lib/dtos/usuario';
import { getToken } from '@/lib/utils/getToken';

export async function fetchUsuarioPorCorreo(parametros: FetchUsuarioPorCorreoDto) {
    try {
        const datosUsuarioParams = new URLSearchParams({
            email: parametros.correo
        });

        const usuarioRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_LOGIN}?${datosUsuarioParams}`, {
            method: 'GET'
        });

        if (!usuarioRaw.ok) {
            throw new Error(`Error fetching usuario: ${usuarioRaw.status} - ${usuarioRaw.statusText}`);
        };

        const usuario = await usuarioRaw.json();

        return usuario;
    } catch (error) {
        console.error('Fetch usuario failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function fetchUsuarios(params: FetchUsuariosDto) {
    try {
        const token = await getToken();

        const usuariosParams: Record<string, string> = {
            nombre: params.busquedaNombre,
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
            column: params.ordenColumna,
            direction: params.ordenDireccion,
        };

        if (params.filtroTipoUsuario !== '' && params.filtroTipoUsuario !== 0) {
            usuariosParams.id_tipousuario = params.filtroTipoUsuario.toString();
        };

        const usuariosUrlParams = new URLSearchParams(usuariosParams);

        const usuariosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIO}?${usuariosUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!usuariosRaw.ok) {
            throw new Error(`Error fetching usuarios: ${usuariosRaw.status} - ${usuariosRaw.statusText}`);
        };

        const usuarios = await usuariosRaw.json();

        return usuarios;
    } catch (error) {
        console.error('Fetch usuarios failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function createUsuario(parametros: CreateUsuarioDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIO}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: parametros.nombre,
                email: parametros.correo,
                id_tipousuario: parametros.id_tipousuario,
                contraseña: parametros.contraseña
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error creating usuario: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Create usuario failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteUsuario(params: DeleteUsuarioDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIO}/${params.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deleting usuario with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Delete usuario failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editUsuario(params: EditUsuarioDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIO}/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: params.nombre,
                email: params.correo,
                id_tipousuario: params.id_tipousuario
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error editing usuario with id ${params.id}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Edit usuario failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};