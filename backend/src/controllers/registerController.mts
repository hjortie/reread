import bcrypt from "bcryptjs";
import type { registerRequest } from "../models/registerRequest.js";
import { User, type UserType } from "../models/User.js";
import type { UserDto } from "../models/UserDto.js";

const convertDbToDto = async (dbUser: UserType): Promise<UserDto> => {
  return {
    username: dbUser.username,
    email: dbUser.email,
    booksOwned: dbUser.booksOwned.map((id) => id.toString()),
  };
};

export const createUser = async (data: registerRequest) => {
  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  });
  if (existingUser) {
    if (
      existingUser.username === data.username &&
      existingUser.email === data.email
    ) {
      throw new Error("Email and username is already in use");
    } else if (existingUser.username === data.username) {
      throw new Error(`The username ${data.username} is already in use`);
    } else if (existingUser.email === data.email) {
      throw new Error(`The e-mail address ${data.email} is already in use`);
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser: UserType = await User.create({
    username: data.username,
    email: data.email,
    password: hashedPassword,
    booksOwned: [],
  });

  return convertDbToDto(newUser);
};
