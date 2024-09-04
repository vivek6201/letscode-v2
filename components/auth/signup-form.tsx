"use client";
import { registerSchema } from "@/validations/authValidations";
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
import { registerAction } from "@/actions/register";
import { toast } from "sonner";
import CustomIcon from "../ui/custom-icon";
import { Loader, X } from "lucide-react";

export default function SignupForm() {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    const res = await registerAction({ ...values });
    if (!res.success && res.message) {
      setError(res.message);
      toast.error(res.message);
    }
    setLoading(false);

    toast.success(res.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full md:w-11/12 my-5"
      >
        {error ? (
          <div className="flex justify-between items-center rounded-md p-5 bg-red-700">
            <p>{error}</p>
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
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
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
