"use server"

import { signIn } from "@/auth";
import { logInDTO } from "@/lib/dtos/auth";

export async function logIn(parametros: logInDTO) {
    try {
        const respuesta = await signIn("credentials", {
            email: parametros.correo,
            password: parametros.contraseña,
            redirect: false,
        });

        return { success: true, ...respuesta }
    } catch (error) {
        throw error;
    };
};