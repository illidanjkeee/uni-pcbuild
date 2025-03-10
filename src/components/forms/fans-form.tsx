"use client";
import { Divide, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";

import { map, z } from "zod";
import React, { useRef, useState } from "react";
import { fanFormSchema } from "@/schemas/client/fans-client-schema";
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
import FansAction from "@/actions/fans-action";
import { keys } from "@mantine/core";
import { nanoid } from "nanoid";

export default function FanForm() {
  const [rpmItems, setRpmItems] = useState<any>([]);
  const rpmRef = useRef<HTMLInputElement>(null);
  const [isFormLoading, setIsFromLoading] = useState(false);
  const [images, setImages] = useState<any>([]);

  const form = useForm<z.infer<typeof fanFormSchema>>({
    resolver: zodResolver(fanFormSchema),
    defaultValues: {
      name: "",
      price: NaN,
      size: NaN,
      color: "",
      airflow: NaN,
      noise_level: NaN,
      pwm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof fanFormSchema>) {
    setIsFromLoading(true);

    const res = await FansAction(data, images[0], rpmItems);

    if (res) {
      toast({
        title: "Fan successfully inserted",
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
  const handleSelectRpmItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (rpmRef.current && event.key === "Enter") {
      event.preventDefault();

      console.log(rpmRef.current.value);
      const newItem = rpmRef.current.value;
      setRpmItems((prevItems: any) => [...prevItems, newItem]);
      rpmRef.current.value = "";
    }
  };

  const handleDeleteRpmItem = (
    event: React.MouseEvent<HTMLDivElement>,
    item: any
  ) => {
    event.preventDefault();
    console.log("removing items");
    setRpmItems((oldValues: any) => {
      return oldValues.filter((fruit: any) => fruit !== item);
    });
  };
  const handleRpmBoxItems = () => {
    if (rpmItems.length === 0) {
      return (
        <>
          <span>no items added</span>
        </>
      );
    } else {
      return (
        <div className="flex gap-3">
          {rpmItems.map((item: any) => {
            return (
              <div
                key={nanoid()}
                onClick={(e) => handleDeleteRpmItem(e, item)}
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
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Size : " {...field} />
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
            <div>rpm</div>
            <Input
              className="text-white"
              type="number"
              placeholder="enter items"
              ref={rpmRef}
              onKeyDown={handleSelectRpmItem}
            />
            {handleRpmBoxItems()}
          </div>

          <FormField
            control={form.control}
            name="airflow"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Airflow</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Airflow : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noise_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Noise Level</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Noise Level : "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pwm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PWM</FormLabel>
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
