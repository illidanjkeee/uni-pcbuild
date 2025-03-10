"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { buildClientSchema } from "@/schemas/client/build-client-schema";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
import BuildAction from "@/actions/build-action";
import { useToast } from "@/components/ui/use-toast";

export default function BuidForm({
  isWithPayload = false,
  payload,
}: {
  isWithPayload?: boolean;
  payload?: any;
}) {
  const { toast } = useToast();
  const [isFormLoading, setIsFromLoading] = useState(false);
  const form = useForm<z.infer<typeof buildClientSchema>>({
    resolver: zodResolver(buildClientSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof buildClientSchema>) {
    if (isWithPayload) {
      setIsFromLoading(true);
      const res = await BuildAction(data, isWithPayload, payload);
      if (!res) {
        toast({
          variant: "destructive",
          title: "something went wrong",
        });
        setIsFromLoading(false);
        form.reset();
        return;
      }
      toast({
        variant: "default",
        title: "build created successfully",
      });
      setIsFromLoading(false);
      form.reset();
    } else {
      setIsFromLoading(true);
      const res = await BuildAction(data);
      if (!res) {
        toast({
          variant: "destructive",
          title: "something went wrong",
        });
        setIsFromLoading(false);
        form.reset();
        return;
      }
      toast({
        variant: "default",
        title: "build created successfully",
      });
      setIsFromLoading(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-md pb-10 ">build name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="e.g : my build"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="text-white">
          {isFormLoading ? null : "create"}
          {isFormLoading && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
