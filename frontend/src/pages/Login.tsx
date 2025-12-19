import { useState } from "react";
import { loginUser } from "../services/authServices";

export const Login = () => {
  const defaultValues = { email: "", password: "" };
  const [form, setForm] = useState(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await loginUser(form.email, form.password);
    } catch (error: any) {
      setError(error?.message) ??
        "Något gick fel vid inloggningen, försök igen!";
    } finally {
      setSubmitting(false);
      setForm(defaultValues);
    }
  };

  return (
    <>
      <div className="login container">
        <h1>Logga in</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              autoComplete="email"
              type="email"
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
              minLength={8}
              required
              value={form.password}
              onChange={onChange}
            />
          </div>

          {error && <p role="alert"> {error}</p>}

          <button disabled={submitting} className="theme-btn">
            {submitting ? "Loggar in..." : "Logga in"}
          </button>
        </form>
      </div>
    </>
  );
};
