import RegisterForm from "./RegisterForm";
import LoginLeftPanel from "../../components/LoginLeftPanel";

export default function Register() {
  return (
    <section className="pb-register-page">
      <div className="pb-register-main-wrapper">
        <section className="pb-register-content">
          <LoginLeftPanel />
          <div className="pb-register-content-right-section">
            <div className="pb-register-content-login">
              <h1 className="pb-register-content-login__heading">Lets create an account.</h1>
              <p className="pb-register-content-login__desc">
                Add your details, to create an account and get started.
              </p>
              <RegisterForm />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
