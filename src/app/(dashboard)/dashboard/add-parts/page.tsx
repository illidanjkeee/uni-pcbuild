import AddPartsPage from "@/components/add-parts-page";
import { AdminSelectCategory } from "@/components/admin-select-category";
import { Button } from "@/components/ui/button";
import { AdminVerification } from "@/components/admin-verification";
export const metadata = {
  title: "dashboard",
};
export default function AddParts() {
  return (
    <>
      <div className="w-full bg-slate-950 px-8 py-4">
        <AdminVerification></AdminVerification>
        <AddPartsPage></AddPartsPage>
      </div>
    </>
  );
}
