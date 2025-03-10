"use client";
import { Divide, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";
import { map, z } from "zod";
import React, { useRef, useState } from "react";
import { storageClientSchema } from "@/schemas/client/storage-client-schema";
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
import StorageAction from "@/actions/storage-form-action";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { nanoid } from "nanoid";

export default function StorageForm() {
  const [isFormLoading, setIsFromLoading] = useState(false);
  const [images, setImages] = useState<any>([]);

  const form = useForm<z.infer<typeof storageClientSchema>>({
    resolver: zodResolver(storageClientSchema),
    defaultValues: {
      name: "",
      price: NaN,
      capacity: NaN,
      price_per_gb: NaN,
      type: "",
      cache: NaN,
      form_factor: "",
      interface: "",
    },
  });
  async function onSubmit(data: z.infer<typeof storageClientSchema>) {
    setIsFromLoading(true);

    const res = await StorageAction(data, images[0]);

    if (res) {
      toast({
        title: "Storage successfully inserted",
      });
      setIsFromLoading(false);
      form.reset();
      return;
    }

    toast({
      title: "Something went wrong!",
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
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Capacity : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_per_gb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per GB</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price per GB : "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Type : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cache"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cache</FormLabel>
                <FormControl>
                  <Input placeholder="Cache : " {...field} />
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
            name="interface"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interface</FormLabel>
                <FormControl>
                  <Input placeholder="Interface : " {...field} />
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
