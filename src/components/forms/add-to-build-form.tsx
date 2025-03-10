"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
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
import addToBuildAction from "@/actions/add-to-build-action";
import { useState } from "react";
import { set } from "mongoose";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type AddToBuildFormPropsT = {
  partId: string;
  partType: string;
  buildId: string;
  buildName: string;
};

export function AddToBuildForm({
  buildId,
  buildName,
  partId,
  partType,
}: AddToBuildFormPropsT) {
  const [isFormLoading, setIsFromLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function handleSubmit() {
    setIsFromLoading(true);

    const res = await addToBuildAction(partId, partType, buildId);
    if (!res) {
      toast({
        title: "cant add to build, try again",
      });
      setIsFromLoading(false);
      return;
    }
    toast({
      title: "part added to build successfully",
    });
    setIsFromLoading(false);
  }

  return (
    <>
      <button
        disabled={isFormLoading}
        onClick={handleSubmit}
        className="flex hover:opacity-85 hover:scale-95 transition-all text-black font-bold bg-mono gap-4 py-2 px-4 rounded-md mb-3 min-w-[200px]   "
      >
        {isFormLoading ? null : <PlusCircle className="h-6 w-6 stroke-black" />}
        {isFormLoading ? (
          <Loader2 className="h-6 w-6 animate-spin stroke-black" />
        ) : null}
        <span className="whitespace-normal">
          {buildName}
        </span>
      </button>
    </>
  );
}
