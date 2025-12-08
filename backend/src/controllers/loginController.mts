import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { convertUserToDto } from "../helpers/authHelpers.mjs";

export const loginUser = async (email: string, password: string) => {
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    throw new Error(`Did not find user with email ${email}`);
  }

  const success = await bcrypt.compare(password, foundUser.password);

  if (success) {
    return convertUserToDto(foundUser);
  }
};
