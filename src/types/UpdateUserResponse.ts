export default interface UpdateUserResponse {
  status: number;
  email: string;
  newToken: string;
  user_id: string;
  message: string;
}
