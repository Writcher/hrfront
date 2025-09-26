import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { fetchTipoUsuarioPorId } from "./services/tipousuario/service.tipousuario";
import { fetchUsuarioPorCorreo } from "./services/usuario/service.usuario";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            authorize: async (credentials) => {
                if (credentials === null) return null;
                try {
                    // 1. Buscar usuario por correo
                    const usuario = await fetchUsuarioPorCorreo({
                        correo: credentials?.email as string
                    });
                    if (usuario) {
                        // 2. Validar contraseña
                        const match = await bcrypt.compare(credentials.password as string, usuario.contraseña);
                        if (match) {
                            // 3. Buscar tipo de usuario
                            const tipoUsuario = await fetchTipoUsuarioPorId({
                                id: usuario.id_tipousuario
                            });
                            return {
                                id: usuario.id.toString(),
                                correo: credentials.email,
                                tipoUsuario: tipoUsuario?.nombre || 'usuario',
                            };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error en authorize:", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.tipoUsuario = user.tipoUsuario;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.tipoUsuario = token.tipoUsuario as string;
            }
            return session;
        },
    },
});