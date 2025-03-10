"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
import { toast } from "@/components/ui/use-toast";
import editBuildAction from "@/actions/edit-build-action";
import { useState } from "react";

export const editBuildClientSchema = z.object({
  newBuildName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function EditBuildForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof editBuildClientSchema>>({
    resolver: zodResolver(editBuildClientSchema),
  });

  async function onSubmit(data: z.infer<typeof editBuildClientSchema>) {
    setIsLoading(true);
    const res = await editBuildAction(data);
    if (!res) {
      toast({
        title: "cant edit name , try again",
      });
      setIsLoading(false);

      return;
    }
    toast({
      title: "build edited successfully",
    });
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="newBuildName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>new build name</FormLabel>
              <FormControl>
                <Input placeholder="my build" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="hover:opacity-80 hover:scale-95 transition-all text-white"
        >
          {isLoading ? (
            <Loader2 className="animate-spin w-8 h-8" />
          ) : (
            "edit build"
          )}
        </Button>
      </form>
    </Form>
  );
}
