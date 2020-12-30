import React from "react";
import Alert from "./Alert";
import Link from "next/link";
import { PreparedUser, useAuth } from "../util/auth";
import { useRouter } from "next/router";
import { AlertTypes } from "./Alert/Alert";

function DashboardSection() {
  const auth = useAuth();
  const router = useRouter();
  const user = auth.user as PreparedUser;

  return (
    <section>
      <h1>Dashboard</h1>

      {router.query.paid && user.planIsActive && (
        <Alert
          type={AlertTypes.success}
          header={
            <>
              You are now subscribed
              <span className="ml-2" role="img" aria-label="party">
                🥳
              </span>
            </>
          }
        ></Alert>
      )}
      <div
        className="mx-auto mt-5 text-center"
        style={{
          maxWidth: "460px",
        }}
      >
        Logged in as <strong>{user.email}</strong>
        {user.stripeSubscriptionId && (
          <>
            <br />
            Subscription data
            <br />
            ID: <strong>{user.stripeSubscriptionId}</strong>
            <br />
            Price ID: <strong>{user.stripePriceId}</strong>
            <br />
            Status: <strong>{user.stripeSubscriptionStatus}</strong>
          </>
        )}
        <br />
        {!user.stripeSubscriptionId && (
          <Link href="/pricing">
            <a>Subscribe to a plan</a>
          </Link>
        )}
        <br />
        <Link href="/settings/general">
          <a>Account settings</a>
        </Link>
      </div>
    </section>
  );
}

export default DashboardSection;
