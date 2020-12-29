import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useAuth } from "../../util/auth";
import Spinner from "react-bootstrap/Spinner";
import { Badge } from "react-bootstrap";

type Props = {
  onAuth: (user: firebase.User) => void;
  showLastUsed: boolean;
  onError: (message: string) => void;
  providers?: string[];
  type: string;
};

const AuthSocial: React.FC<Props> = ({ onAuth, showLastUsed, onError, providers = [], type }) => {
  const auth = useAuth();
  const [pending, setPending] = useState(null);
  const [lastUsed, setLastUsed] = useState(null);

  const providerDisplayNames = {
    google: "Google",
  };

  const onSigninWithProvider = provider => {
    setPending(provider);
    auth
      .signinWithProvider(provider)
      .then(user => {
        localStorage.setItem("lastUsedAuthProvider", provider);
        onAuth(user);
      })
      .catch(error => {
        setPending(null);
        onError(error.message);
      });
  };

  // Get value of last used auth provider
  useEffect(() => {
    if (showLastUsed) {
      const lastUsed = window.localStorage.getItem("lastUsedAuthProvider");
      if (lastUsed) {
        setLastUsed(lastUsed);
      }
    }
  }, [showLastUsed]);

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {providers.map(provider => (
          <div>
            <button
              className="relative inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              onClick={() => onSigninWithProvider(provider)}
              key={provider}
            >
              <span className="sr-only">Sign in with {providerDisplayNames[provider]}</span>
              {pending === provider ? (
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden={true}
                  className="align-baseline text-primary"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <img
                  src={`https://uploads.divjoy.com/icon-${provider}.svg`}
                  alt={providerDisplayNames[provider]}
                  height={20}
                  width={20}
                />
              )}
              {provider === lastUsed && (
                <span className="absolute inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap -top-1 -right-8">
                  Last used
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthSocial;
