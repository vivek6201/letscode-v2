"use client";
import { loginSchema } from "@/validations/authValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, SignInResponse } from "next-auth/react";
import { Loader, X } from "lucide-react";
import CustomIcon from "../ui/custom-icon";
import { usePathname, useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState<null | SignInResponse>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setLoading(false);
    if (pathname.includes("/login") && !res?.error) {
      router.push("/");
    }

    if (res?.error) {
      setError(res);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full md:11/12 my-5"
      >
        {error ? (
          <div className="flex justify-between items-center rounded-md p-5 bg-red-700">
            <p>{error.code}</p>
            <Button
              className=""
              variant={"ghost"}
              size={"icon"}
              onClick={() => setError(null)}
            >
              <CustomIcon iconName={X} />
            </Button>
          </div>
        ) : null}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="flex gap-2 items-center h-10"
        >
          {loading ? <Loader className="animate-spin" /> : null}
          Submit
        </Button>
      </form>
    </Form>
  );
}
