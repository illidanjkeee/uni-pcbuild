"use client";
import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";
import { z } from "zod";
import React, { useRef, useState } from "react";
import { cpuClientSchema } from "@/schemas/client/cpu-client-schema";
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
import CpuAction from "@/actions/cpu-action";

export default function CpuForm() {
  const [isFormLoading, setIsFromLoading] = useState(false);
  const [items, setItems] = useState<any>([]);
  const inputItemsRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<any>([]);
  const handleSelectItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputItemsRef.current && event.key === "Enter") {
      event.preventDefault();
      console.log(inputItemsRef.current.value);
      const newItem = inputItemsRef.current.value;
      setItems((prevItems: any) => [...prevItems, newItem]);
      inputItemsRef.current.value = "";
    }
  };
  console.log(items);
  const form = useForm<z.infer<typeof cpuClientSchema>>({
    resolver: zodResolver(cpuClientSchema),
    defaultValues: {
      name: "",
      price: NaN,
      core_count: NaN,
      core_clock: NaN,
      boost_clock: NaN,
      tdp: NaN,
      graphics: "",
      smt: "",
    },
  });
  async function onSubmit(data: z.infer<typeof cpuClientSchema>) {
    setIsFromLoading(true);

    const res = await CpuAction(data, images[0]);

    if (res) {
      toast({
        title: "cpu successfully inserted",
      });
      setIsFromLoading(false);
      form.reset();
      return;
    }

    toast({
      title: "something went wrong!",
    });

    setIsFromLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col items-center   pb-4 mt-8"
      >
        <div
          className="grid  mb-4 grid-cols-2 gap-x-12 gap-y-6 w-full 
           "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="name : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="price : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="core_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>core count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="core_clock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>core clock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="boost_clock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>boost clock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tdp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>tdp</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="graphics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>core count</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>smt</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="true or false" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PhotosUploader
            maxPhotos={1}
            addedPhotos={images}
            onChange={setImages}
          />
        </div>

        <Button
          disabled={isFormLoading}
          className="w-full bg-[#7ED348] text-black  font-bold text-lg"
          type="submit"
        >
          {isFormLoading ? (
            <Loader className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
