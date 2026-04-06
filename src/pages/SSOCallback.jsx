import { AuthenticateWithRedirectCallback } from "@clerk/react";

/**
 * OAuth return path. Captcha mount is required when Clerk sign-up protection is on.
 */
const SSOCallback = () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="text-sm font-medium text-slate-500">Completing sign-in…</p>
        <AuthenticateWithRedirectCallback />
        <div id="clerk-captcha" />
    </div>
);

export default SSOCallback;
