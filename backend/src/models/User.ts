import { model, Schema, Types, type InferSchemaType } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String },
  avatarUrl: { type: String },
  booksOwned: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

export const User = model("User", userSchema);

//exportera typ som byggts ut med _id
type UserSchemaType = InferSchemaType<typeof userSchema>;

export type UserType = UserSchemaType & { _id: Types.ObjectId };
