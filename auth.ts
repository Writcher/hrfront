import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { fetchTipoUsuarioPorId } from "./services/tipousuario/service.tipousuario";
import { fetchUsuarioPorCorreo } from "./services/usuario/service.usuario";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            authorize: async (credentials) => {
                //en authorize se ubica la logica que determina si las credenciales proporcionadas son validas.

                if (!credentials?.email || !credentials?.password) {
                    return null;
                };

                try {
                    const usuario = await fetchUsuarioPorCorreo({
                        correo: credentials.email as string
                    });

                    if (usuario && usuario.contraseña === credentials.password) {
                        const tipoUsuario = await fetchTipoUsuarioPorId({
                            id: usuario.id_tipousuario
                        });

                        return {
                            id: usuario.id.toString(),
                            correo: usuario.correo,
                            tipoUsuario: tipoUsuario.nombre,
                        };
                    };

                    return null;
                } catch (error) {
                    console.error("Error en authorize:", error);
                    return null;
                };

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