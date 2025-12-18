import { useState } from "react";
import { createUser } from "../services/authServices";

export const Registration = () => {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };
  const [form, setForm] = useState(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }
    // if (!form.terms) {
    //   setError("Du måste godkänna villkoren.");
    //   return;
    // }

    try {
      setSubmitting(true);
      await createUser(form.username, form.email, form.password);
    } catch (error: any) {
      setError(error?.message ?? "Något gick fel vid registrering.");
    } finally {
      setSubmitting(false);
      setForm(defaultValues);
    }
  };

  return (
    <div className="registration container">
      <h1>Registrera konto</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Användarnamn</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={form.username}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Lösenord</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={form.password}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Bekräfta lösenord</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={form.confirmPassword}
            onChange={onChange}
          />
        </div>
        {/* <div>
          <label>
            <input
              name="terms"
              type="checkbox"
              required
              checked={form.terms}
              onChange={onChange}
            />
            Jag godkänner villkoren
          </label>
        </div> */}

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Registrerar..." : "Registrera mig!"}
        </button>
      </form>
    </div>
  );
};
