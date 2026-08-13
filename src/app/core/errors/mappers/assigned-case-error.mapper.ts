import { ErrorMapper } from '../error-mapper.type';

export const mapAssignedCaseError: ErrorMapper = (error) => {
  const message = error.error?.message;

  switch (message) {
    case 'Caso asignado no encontrado':
      return {
        title: 'Caso no encontrado',
        message: 'No pudimos encontrar el caso que intentas consultar.',
      };

    case 'No tienes acceso a este caso':
      return {
        title: 'Acceso no disponible',
        message: 'No tienes permisos para acceder a este caso.',
      };

    case 'La actividad ya no esta disponible':
      return {
        title: 'Actividad no disponible',
        message: 'Esta actividad ya no está disponible para responder.',
      };

    case 'La clase ya no esta disponible':
      return {
        title: 'Clase no disponible',
        message: 'Esta clase ya no se encuentra disponible.',
      };

    case 'Ya has empezado a responder':
      return {
        title: 'Actividad en progreso',
        message: 'Ya comenzaste a responder esta actividad.',
      };

    default:
      return null;
  }
};
