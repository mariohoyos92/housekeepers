import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Alert from "../Alert";
import { AlertTypes } from "../Alert/Alert";
import AuthFooter from "../AuthFooter/AuthFooter";
import AuthForm from "../AuthForm/AuthForm";
import { SigninValues } from "../AuthSection/AuthSection";
import AuthSocial from "../AuthSocial/AuthSocial";

type Props = { afterAuthPath: string; providers: string[]; type: string; typeValues: SigninValues };

const Auth: React.FC<Props> = ({ afterAuthPath, providers = [], type, typeValues }) => {
  const router = useRouter();
  const [formAlert, setFormAlert] = useState<{ type: AlertTypes; message: string }>(null);

  const handleAuth = () => {
    router.push(afterAuthPath);
  };

  const handleFormAlert = (data: { type: AlertTypes; message: string }) => {
    setFormAlert(data);
  };

  useEffect(() => {
    setFormAlert(null);
  }, [type]);

  return (
    <>
      {formAlert && <Alert type={formAlert.type as AlertTypes} header={formAlert.message} content="" />}
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
              onError={message => handleFormAlert({ type: AlertTypes.error, message })}
            />
          )}
        </>
      )}
      <AuthFooter type={type} typeValues={typeValues} />
    </>
  );
};

export default Auth;
