"use client";
import { Divide, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";

import { map, z } from "zod";
import React, { useRef, useState } from "react";
import { cpuCoolerFormSchema } from "@/schemas/client/cpu-cooler-client-schema";
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
import CPUCoolerAction from "@/actions/cpu-cooler-action";
import { nanoid } from "nanoid";

export default function CpuCoolerForm() {
  const [rpmItems, setRpmItems] = useState<any>([]);
  const rpmRef = useRef<HTMLInputElement>(null);
  const [noiseLevelItems, setNoiseLevelItems] = useState<any>([]);
  const noiseLevelRef = useRef<HTMLInputElement>(null);

  const [isFormLoading, setIsFromLoading] = useState(false);
  const [images, setImages] = useState<any>([]);

  const form = useForm<z.infer<typeof cpuCoolerFormSchema>>({
    resolver: zodResolver(cpuCoolerFormSchema),
    defaultValues: {
      name: "",
      price: NaN,
      color: "",
      size: NaN,
    },
  });

  async function onSubmit(data: z.infer<typeof cpuCoolerFormSchema>) {
    setIsFromLoading(true);

    const res = await CPUCoolerAction(
      data,
      images[0],
      noiseLevelItems,
      rpmItems
    );

    if (res) {
      toast({
        title: "CPU Cooler successfully inserted",
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
  const handleSelectNoiseLevelItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (noiseLevelRef.current && event.key === "Enter") {
      event.preventDefault();

      console.log(noiseLevelRef.current.value);
      const newItem = noiseLevelRef.current.value;
      setNoiseLevelItems((prevItems: any) => [...prevItems, newItem]);
      noiseLevelRef.current.value = "";
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
  const handleDeleteNoiseLevelItem = (
    event: React.MouseEvent<HTMLDivElement>,
    item: any
  ) => {
    event.preventDefault();
    console.log("removing items");
    setNoiseLevelItems((oldValues: any) => {
      return oldValues.filter((fruit: any) => fruit !== item);
    });
  };
  const handleNoiseLevelBoxItems = () => {
    if (noiseLevelItems.length === 0) {
      return (
        <>
          <span>no items added</span>
        </>
      );
    } else {
      return (
        <div className="flex gap-3">
          {noiseLevelItems.map((item: any) => {
            return (
              <div
                key={nanoid()}
                onClick={(e) => handleDeleteNoiseLevelItem(e, item)}
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
              type="text"
              placeholder="enter items"
              ref={rpmRef}
              onKeyDown={handleSelectRpmItem}
            />
            {handleRpmBoxItems()}
          </div>

          <div className="flex flex-col gap-3">
            <div>Noise Level</div>
            <Input
              className="text-white"
              type="text"
              placeholder="enter items"
              ref={noiseLevelRef}
              onKeyDown={handleSelectNoiseLevelItem}
            />
            {handleNoiseLevelBoxItems()}
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
