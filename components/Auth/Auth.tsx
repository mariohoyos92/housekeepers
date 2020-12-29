import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthFooter from "../AuthFooter/AuthFooter";
import AuthForm from "../AuthForm/AuthForm";
import { SigninValues } from "../AuthSection/AuthSection";
import AuthSocial from "../AuthSocial/AuthSocial";
import FormAlert, { FormAlertArgs } from "../FormAlert";

type Props = { afterAuthPath: string; providers: string[]; type: string; typeValues: SigninValues };

const Auth: React.FC<Props> = ({ afterAuthPath, providers = [], type, typeValues }) => {
  const router = useRouter();
  const [formAlert, setFormAlert] = useState<FormAlertArgs>(null);

  const handleAuth = () => {
    router.push(afterAuthPath);
  };

  const handleFormAlert = (data: FormAlertArgs) => {
    setFormAlert(data);
  };

  return (
    <>
      {formAlert && <FormAlert type={formAlert.type} message={formAlert.message} />}
      <AuthForm type={type} onAuth={handleAuth} onFormAlert={handleFormAlert} typeValues={typeValues} />
      {["signup", "signin"].includes(type) && (
        <>
          {" "}
          {providers && providers.length > 0 && (
            <AuthSocial
              providers={providers}
              type={type}
              showLastUsed={true}
              onAuth={handleAuth}
              onError={message => handleFormAlert({ type: "error", message })}
            />
          )}
        </>
      )}
      <AuthFooter type={type} typeValues={typeValues} />
    </>
  );
};

export default Auth;
