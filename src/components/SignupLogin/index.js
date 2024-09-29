import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import "./index.css";

import axios from "axios";

function SignupLogin() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState(false);
  const [errMsg, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookie.get("trading_token") !== undefined) {
      console.log("Already..");
      navigate("/");
    }
  }, [navigate]);

  const toggleForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrorMsg("");
    setIsLogin((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        "https://trading-backend-hvvh.onrender.com/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      Cookie.set("trading_token", token);
      navigate("/");
    } catch (e) {
      setErrorMsg(e.response.data.message);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "https://trading-backend-hvvh.onrender.com/register",
        {
          email,
          username,
          password,
        }
      );
      const token = response.data.token;
      Cookie.set("trading_token", token);
      navigate("/");
    } catch (e) {
      setErrorMsg(e.response.data.message);
    }
  };

  return (
    <div className="signup-container container">
      <div className="row">
        <div className="col-12 col-lg-7 p-5 text-center">
          <img
            src="media/images/signup.png"
            alt="sign up"
            style={{ width: "90%" }}
          />
        </div>

        <div
          className={`col-12 col-lg-5 p-5 text-center text-lg-start d-flex flex-column justify-content-center align-items-start rotate-container ${
            isLogin ? "rotate-login" : "rotate-register"
          }`}
        >
          {isLogin ? (
            <form className="form-container" onSubmit={handleLogin}>
              <h2 className="mb-2">Login</h2>
              <p className="text-secondary">Please log in to continue.</p>
              <div className="input-group mb-3">
                <input
                  type="email"
                  placeholder="Enter Email..."
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type={passwordState ? "text" : "password"}
                  placeholder="Enter Password..."
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label className="text-secondary small">
                <input
                  type="checkbox"
                  onClick={() => setPasswordState(!passwordState)}
                />{" "}
                Show Password
              </label>
              <div>
                {errMsg.length > 0 ? <p className="down m-0">*{errMsg}</p> : ""}
              </div>
              <button className="btn btn-primary mt-2" type="submit">
                Login
              </button>
              <p className="small text-secondary mt-3">
                Don’t have an account?{" "}
                <span
                  className="text-primary"
                  onClick={toggleForm}
                  role="button"
                >
                  Register now
                </span>
              </p>
            </form>
          ) : (
            // Register form
            <form className="form-container" onSubmit={handleSignUp}>
              <h2 className="mb-2">Signup now</h2>
              <p className="text-secondary">
                Or track your existing application.
              </p>
              <div className="input-group mb-3 d-flex flex-row">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text text-secondary"
                    id="basic-addon1"
                  >
                    @
                  </span>
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email..."
                  className="form-control"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3 d-flex flex-row">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text text-secondary"
                    id="basic-addon1"
                  >
                    -
                  </span>
                </div>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username..."
                  className="form-control"
                  aria-describedby="basic-addon1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3 d-flex flex-row">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text text-secondary"
                    id="basic-addon1"
                  >
                    *
                  </span>
                </div>
                <input
                  type={passwordState ? "text" : "password"}
                  id="password"
                  placeholder="Enter Strong Password..."
                  className="form-control"
                  aria-describedby="basic-addon1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <label className="text-secondary small">
                <input
                  type="checkbox"
                  onClick={() => setPasswordState(!passwordState)}
                />{" "}
                Show Password
              </label>
              <div>
                {errMsg.length > 0 ? <p className="down m-0">*{errMsg}</p> : ""}
              </div>
              <button className="btn btn-primary mt-2" type="submit">
                Continue
              </button>
              <p className="small text-secondary mt-3">
                Already have an account?{" "}
                <span
                  className="text-primary"
                  onClick={toggleForm}
                  role="button"
                >
                  Log in
                </span>
              </p>
              <br />
            </form>
          )}
        </div>
      </div>

      <div className="row">
        <p className="small text-secondary text-center">
          I authorise Zerodha to contact me even if my number is registered on
          DND. I authorise Zerodha to fetch my KYC information from the C-KYC
          registry with my PAN. Please visit{" "}
          <a
            className="text-primary"
            href="https://support.zerodha.com/category/console/reports/other-queries/articles/details-collected-when-opening-an-account"
          >
            this article
          </a>{" "}
          to know more.
          <br />
          <br />
          If you are looking to open a HUF, Corporate, Partnership, or NRI
          account, you have to use the offline forms. For help,{" "}
          <a
            className="text-primary"
            href="https://support.zerodha.com/category/account-opening/company-partnership-and-huf-account-opening?language=english"
          >
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default SignupLogin;
