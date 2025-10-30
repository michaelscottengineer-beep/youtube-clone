import type { TUser } from "./user"

export type TSession = {
  user: TUser;
  token: string;
}