import React, { useState } from "react";
import ReauthModal from "../components/ReauthModal";
import SettingsNav from "../components/SettingsNav";
import SettingsGeneral from "../components/SettingsGeneral";
import SettingsPassword from "../components/SettingsPassword";
import SettingsBilling from "../components/SettingsBilling";
import { useAuth } from "../util/auth";
import Alert from "./Alert";

function SettingsSection(props) {
  const auth = useAuth();
  const [formAlert, setFormAlert] = useState(null);

  // State to control whether we show a re-authentication flow
  // Required by some security sensitive actions, such as changing password.
  const [reauthState, setReauthState] = useState({
    show: false,
  });

  const validSections = {
    general: true,
    password: true,
    billing: true,
  };

  const section = validSections[props.section] ? props.section : "general";

  // Handle status of type "success", "error", or "requires-recent-login"
  // We don't treat "requires-recent-login" as an error as we handle it
  // gracefully by taking the user through a re-authentication flow.
  const handleStatus = ({ type, message, callback }) => {
    if (type === "requires-recent-login") {
      // First clear any existing message
      setFormAlert(null);
      // Then update state to show re-authentication modal
      setReauthState({
        show: true,
        // Failed action to try again after reauth
        callback: callback,
      });
    } else {
      // Display message to user (type is success or error)
      setFormAlert({
        type: type,
        message: message,
      });
    }
  };

  return (
    <section>
      {reauthState.show && (
        <ReauthModal
          callback={reauthState.callback}
          provider={auth.user.providers[0]}
          onDone={() => setReauthState({ show: false })}
        />
      )}

      <SettingsNav activeKey={section} className="justify-content-center" />
      <div
        className="mt-5"
        style={{
          maxWidth: "450px",
        }}
      >
        {formAlert && (
          <div className="mb-4">
            <Alert type={formAlert.type} header={formAlert.message} style={{ maxWidth: "450px" }} />
          </div>
        )}

        {section === "general" && <SettingsGeneral onStatus={handleStatus} />}

        {section === "password" && <SettingsPassword onStatus={handleStatus} />}

        {section === "billing" && <SettingsBilling onStatus={handleStatus} />}
      </div>
    </section>
  );
}

export default SettingsSection;
