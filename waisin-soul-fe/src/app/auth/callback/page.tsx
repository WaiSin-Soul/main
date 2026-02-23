"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase-browser";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const supabase = createClient();
        const next = searchParams.get("next") || "/user/profile";
        const code = searchParams.get("code");
        const tokenHash = searchParams.get("token_hash");
        const typeParam = searchParams.get("type");

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            if (exchangeError.message.includes("PKCE code verifier not found")) {
              const {
                data: { session: fallbackSession },
              } = await supabase.auth.getSession();

              if (fallbackSession) {
                router.push(next.startsWith("/") ? next : "/user/profile");
                return;
              }

              setError(
                "This confirmation link was opened without the original auth session. Please request a new confirmation email and open it in the same browser.",
              );
              setLoading(false);
              return;
            }

            setError(exchangeError.message);
            setLoading(false);
            return;
          }
        } else if (tokenHash && typeParam) {
          const validTypes = ["signup", "invite", "magiclink", "recovery", "email_change"];
          if (!validTypes.includes(typeParam)) {
            setError("Invalid confirmation link type");
            setLoading(false);
            return;
          }

          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: typeParam as "signup" | "invite" | "magiclink" | "recovery" | "email_change",
          });

          if (verifyError) {
            setError(verifyError.message);
            setLoading(false);
            return;
          }
        } else {
          setError("No authorization code or verification token found");
          setLoading(false);
          return;
        }

        // Get the current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setError("Failed to establish session");
          setLoading(false);
          return;
        }

        router.push(next.startsWith("/") ? next : "/user/profile");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Confirming your email...</p>
          <div className="mt-4">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-600 border-t-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Confirmation Error</h1>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
          <div className="mt-4">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-600 border-t-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
