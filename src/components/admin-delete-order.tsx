"use client";
import deleteOrder from "@/actions/admin-delete-order";
import { Button } from "@/components/ui/button";

export default function AdminDeleteOrder({ buildID }: { buildID: string }) {
  const handledeleteOrder = async () => {
    const res = await deleteOrder(buildID);
    console.log(res);
  };
  return (
    <>
      <Button
        variant="destructive"
        className="hover:scale-95"
        onClick={handledeleteOrder}
      >
        Delete
      </Button>
    </>
  );
}
