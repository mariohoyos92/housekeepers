import React, { useEffect, useState } from "react";
import PageLoader from "../components/PageLoader";
import { handleRecoverEmail, handleVerifyEmail } from "../util/auth";
import { useRouter } from "next/router";
import Alert from "../components/Alert";
import { AlertTypes } from "../components/Alert/Alert";

function FirebaseActionPage() {
  const router = useRouter();
  const [formAlert, setFormAlert] = useState<{ type: AlertTypes; message: string }>();

  useEffect(() => {
    const { mode, oobCode } = router.query;

    // Do nothing if mode param is undefined.
    // Page may have been pre-rendered by server so won't have query values
    // until it's actually run on client (as is the case if using Next.js)
    if (!mode) return;

    // Take action based on Firebase "mode" query param
    switch (mode) {
      case "resetPassword":
        // Redirect to change password page
        router.replace(`/auth/changepass?oobCode=${oobCode}`);
        break;
      case "recoverEmail":
        // Reset to original email
        handleRecoverEmail(oobCode as string)
          .then(originalEmail => {
            setFormAlert({
              type: AlertTypes.success,
              message: `Your email has been set back to ${originalEmail}. We've also sent you a password reset email so that you can change your password if you think someone may have access to your account.`,
            });
          })
          .catch(error => {
            setFormAlert({
              type: AlertTypes.error,
              message: error.message,
            });
          });
        break;
      case "verifyEmail":
        // Verify email in Firebase
        handleVerifyEmail(oobCode)
          .then(() => {
            setFormAlert({
              type: AlertTypes.success,
              message: `Your email has been verified. You may now close this window.`,
            });
          })
          .catch(error => {
            setFormAlert({
              type: AlertTypes.error,
              message: error.message,
            });
          });
        break;
      default:
        setFormAlert({
          type: AlertTypes.error,
          message: "Invalid mode parameter",
        });
    }
  }, [router]);

  return (
    <PageLoader>{formAlert && <Alert type={formAlert.type as AlertTypes} header={formAlert.message} />}</PageLoader>
  );
}

export default FirebaseActionPage;
