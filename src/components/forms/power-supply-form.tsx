"use client";
import { Divide, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";
import { map, z } from "zod";
import React, { useRef, useState } from "react";
import { powerSupplyClientSchema } from "@/schemas/client/power-supply-client-schema";
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
import PowerSupplyAction from "@/actions/power-supply-action";

export default function PowerSupplyForm() {
  const [isFormLoading, setIsFromLoading] = useState(false);
  const [images, setImages] = useState<any>([]);

  const form = useForm<z.infer<typeof powerSupplyClientSchema>>({
    resolver: zodResolver(powerSupplyClientSchema),
    defaultValues: {
      name: "",
      price: NaN,
      type: "",
      efficiency: "",
      wattage: NaN,
      modular: "",
      color: "",
    },
  });

  async function onSubmit(data: z.infer<typeof powerSupplyClientSchema>) {
    console.log("in the power supply form-----------");
    setIsFromLoading(true);

    const res = await PowerSupplyAction(data, images[0]);

    if (res) {
      toast({
        title: "Power supply successfully inserted",
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
        <div className="grid  mb-4 grid-cols-2 gap-x-12 gap-y-6 w-full">
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
            name="efficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Efficiency</FormLabel>
                <FormControl>
                  <Input placeholder="Efficiency : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wattage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wattage</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Wattage : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="modular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modular</FormLabel>
                <FormControl>
                  <Input placeholder="Modular : " {...field} />
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
