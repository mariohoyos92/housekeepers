import { useRouter } from "next/router";
import React from "react";
import AuthSection from "../../components/AuthSection/AuthSection";

function AuthPage() {
  const router = useRouter();
  return (
    <AuthSection
      type={router.query.type as string}
      providers={["google"]}
      afterAuthPath={(router.query.next as string) || "/dashboard"}
    />
  );
}

// Tell Next.js to export static files for each auth page
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = () => ({
  paths: [
    { params: { type: "signin" } },
    { params: { type: "signup" } },
    { params: { type: "forgotpass" } },
    { params: { type: "changepass" } },
  ],
  fallback: true,
});

export function getStaticProps({ params }) {
  return { props: {} };
}

export default AuthPage;
