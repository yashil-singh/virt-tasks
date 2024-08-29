"use client";

import { login } from "@/actions/auth";
import Button from "@/components/shared/button";
import Card from "@/components/shared/card";
import FormError from "@/components/shared/form-error";
import FormSuccess from "@/components/shared/form-success";
import Input from "@/components/shared/input";
import { Lock, User } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const resetForm = () => {
    setUsername("");
    setPassword("");
    resetFormMessages();
  };

  const resetFormMessages = () => {
    setUsernameError(null);
    setPasswordError(null);
    setFormError(null);
    setFormSuccess(null);
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (username.trim().length === 0) {
      setUsernameError("Username is required.");
      hasError = true;
    }

    if (password.trim().length === 0) {
      setPasswordError("Password is required.");
      hasError = true;
    }

    if (hasError) {
      console.log(usernameError);
      console.log(passwordError);
      return;
    }

    try {
      resetFormMessages();

      const response = await login({ username, password });

      if (response.error) {
        setFormError(response.error || "An error occurred");
      } else {
        setFormSuccess(response.success || "Logged in successfully.");
        setTimeout(() => {
          router.replace("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);

      setFormError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-full w-full flex items-center justify-center">
      <Card title="Login to your Account" className="max-w-[380px] space-y-5">
        <form onSubmit={onLogin} method="POST" className="flex flex-col gap-4">
          <div className="space-y-3">
            {formError && <FormError message={formError} />}
            {formSuccess && <FormSuccess message={formSuccess} />}
            <div className="space-y-1.5">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                iconLeft={<User />}
                isError={usernameError ? true : false}
              />
              {usernameError && (
                <p className="text-red-500 text-xs">{usernameError}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                iconLeft={<Lock />}
                isError={passwordError ? true : false}
                isPasswordEntry
              />
              {passwordError && (
                <p className="text-red-500 text-xs">{passwordError}</p>
              )}
            </div>
          </div>
          <Button disabled={isSubmitting} isLoading={isSubmitting}>
            Login
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default LoginPage;
