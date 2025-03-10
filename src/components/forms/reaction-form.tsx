"use client";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import addAnswer from "@/actions/add-answer";
import addReaction from "@/actions/add-reaction";

const FormSchema = z.object({
  reaction: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function ReactionForm({
  purpose,
  buttonName,
  questionID,
  sharedbuildID,
}: {
  purpose: "questions" | "builds";
  buttonName: string;
  questionID?: string;
  sharedbuildID?: string;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (purpose === "questions" && questionID) {
      const res = await addAnswer(data.reaction, questionID);
      if (!res) {
        toast({
          title: "Question not added",
        });
        return;
      }
      toast({
        title: "Question added",
      });
    }

    if (purpose === "builds" && sharedbuildID) {
      const res = await addReaction(data.reaction, sharedbuildID);
      if (!res) {
        toast({
          title: "Reaction not added",
        });
        return;
      }
      toast({
        title: "Reaction added",
      });
    }
  }
  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-secondary text-white">{buttonName}</Button>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="reaction"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="text-white"
                          placeholder="react"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
