import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { PWD_REGEX } from "../regex/pass";
import { EMAIL_REGEX } from "../regex/email";
import "../styles/Auth.css";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import BackgroundImage from "../components/BackgroundImage";

const LOGIN_URL = "/users/login";

export default function Login() {
  const { setAuth }: any = useAuth();

  const [, setCookie] = useCookies();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef: any = useRef();
  const errRef: any = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL, { email, password: pwd });
      const token = await res.data.token;

      setErrMsg("");
      setAuth({ token, userId: res.data._id });

      setCookie("token", token);
      setCookie("userId", res.data._id);
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg(err.response.data.message);
        setEmail(""), setPwd("");
      }
    }
  }

  return (
    <>
      <BackgroundImage />

      <div className="container">
        <h1
          className="text-4xl font-bold btn btn-ghost"
          onClick={() => {
            navigate("/");
          }}
          title="home"
        >
          Psychopathy
        </h1>
        <section className="sign">
          <form className="sign-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="sign-label">
              Email:{" "}
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>

            <input
              type="text"
              id="email"
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(true)}
              value={email}
              className="sign-input"
              key={"email"}
            ></input>

            <p
              id="eidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              email must be like this: youremail@example.com
            </p>

            <label htmlFor="password" className="sign-label">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              value={pwd}
              className="sign-input"
              key={"pwd"}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
            </p>

            <button
              className="sign-button"
              disabled={!validPwd || !validEmail ? true : false}
            >
              Sign In
            </button>
          </form>

          <p>
            Don't have an account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to="/register" id="sign-link">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      </div>
    </>
  );
}
