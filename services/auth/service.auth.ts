"use server"

import { signIn, signOut } from "@/auth";
import { logInDTO } from "@/lib/dtos/auth";
import bcrypt from "bcryptjs";
import { fetchUsuarioPorCorreo } from "../usuario/service.usuario";

export async function logIn(parametros: logInDTO) {
    try {
        const usuario = await fetchUsuarioPorCorreo({
            correo: parametros.correo
        });
        
        if (!usuario) {
            throw new Error("1");
        };

        const match = await bcrypt.compare(parametros.contraseña, usuario.contraseña);

        if (!match) {
            throw new Error("2");
        };

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("3");
        };
    };

    const result = await signIn("credentials", {
        email: parametros.correo,
        password: parametros.contraseña,
        redirect: false,
    });

    if (result?.error) {
        throw new Error("3");
    };

    return { success: true };
};

export async function doLogout() {
    await signOut({ redirectTo: "/inicio" });
};