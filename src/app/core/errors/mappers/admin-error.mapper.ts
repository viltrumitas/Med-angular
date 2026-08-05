import { ErrorMapper } from '../error-mapper.type';

export const mapAdminError: ErrorMapper = (error) => {
  const message = error.error?.message;

  switch (message) {
    case 'La matricula ya esta registrada':
      return {
        title: 'Matrícula registrada',
        message: 'Ya existe un usuario autorizado con esa matrícula.',
      };

    case 'Usuario no encontrado':
      return {
        title: 'Usuario no encontrado',
        message: 'El usuario solicitado ya no existe o no está disponible.',
      };

    case 'No se recibio ningun archivo':
      return {
        title: 'Archivo requerido',
        message: 'Selecciona un archivo CSV para continuar.',
      };

    case 'El archivo debe ser un CSV':
      return {
        title: 'Formato incorrecto',
        message: 'El archivo seleccionado debe tener formato CSV.',
      };

    case 'El archivo esta vacio':
      return {
        title: 'Archivo vacío',
        message: 'El archivo CSV no contiene información.',
      };

    case 'El archivo CSV tiene un formato invalido.':
      return {
        title: 'CSV inválido',
        message: 'No se pudo leer el archivo. Revisa su formato.',
      };

    default:
      return null;
  }
};
