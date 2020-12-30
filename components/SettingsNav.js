import React from "react";
import Link from "next/link";

function SettingsNav(props) {
  return (
    <div {...props}>
      <div>
        <Link href="/settings/general" passHref={true}>
          <a eventKey="general">General</a>
        </Link>
      </div>
      <div>
        <Link href="/settings/password" passHref={true}>
          <a eventKey="password">Password</a>
        </Link>
      </div>
      <div>
        <Link href="/settings/billing" passHref={true}>
          <a eventKey="billing">Billing</a>
        </Link>
      </div>
    </div>
  );
}

export default SettingsNav;
