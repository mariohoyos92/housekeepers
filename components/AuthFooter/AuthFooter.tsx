import Link from "next/link";
import React from "react";
import { SigninValues } from "../AuthSection/AuthSection";

type Props = { type: string; typeValues: SigninValues };

const AuthFooter: React.FC<Props> = ({ type, typeValues }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      {type === "signup" && (
        <>
          Have an account already?
          <Link href="/auth/signin">
            <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">{typeValues.linkTextSignin}</a>
          </Link>
        </>
      )}

      {type === "signin" && (
        <>
          <Link href="/auth/signup">
            <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">{typeValues.linkTextSignup}</a>
          </Link>

          <Link href="/auth/forgotpass">
            <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">{typeValues.linkTextForgotpass}</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthFooter;
