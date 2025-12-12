import { model, Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String },
  avatarUrl: { type: String },
  booksOwned: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

export const User = model("User", userSchema);
export type UserType = InferSchemaType<typeof userSchema>;
