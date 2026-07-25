import { ErrorMapper } from '../error-mapper.type';

export const mapAuthError: ErrorMapper = (error) => {
  const message = error.error?.message;

  switch (message) {
    case 'Invalid credentials':
      return {
        title: 'Credenciales invalidas',
        message: 'La matrícula o la contraseña son incorrectas.',
      };

    case 'Esa matricula ya existe':
      return {
        title: 'Cuenta existente',
        message: 'Ya existe una cuenta registrada con esa matricula.',
      };

    case 'La matricula no pertenece a la institucion':
      return {
        title: 'Matricual no autorizada',
        message: 'Esta matrícula no pertenece a la institución.',
      };

    default:
      return null;
  }
};
