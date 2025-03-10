"use client";
import { Divide, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";

import { map, z } from "zod";
import React, { useRef, useState } from "react";
import { motherboardFormSchema } from "@/schemas/client/motherboard-client-schema";
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
import MotherboardAction from "@/actions/motherboard-action";
import { keys } from "@mantine/core";
import { nanoid } from "nanoid";

export default function MotherboardForm() {
  const [isFormLoading, setIsFromLoading] = useState(false);
  const [images, setImages] = useState<any>([]);

  const form = useForm<z.infer<typeof motherboardFormSchema>>({
    resolver: zodResolver(motherboardFormSchema),
    defaultValues: {
      name: "",
      price: NaN,
      socket: "",
      form_factor: "",
      max_memory: NaN,
      memory_slots: NaN,
      color: "",
    },
  });

  async function onSubmit(data: z.infer<typeof motherboardFormSchema>) {
    setIsFromLoading(true);

    const res = await MotherboardAction(data, images[0]);

    if (res) {
      toast({
        title: "Motherboard successfully inserted",
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name : " {...field} />
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
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socket"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Socket</FormLabel>
                <FormControl>
                  <Input placeholder="Socket : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="form_factor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Factor</FormLabel>
                <FormControl>
                  <Input placeholder="Form Factor : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max_memory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Memory</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Max Memory : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memory_slots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Memory Slots</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Memory Slots : "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Color : " {...field} />
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
