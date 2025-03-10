import connectdb from "@/lib/connectdb";
import Admin from "@/schemas/server/admin-server-schema";
export default async function getOrders() {
  try {
    await connectdb();
    const admin = await Admin.findOne({ name: "Aaron" });

    return admin.orders;
  } catch (error) {
    console.log(error);
  }
}
