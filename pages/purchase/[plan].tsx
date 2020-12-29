import React, { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { useAuth, requireAuth, PreparedUser } from "../../util/auth";
import { useRouter } from "next/router";
import { redirectToCheckout } from "../../util/stripe";
import Alert, { AlertTypes } from "../../components/Alert/Alert";

function PurchasePage() {
  const router = useRouter();
  const auth = useAuth();
  const [formAlert, setFormAlert] = useState<{ type: AlertTypes; message: string }>();

  useEffect(() => {
    if (auth.user && (auth.user as PreparedUser).planIsActive) {
      // If user already has an active plan
      // then take them to Stripe billing
      router.push("/settings/billing");
    } else {
      // Otherwise go to checkout
      redirectToCheckout(router.query.plan).catch(error => {
        setFormAlert({
          type: AlertTypes.error,
          message: error.message,
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PageLoader>{formAlert && <Alert type={formAlert.type} header={formAlert.message} />}</PageLoader>;
}

export default requireAuth(PurchasePage);
