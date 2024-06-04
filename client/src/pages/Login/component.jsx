import React from "react";
import Logo from "../../assets/logo.svg";
import StackedChecklist from "../../assets/stacked-checklist.svg";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <section className="pb-login-page">
      <div className="pb-lp-main-wrapper">
        <section className="pb-lp-content">
          <div className="pb-lp-content-left-section">
            <div className="side-band-wrapper">
              <span className="side-band"></span>
              <span className="side-band"></span>
            </div>

            <div className="left-section-content">
              <div>
                <img src={Logo} alt="Logo" />
              </div>
              <h1 className="pb-lp-left-section__welcome-text">Welcome To PaperBag</h1>
              <p className="pb-lp-left-section__description">
                Your efficient and smart grocery shopping list
              </p>
            </div>
            <div className="pb-lp-left-section__supporting-image">
              <img src={StackedChecklist} alt="Checklist" />
            </div>
          </div>
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
