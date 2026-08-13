import { ErrorMapper } from '../error-mapper.type';

export const mapClassroomError: ErrorMapper = (error) => {
  const message = error.error?.message;

  switch (message) {
    case 'Ya existe un classroom con ese nombre':
      return {
        title: 'El classroom ya existe',
        message: 'Ya existe un classroom con ese nombre. Elige uno diferente.',
      };

    case 'Selecciona al menos un caso':
      return {
        title: 'Selecciona al menos un caso',
        message: 'Debes seleccionar al menos un caso para continuar.',
      };

    case 'La fecha límite no es válida.':
      return {
        title: 'Fecha límite no válida',
        message:
          'La fecha límite seleccionada no es válida. Verifica la fecha e inténtalo nuevamente.',
      };

    case 'La fecha límite debe ser posterior a la fecha actual.':
      return {
        title: 'Fecha límite no válida',
        message: 'La fecha límite debe ser posterior a la fecha actual.',
      };

    case 'No puedes crear actividades en esta clase':
      return {
        title: 'No puedes crear actividades',
        message: 'No tienes permitido crear actividades en este classroom.',
      };

    case 'Ya existe una actividad con ese titulo':
      return {
        title: 'La actividad ya existe',
        message: 'Ya existe una actividad con ese título. Elige un título diferente.',
      };

    case 'Uno o mas casos no existen o no te pertenecen':
      return {
        title: 'Casos no disponibles',
        message: 'Uno o más casos seleccionados no existen o no están disponibles para ti.',
      };

    case 'Classroom no encontrado':
      return {
        title: 'Classroom no encontrado',
        message:
          'No pudimos encontrar este classroom. Verifica que la información sea correcta e inténtalo nuevamente.',
      };

    case 'No tienes acceso a este classroom':
      return {
        title: 'Acceso no disponible',
        message: 'No tienes permisos para acceder a este classroom.',
      };

    case 'No perteneces a este classroom':
      return {
        title: 'No perteneces a este classroom',
        message: 'Debes pertenecer a este classroom para realizar esta acción.',
      };

    case 'No puedes editar este classroom':
      return {
        title: 'No puedes editar el classroom',
        message: 'No tienes permisos para modificar la información de este classroom.',
      };

    case 'No puedes eliminar este classroom':
      return {
        title: 'No puedes eliminar el classroom',
        message: 'No tienes permisos para eliminar este classroom.',
      };

    case 'Classroom no existe':
      return {
        title: 'El classroom no existe',
        message: 'El classroom que buscas ya no existe o no está disponible.',
      };

    case 'Classroom inactivo':
      return {
        title: 'Classroom inactivo',
        message: 'Este classroom se encuentra inactivo y no está disponible actualmente.',
      };

    case 'Ya estas inscrito en este classroom':
      return {
        title: 'Ya estás inscrito',
        message:
          'Ya formas parte de este classroom, por lo que no necesitas inscribirte nuevamente.',
      };

    case 'No autorizado':
      return {
        title: 'Acción no autorizada',
        message: 'No tienes los permisos necesarios para realizar esta acción.',
      };

    default:
      return null;
  }
};
