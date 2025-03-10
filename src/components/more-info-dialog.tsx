"use client";
import giveComponent from "@/actions/give-component";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type MoreInfoDialogPropsT = {
  partId: string;
  withImage: boolean;
  category: string;
};
export default function MoreInfoDialog({
  partId,
  withImage,
  category,
}: MoreInfoDialogPropsT) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await giveComponent(partId, category);
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, [partId]);

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <div className="pt-4 ">
          {data &&
            Object.entries(data).map(([key, value], index) => {
              if (key !== "image" && key !== "_id" && key !== "created_at") {
                return (
                  <p key={index} className="flex  justify-between ">
                    <span className="text-blue-500 mb-3">{key}:</span>
                    <span className="text-mono">{JSON.stringify(value)}</span>
                  </p>
                );
              }
              return null;
            })}
        </div>
      )}
    </>
  );
}
