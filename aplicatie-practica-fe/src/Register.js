import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX =
  /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;

export default function Register() {
  const nameRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(name);
    console.log(result);
    console.log(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMessage("");
  }, [name, email, password, matchPassword]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMessage}
      </p>
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="name">
            Name:
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !name ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />
          <p
            id="uidnote"
            className={
              nameFocus && name && !validName ? "instructions" : "offscreen"
            }
          >
            {" "}
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters. <br />
            Must begin with a letter. <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <span className={validPassword ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPassword || !password ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="pwdnote"
            className={
              passwordFocus && !validPassword ? "instructions" : "offscreen"
            }
          >
            {" "}
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number and a special
            character. <br />
          </p>
        </div>
        <div>
          <label htmlFor="confirm_password">
            Confirm password:
            <span className={validMatch ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="confirm_password"
            onChange={(e) => setMatchPassword(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchPassword(true)}
            onBlur={() => setMatchPassword(false)}
          />
          <p
            id="confirmnote"
            className={
              matchPasswordFocus && !validMatch ? "instructions" : "offscreen"
            }
          >
            {" "}
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        </div>

        <button
          disabled={
            !validName || !validEmail || !validPassword || !validMatch
              ? true
              : false
          }
        >
          Sign up
        </button>
      </form>
      <p>
        Already registered?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">Sign in</a>
        </span>
      </p>
    </section>
  );
}
