import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const segments = useSegments();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    if (isMounted && !user && !inAuthGroup) {
      router.replace("/auth");
    } else if (isMounted && user && inAuthGroup) {
      router.replace("/");
    }
  }, [isMounted, user, segments]);

  if (!isMounted) {
    return null; // prevent navigation before layout mounts
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <RouteGuard>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </RouteGuard>
      </PaperProvider>
    </AuthProvider>
  );
}
