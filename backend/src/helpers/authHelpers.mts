import { type UserType } from "../models/User.js";
import type { UserDto } from "../models/UserDto.js";

export const convertUserToDto = async (dbUser: UserType): Promise<UserDto> => {
  return {
    _id: dbUser._id.toString(),
    username: dbUser.username,
    email: dbUser.email,
    booksOwned: dbUser.booksOwned.map((id) => id.toString()),
  };
};
