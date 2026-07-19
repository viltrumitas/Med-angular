import { AuthorizedUserFormValue } from "../forms/authorized-user.form";
import { CreateAuthorizedUserDto } from "../dto/create-authorized-user.dto";
import { UpdateAuthorizedUserDto } from "../dto/update-authorized-user.dto";

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

export function mapUpdateAuthorizedUser(
  form: AuthorizedUserFormValue,
): UpdateAuthorizedUserDto {
  return {
    matricula: Number(form.matricula),
    firstName: form.firstName,
    lastName: form.lastName,
    role: form.role,
  };
}