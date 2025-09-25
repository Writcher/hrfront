"use server"

import CONFIG from "@/config";
import { signIn, signOut } from "@/auth";
import { compareContraseñaDTO, logInDTO } from "@/lib/dtos/auth";
import { fetchUsuarioPorCorreo } from "../usuario/service.usuario";

export async function logIn(parametros: logInDTO) {
    try {

        const usuario = await fetchUsuarioPorCorreo({
            correo: parametros.correo as string
        });

        if (usuario) {

            const compareContraseñaParametros = {
                id: usuario.id,
                contraseña: parametros.contraseña as string,
            };

            const contraseñaCorrecta = await compareContraseña(compareContraseñaParametros);

            if (contraseñaCorrecta) {

                await signIn("credentials", {
                    email: parametros.correo,
                    password: parametros.contraseña,
                    redirect: false,
                });

                return { success: true };
            };
        };

    } catch (error) {
        throw error;
    };
};

export async function doLogout() {
    await signOut({ redirectTo: "/inicio" });
};

export async function compareContraseña(parametros: compareContraseñaDTO) {
    try {
        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_AUTH}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parametros),
        });

        if (!respuestaRaw.ok) {
            const errorData = await respuestaRaw.json();
            throw new Error(errorData.error || "Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};