import { AuthorizedUserFormValue } from "../forms/authorized-user.form";
import { CreateAuthorizedUserDto } from "../dto/create-authorized-user.dto";

export function mapCreateAuthorizedUser(
  form: AuthorizedUserFormValue,
): CreateAuthorizedUserDto {
  return {
    matricula: form.matricula,
    firstName: form.firstName,
    lastName: form.lastName,
    role: form.role,
  };
}