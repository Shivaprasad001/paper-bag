import React from "react";
import LoginForm from "./components/LoginForm";
import LoginLeftPanel from "../../components/LoginLeftPanel";

export default function Login() {
  return (
    <section className="pb-login-page">
      <div className="pb-lp-main-wrapper">
        <section className="pb-lp-content">
          <LoginLeftPanel/>
          <div className="pb-lp-content-right-section">
            <div className="pb-lp-content-login">
              <h1 className="pb-lp-content-login__heading">Login</h1>
              <p className="pb-lp-content-login__desc">Welcome back! Please login to your account.</p>
              <LoginForm/>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
