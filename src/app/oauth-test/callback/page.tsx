
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function OAuthCallbackResult() {
  const params = useSearchParams();

  const code = params.get("code");
  const state = params.get("state");
  const error = params.get("error");

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-xl rounded-xl border border-gray-700 p-8">
        <h1 className="mb-5 text-2xl font-bold">
          MovieWatch Production OAuth Test
        </h1>

        {error ? (
          <p className="text-red-400">
            Authorization failed: {error}
          </p>
        ) : code ? (
          <>
            <p className="mb-3 text-green-400">
              Authorization successful!
            </p>

            <p>
              Authorization code: Received
            </p>

            <p>
              State: {state ? "Received" : "Missing"}
            </p>

            <p className="mt-5 text-sm text-gray-400">
              Do not share your authorization code or full callback URL.
            </p>
          </>
        ) : (
          <p className="text-red-400">
            No authorization response received.
          </p>
        )}
      </div>
    </main>
  );
}

export default function OAuthTestCallback() {
  return (
    <Suspense fallback={<p className="text-white">Loading...</p>}>
      <OAuthCallbackResult />
    </Suspense>
  );
}
