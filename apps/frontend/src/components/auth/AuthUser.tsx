"use client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { signupUser } from "@/app/api/AuthActions";

const AuthUser = (props) => {
  const {is_login=false} = props;
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const onLogin = async () => {
    const payload = {
      email,
      password,
    };

    // const response = await signIn(payload);
    // if (response && response?.status === 200) {
    //   push("/blog");
    // }
  };

  const onSignup = async () => {
    const payload = {
      email,
      password,
      first_name,
      last_name,
    };

    const response = await signupUser(payload);
    if (response && response?.status === 200) {
      push("/");
    }
  };

  return (
    <div className="mx-auto min-w-[448px] max-w-[448px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold pt-6">
          {is_login ? "Login" : "Sign Up"}
        </h1>
      </div>
      <form className="space-y-4">
        {!is_login ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="John"
                required
                value={first_name}
                onChange={(e) => setFirstName(e?.target?.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Doe"
                required
                value={last_name}
                onChange={(e) => setLastName(e?.target?.value)}
              />
            </div>
          </div>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@acme.com"
            required
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
          />
        </div>
        <Button
          type="button"
          className="w-full"
          onClick={is_login ? onLogin : onSignup}
        >
          {is_login ? "Login" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default AuthUser;
