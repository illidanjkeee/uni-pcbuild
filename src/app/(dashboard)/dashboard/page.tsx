import { AdminVerification } from "@/components/admin-verification";
import getOrders from "@/actions/get-orders";
import StatCard from "@/components/stat-card";
import GradientText from "@/components/gradient-text";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nanoid } from "nanoid";
import giveStatusColor from "@/lib/give-status-color";
import AdminDeleteOrder from "@/components/admin-delete-order";
import AdminChangeStatusDD from "@/components/admin-change-status-dd";

import Link from "next/link";
export const metadata = {
  title: "dashboard",
};

export default async function Dashboard() {
  const data = await getOrders();

  const shippedOrdersCount = data?.filter(
    (order: any) => order.status === "shipped"
  ).length;

  const checkedOrdersCount = data?.filter(
    (order: any) => order.status === "checkout"
  ).length;

  const approvedOrdersCount = data?.filter(
    (order: any) => order.status === "approved"
  ).length;

  const rejectedOrdersCount = data?.filter(
    (order: any) => order.status === "rejected"
  ).length;

  return (
    <>
      <AdminVerification />
      <div className="bg-slate-950 w-full px-8 pt-3">
        <GradientText className="text-5xl">Orders</GradientText>

        <div className="w-full flex-col flex justify-center items-center mt-16 gap-8 ">
          <div className="flex w-full justify-center items-center ">
            <div className=" flex w-[90%] gap-6  justify-start  items-center flex-wrap ">
              <StatCard
                look="bg-yellow-400"
                title="shipped"
                value={shippedOrdersCount?.toString()}
              />
              <StatCard
                title="Checked out"
                look="bg-blue-800"
                value={checkedOrdersCount?.toString()}
              />
              <StatCard
                look="bg-lime-500"
                title="Approved"
                value={approvedOrdersCount?.toString()}
              />
              <StatCard
                look="bg-red-700"
                title="Rejected"
                value={rejectedOrdersCount?.toString()}
              />
            </div>
          </div>

          <div className=" flex w-[90%] overflow-y-auto overflow-x-auto ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">email</TableHead>
                  <TableHead>build name</TableHead>
                  <TableHead>status</TableHead>
                  <TableHead>Amount</TableHead>

                  <TableHead>Delete</TableHead>
                  <TableHead>Change Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item: any) => (
                  <TableRow key={nanoid()}>
                    <TableCell className="font-medium">{item.mail}</TableCell>
                    <Link
                      href={`/builds/${item.buildID}?view-only=true`}
                      className="flex justify-start pt-2 items-start "
                    >
                      <TableCell>
                        <span className="border-b border-b-white pb-[0.125rem]">
                          {item.buildName}
                        </span>
                      </TableCell>
                    </Link>
                    <TableCell className={`${giveStatusColor(item.status)}`}>
                      {item.status}
                    </TableCell>
                    <TableCell className="font-medium text-mono">
                      {item.bill}$
                    </TableCell>
                    <TableCell>
                      <AdminDeleteOrder buildID={item.buildID} />
                    </TableCell>
                    <TableCell>
                      <AdminChangeStatusDD buildID={item.buildID} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
