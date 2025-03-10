"use client";
import { buildT } from "@/types/build-type";
import BrowseCard from "./browse-card";
import { useAdminStore } from "@/stores/admin-store";
import React from "react";
import giveAllParts from "@/lib/giveAllParts";
import { useEffect, useState } from "react";
import { all } from "axios";

type BrowseCardWrapperProps = {
  currentPage: number;
  allbuids: buildT[];
  allowAddToBuild?: boolean;
  allowDelete?: boolean;
};
export default function BrowseCardWrapper({
  currentPage,
  allbuids,
  allowAddToBuild,
  allowDelete,
}: BrowseCardWrapperProps) {
  const [data, setData] = useState<any>([]);
  const userSelectedItem = useAdminStore((state) => state.userSelectedCategory);

  useEffect(() => {
    const fetchData = async () => {
      const partsData = await giveAllParts(currentPage, userSelectedItem);

      if (partsData) {
        setData(partsData);
      }
    };

    fetchData();
  }, [userSelectedItem, currentPage]);

  return (
    <>
      <div className="flex  gap-x-6 flex-wrap w-full justify-between  items-center">
        {data ? (
          data?.map((item: any) => {
            return (
              <BrowseCard
                partId={item._id.toString()}
                builds={allbuids}
                name={item.name}
                price={item.price}
                category={item.category}
                key={item._id}
                image={item.image}
                allowAddToBuild={allowAddToBuild}
                allowDelete={allowDelete}
              />
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    </>
  );
}
