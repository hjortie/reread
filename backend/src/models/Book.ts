import { model, Schema, Types, type InferSchemaType } from "mongoose";

const bookSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  status: {
    type: String,
    enum: ["available", "in-trade", "unavailable"],
    required: true,
    default: "available",
  },
});

type BookSchemaType = InferSchemaType<typeof bookSchema>;
//exportera typ som byggts ut med _id
export type BookType = BookSchemaType & { _id: Types.ObjectId };
export const Book = model("Book", bookSchema);
