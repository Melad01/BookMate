export default interface UpdateUser {
  Email: string;
  Password?: string;
  currentPassword: string;
  Token: string;
}
