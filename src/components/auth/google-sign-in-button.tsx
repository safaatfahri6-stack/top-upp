"use client";

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.088,5.571l6.19,5.238C43.021,36.241,44,30.338,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

export default function GoogleSignInButton() {
  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoResponse.json();

        login({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        });
      } catch (error) {
        console.error("Failed to fetch user info from Google", error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google Sign-In failed:', errorResponse);
    }
  });

  return (
    <Button onClick={() => handleGoogleLogin()} className="w-full" size="lg">
      <GoogleIcon />
      Sign in with Google
    </Button>
  );
}
