"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/app/[locale]/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const initialState = { success: false, error: null as string | null };

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md shadow-lg border-gray-200 dark:border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Secure Login</CardTitle>
          <CardDescription>Enter your passphrase to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full"
                disabled={isPending}
              />
            </div>
            {state.error && (
              <p className="text-sm font-medium text-red-500 dark:text-red-400">{state.error}</p>
            )}
            {state.success && (
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Login successful! Redirecting...</p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
