import { useForm } from 'react-hook-form';
import { usuarioFormularioDatos } from '../types';

export const useUsuarioFormulario = () => {
    return useForm<usuarioFormularioDatos>({
        defaultValues: {
            correo: '',
            contraseña: '',
            nombre: '',
            id_tipousuario: '',
        },
    });
};