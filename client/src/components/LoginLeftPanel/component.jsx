import Logo from "../../assets/logo.svg";
import StackedChecklist from "../../assets/stacked-checklist.svg";

export default function LoginLeftPanel() {
    return (
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
    )
}