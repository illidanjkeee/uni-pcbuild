"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import addQuestion from "@/actions/add-question";
const FormSchema = z.object({
  question: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
export default function QuestionInput() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await addQuestion(data.question);
    if (!res) {
      toast({
        title: "Question not added",
      });
      form.reset();
      return;
    }
    toast({
      title: "Question added",
    });
    form.reset();
  }
  return (
    <>
      <div className="w-full">
        {/* <SpecialButton
            className="py-3 px-6 flex gap-2 "
            borderRadius="0.5rem"
          >
            share build
            <Share2 />
          </SpecialButton> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full sm:w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md ">Ask Question</FormLabel>
                  <FormControl>
                    <Input
                      className="text-white border border-white "
                      placeholder="ask question"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      </div>
    </>
  );
}
