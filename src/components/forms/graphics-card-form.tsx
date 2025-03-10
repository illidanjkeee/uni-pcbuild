"use client";
import { Divide, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";

import { map, z } from "zod";
import React, { useRef, useState } from "react";
import { graphicsCardFormSchema } from "@/schemas/client/graphics-card-client-schema";
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
import GraphicsCardAction from "@/actions/graphics-card-action";
import { keys } from "@mantine/core";
import { nanoid } from "nanoid";

export default function GraphicsCardForm() {
  const [isFormLoading, setIsFromLoading] = useState(false);
  const [images, setImages] = useState<any>([]);

  const form = useForm<z.infer<typeof graphicsCardFormSchema>>({
    resolver: zodResolver(graphicsCardFormSchema),
    defaultValues: {
      name: "",
      price: NaN,
      chipset: "",
      memory: NaN,
      core_clock: NaN,
      boost_clock: NaN,
      color: "",
      length: NaN,
    },
  });

  async function onSubmit(data: z.infer<typeof graphicsCardFormSchema>) {
    setIsFromLoading(true);

    const res = await GraphicsCardAction(data, images[0]);

    if (res) {
      toast({
        title: "Graphics Card successfully inserted",
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
            name="chipset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chipset</FormLabel>
                <FormControl>
                  <Input placeholder="Chipset : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Memory</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Memory : " {...field} />
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
                <FormLabel>Core Clock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Core Clock : " {...field} />
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
                <FormLabel>Boost Clock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Boost Clock : "
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

          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Length : " {...field} />
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
