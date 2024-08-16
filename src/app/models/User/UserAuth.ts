import IMRoleAuth from "../Role/RoleAuth";

export default interface IMUserAuth {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role: IMRoleAuth;
}
