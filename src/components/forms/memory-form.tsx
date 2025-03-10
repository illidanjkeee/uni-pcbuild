"use client";
import { Divide, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";

import { map, z } from "zod";
import React, { useRef, useState } from "react";
import { memoryFormSchema } from "@/schemas/client/memory-client-schema";
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
import MemoryAction from "@/actions/memory-action";
import { keys } from "@mantine/core";
import { nanoid } from "nanoid";

export default function MemoryForm() {
  const [speedItems, setSpeedItems] = useState<any>([]);
  const speedRef = useRef<HTMLInputElement>(null);
  const [modulesItems, setModulesItems] = useState<any>([]);
  const modulesRef = useRef<HTMLInputElement>(null);

  const [isFormLoading, setIsFromLoading] = useState(false);
  const [images, setImages] = useState<any>([]);

  const form = useForm<z.infer<typeof memoryFormSchema>>({
    resolver: zodResolver(memoryFormSchema),
    defaultValues: {
      name: "",
      price: NaN,
      color: "",
      price_per_gb: NaN,
      first_word_latency: NaN,
      cas_latency: NaN,
    },
  });

  async function onSubmit(data: z.infer<typeof memoryFormSchema>) {
    setIsFromLoading(true);

    const res = await MemoryAction(data, images[0], speedItems, modulesItems);

    if (res) {
      toast({
        title: "Memory successfully inserted",
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
  const handleSelectSpeedItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (speedRef.current && event.key === "Enter") {
      event.preventDefault();

      console.log(speedRef.current.value);
      const newItem = speedRef.current.value;
      setSpeedItems((prevItems: any) => [...prevItems, newItem]);
      speedRef.current.value = "";
    }
  };
  const handleSelectModulesItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (modulesRef.current && event.key === "Enter") {
      event.preventDefault();

      console.log(modulesRef.current.value);
      const newItem = modulesRef.current.value;
      setModulesItems((prevItems: any) => [...prevItems, newItem]);
      modulesRef.current.value = "";
    }
  };
  const handleDeleteSpeedItem = (
    event: React.MouseEvent<HTMLDivElement>,
    item: any
  ) => {
    event.preventDefault();
    console.log("removing items");
    setSpeedItems((oldValues: any) => {
      return oldValues.filter((fruit: any) => fruit !== item);
    });
  };
  const handleDeleteModulesItem = (
    event: React.MouseEvent<HTMLDivElement>,
    item: any
  ) => {
    event.preventDefault();
    console.log("removing items");
    setModulesItems((oldValues: any) => {
      return oldValues.filter((fruit: any) => fruit !== item);
    });
  };
  const handleSpeedBoxItems = () => {
    if (speedItems.length === 0) {
      return (
        <>
          <span>no items added</span>
        </>
      );
    } else {
      return (
        <div className="flex gap-3">
          {speedItems.map((item: any) => {
            return (
              <div
                key={nanoid()}
                onClick={(e) => handleDeleteSpeedItem(e, item)}
                className="rounded-full group bg-primary cursor-pointer  text-black px-4 flex justify-between items-center gap-2 "
              >
                {item}
                <span className="hidden group-hover:flex">x</span>
              </div>
            );
          })}
        </div>
      );
    }
  };

  const handleModulesBoxItems = () => {
    if (modulesItems.length === 0) {
      return (
        <>
          <span>no items added</span>
        </>
      );
    } else {
      return (
        <div className="flex gap-3">
          {modulesItems.map((item: any) => {
            return (
              <div
                key={nanoid()}
                onClick={(e) => handleDeleteModulesItem(e, item)}
                className="rounded-full group bg-primary cursor-pointer  text-black px-4 flex justify-between items-center gap-2 "
              >
                {item}
                <span className="hidden group-hover:flex">x</span>
              </div>
            );
          })}
        </div>
      );
    }
  };

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
            name="first_word_latency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Word Latency</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="First Word Latency : "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cas_latency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CAS Latency</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="CAS Latency : "
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

          <div className="flex flex-col gap-3">
            <div>Speed</div>
            <Input
              className="text-white"
              type="text"
              placeholder="enter items"
              ref={speedRef}
              onKeyDown={handleSelectSpeedItem}
            />
            {handleSpeedBoxItems()}
          </div>

          <div className="flex flex-col gap-3">
            <div>Modules</div>
            <Input
              className="text-white"
              type="text"
              placeholder="enter items"
              ref={modulesRef}
              onKeyDown={handleSelectModulesItem}
            />
            {handleModulesBoxItems()}
          </div>

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
