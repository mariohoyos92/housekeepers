import React, { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import FormAlert, { FormAlertArgs } from "../../components/FormAlert";
import { useAuth, requireAuth, PreparedUser } from "../../util/auth";
import { useRouter } from "next/router";
import { redirectToCheckout } from "../../util/stripe";

function PurchasePage() {
  const router = useRouter();
  const auth = useAuth();
  const [formAlert, setFormAlert] = useState<FormAlertArgs>();

  useEffect(() => {
    if (auth.user && (auth.user as PreparedUser).planIsActive) {
      // If user already has an active plan
      // then take them to Stripe billing
      router.push("/settings/billing");
    } else {
      // Otherwise go to checkout
      redirectToCheckout(router.query.plan).catch(error => {
        setFormAlert({
          type: "error",
          message: error.message,
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLoader>
      {formAlert && <FormAlert type={formAlert.type} message={formAlert.message} style={{ maxWidth: "500px" }} />}
    </PageLoader>
  );
}

export default requireAuth(PurchasePage);
