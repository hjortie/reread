import { model, Schema, Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  location?: string;
  avatarUrl?: string;
  booksOwned: Types.ObjectId[];
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String },
  avatarUrl: { type: String },
  booksOwned: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

export const UserModel = model<User>("User", userSchema);
