"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

export function GoogleAuthProviderWrapper({ children }: { children: ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  console.log("Google Client ID Status:", clientId ? "Loaded" : "Missing", clientId);

  if (!clientId) {
    console.warn("Google Client ID is missing in environment variables");
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
