import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (password === "" || email === "") {
      return;
    }

    props.handleRegister(password, email);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>

      <form onSubmit={onSubmit} noValidate className="auth__form">
        <label className="auth__label">
          <input
            required
            type="text"
            className="auth__input"
            id="email-input"
            name="email"
            minLength={2}
            maxLength={200}
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          ></input>

          <span className="auth__input-error job-input-error"></span>
        </label>

        <label className="auth__label">
          <input
            placeholder="Пароль"
            required
            type="text"
            className="auth__input"
            id="password-input"
            name="password"
            minLength={2}
            maxLength={200}
            value={password}
            onChange={handlePasswordChange}
          ></input>

          <span className="auth__input-error job-input-error"></span>
        </label>

        <button
          aria-label="Зарегистрироваться"
          className="auth__submit-button"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="auth__helper-text">
        <span>Уже зарегистрированы?</span>

        <Link className="auth__helper-link" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
