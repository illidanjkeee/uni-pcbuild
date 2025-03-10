"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import GradientText from "@/components/gradient-text";
import { useAdminStore } from "@/stores/admin-store";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  password: z.string(),
});

export default function Security() {
  const router = useRouter();
  const setAdminPassword = useAdminStore((state) => state.setAdminPassword);
  const adminPassword = useAdminStore((state) => state.adminPassword);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.password === "1234") {
      setAdminPassword(data.password);
      router.push("/dashboard");
      return;
    }
    toast({
      title: "incorrect admin password",
    });
  }

  return (
    <div className="w-screen h-screen flex-col flex justify-center items-center gap-8">
      <GradientText size="text-5xl">Admin Verification</GradientText>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter admin password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">proceed</Button>
        </form>
      </Form>
    </div>
  );
}
