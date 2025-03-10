"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAdminStore } from "@/stores/admin-store";
import { Button } from "@/components/ui/button";
import giveAdminAddPartForm from "@/lib/giveAdminAddPartForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  selectedValue: z.string({
    required_error: "Please select an email to display.",
  }),
});

export function AdminSelectCategory() {
  const adminSelectedCategory = useAdminStore(
    (state: any) => state.adminSelectedCategory
  );
  const setAdminSelectedCategory = useAdminStore(
    (state: any) => state.setAdminSelectedCategory
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setAdminSelectedCategory(data.selectedValue);
    console.log(
      "adming selected form type before global state :  ",
      data.selectedValue
    );
    console.log(
      "adming selected form type  (global state) :  ",
      adminSelectedCategory
    );
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex w-full items-center gap-8 "
        >
          <FormField
            control={form.control}
            name="selectedValue"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="case">Case</SelectItem>
                    <SelectItem value="cpu">CPU</SelectItem>
                    <SelectItem value="cpu-cooler">Cpu cooler</SelectItem>
                    <SelectItem value="memory">memory</SelectItem>
                    <SelectItem value="motherboard">motherboard</SelectItem>
                    <SelectItem value="graphics-card">graphics card</SelectItem>
                    <SelectItem value="fans">fans</SelectItem>
                    <SelectItem value="storage">storage</SelectItem>
                    <SelectItem value="power-supply">power supply</SelectItem>
                    <SelectItem value="network-card">network card</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">create</Button>
        </form>
      </Form>
      <div>{giveAdminAddPartForm(adminSelectedCategory)}</div>
    </div>
  );
}
