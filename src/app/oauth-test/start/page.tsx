
"use client";

import { useState } from "react";

const CLIENT_ID = "1b7117ee-00ea-49ed-8d77-db9ae7902eba";

const AUTHORIZE_URL =
  "https://jkupevygaxzhuqspszvs.supabase.co/auth/v1/oauth/authorize";

const REDIRECT_URI =
  "https://movie-watchlist-mcp-auth-frontend.vercel.app/oauth-test/callback";

function base64UrlEncode(bytes: Uint8Array) {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function OAuthTestStart() {
  const [loading, setLoading] = useState(false);

  async function startOAuth() {
    setLoading(true);

    try {
      const randomBytes = crypto.getRandomValues(
        new Uint8Array(32)
      );

      const codeVerifier = base64UrlEncode(randomBytes);

      const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(codeVerifier)
      );

      const codeChallenge = base64UrlEncode(
        new Uint8Array(digest)
      );

      const stateBytes = crypto.getRandomValues(
        new Uint8Array(32)
      );

      const state = base64UrlEncode(stateBytes);

      sessionStorage.setItem(
        "oauth_code_verifier",
        codeVerifier
      );

      sessionStorage.setItem("oauth_state", state);

      const params = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
        state,
        scope: "email",
      });

      window.location.assign(
        `${AUTHORIZE_URL}?${params.toString()}`
      );
    } catch (error) {
      console.error("OAuth initialization failed:", error);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md rounded-xl border border-gray-700 p-8 text-center">
        <h1 className="mb-3 text-2xl font-bold">
          MovieWatch Production OAuth
        </h1>

        <p className="mb-6 text-gray-400">
          Test Supabase OAuth on the deployed application.
        </p>

        <button
          onClick={startOAuth}
          disabled={loading}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Redirecting..." : "Connect MovieWatch"}
        </button>
      </div>
    </main>
  );
}
