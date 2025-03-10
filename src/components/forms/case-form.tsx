"use client";
import { Divide, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";
import { map, z } from "zod";
import React, { useRef, useState } from "react";
import { caseClientSchema } from "@/schemas/client/case-client-schema";
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
import CaseAction from "@/actions/case-action";
import { nanoid } from "nanoid";

export default function CaseForm() {
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
  const form = useForm<z.infer<typeof caseClientSchema>>({
    resolver: zodResolver(caseClientSchema),
    defaultValues: {
      color: "",
      external_volume: NaN,
      internal_35_bays: NaN,
      name: "",
      price: NaN,
      psu: "",
      side_panel: "",
      type: "",
    },
  });
  async function onSubmit(data: z.infer<typeof caseClientSchema>) {
    setIsFromLoading(true);

    const res = await CaseAction(data, images[0]);

    if (res) {
      toast({
        title: "case successfully inserted",
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
  const handleDeleteItem = (
    event: React.MouseEvent<HTMLDivElement>,
    item: any
  ) => {
    event.preventDefault();
    console.log("removing items");
    setItems((oldValues: any) => {
      return oldValues.filter((fruit: any) => fruit !== item);
    });
  };
  const handleBoxItems = () => {
    if (items.length === 0) {
      return (
        <>
          <span>no items added</span>
        </>
      );
    } else {
      return (
        <div className="flex gap-3">
          {items.map((item: any) => {
            return (
              <div
                key={nanoid()}
                onClick={(e) => handleDeleteItem(e, item)}
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>type</FormLabel>
                <FormControl>
                  <Input placeholder="type : " {...field} />
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
                <FormLabel>color</FormLabel>
                <FormControl>
                  <Input placeholder="color : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="psu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>psu</FormLabel>
                <FormControl>
                  <Input placeholder="psu: " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="side_panel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>side panel</FormLabel>
                <FormControl>
                  <Input placeholder="side panel : " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="external_volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>external volume</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="external volume : "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="internal_35_bays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>internal 35 bays</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="internal 35 bays : "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className="flex flex-col gap-3">
            <div>enter Items</div>
            <Input
              className="text-white"
              type="text"
              placeholder="enter items"
              ref={inputItemsRef}
              onKeyDown={handleSelectItem}
            />
            {handleBoxItems()}
          </div> */}
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
