"use server"

import { auth, signIn, signOut } from "@/auth";
import { logInDTO } from "@/lib/dtos/auth";
import { AuthError } from "next-auth";

export async function logIn(parametros: logInDTO) {
    try {
        await signIn("credentials", {
            email: parametros.correo,
            password: parametros.contraseña,
            redirectTo: "/",
        });
        
        return { success: true };
        
    } catch (error) {
        if (error instanceof AuthError) {
            console.error("Auth error:", error.type);
            return { 
                success: false, 
                error: error.type === "CredentialsSignin" 
                    ? "Invalid credentials" 
                    : "Authentication error" 
            };
        };
        
        throw error;
    };
};

export async function doLogout() {
    await signOut({ redirectTo: "/inicio" });
};