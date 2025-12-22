import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { createOwnedBook, updateOwnedBook } from "../services/bookServices";
import { BooksContext } from "../contexts/BooksContext";
import { bookActionTypes } from "../reducers/booksReducer";

type formProps = {
  action: "post" | "put";
  bookId?: string;
};

export const genres = [
  "Biografi",
  "Roman",
  "Deckare",
  "Fantasy",
  "Sci-fi",
  "Facklitteratur",
  "Poesi",
  "Barn",
];
export const conditions = [
  "Oöppnad",
  "Så gott som ny",
  "Lite tummad",
  "Slitet skick",
];

export const BookInfoForm = (props: formProps) => {
  const defaultBook = {
    title: "",
    author: "",
    genre: "",
    imageUrl: "",
    condition: "",
    description: "",
  };

  const { booksDispatch } = useContext(BooksContext);
  const [form, setForm] = useState(defaultBook);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    //hantera ifyll av formulär
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = Object.fromEntries(
      //rensa tomma/odef värden ur formulär
      Object.entries(form).filter(
        ([_, v]) => v !== undefined && v !== null && String(v).trim() !== ""
      )
    ) as Partial<typeof form>;
    try {
      if (props.action === "put" && props.bookId) {
        if (Object.keys(payload).length === 0) return;
        const updated = await updateOwnedBook(props.bookId, payload);
        booksDispatch({ type: bookActionTypes.UPDATED, payload: updated });
        //hantera skickat formulär om action = put
      } else if (props.action === "post") {
        //hantera skickat formulär om action = post
        const newBook = await createOwnedBook(form);
        booksDispatch({ type: bookActionTypes.ADDED, payload: newBook });
      }
      setForm(defaultBook);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <form id="book-info-form" action={props.action} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Boktitel</label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="author">Författare</label>
        <input
          type="text"
          name="author"
          id="author"
          value={form.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
        >
          <option value="" disabled>
            Välj genre
          </option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="condition">Skick</label>
        <select
          id="condition"
          name="condition"
          value={form.condition}
          onChange={handleChange}
        >
          <option value="" disabled>
            Välj skick
          </option>
          {conditions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="imageUrl">Omslagsbild</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Beskrivning</label>
        <textarea
          name="description"
          id="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <button className="theme-btn">Spara bok</button>
    </form>
  );
};
