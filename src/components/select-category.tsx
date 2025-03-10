"use client";
import { useAdminStore } from "@/stores/admin-store";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { CategoriesT } from "@/types/categories-type";
type SelectCategoryPropsT = {
  purpose: "generateForm" | "adminFiltration" | "userFiltration";
};
export default function SelectCategory({ purpose }: SelectCategoryPropsT) {
  const setAdminSelectedCategory = useAdminStore(
    (state) => state.setAdminSelectedCategory
  );
  const setUserSelectedCategory = useAdminStore(
    (state) => state.setUserSelectedCategory
  );
  const setAdminSelectedCategoryForFilter = useAdminStore(
    (state) => state.setAdminSelectedCategoryForFilter
  );

  const setAppropriateGlobalState = (part: CategoriesT["categories"]) => {
    if (purpose === "adminFiltration") {
      setAdminSelectedCategoryForFilter(part);
      return;
    }
    if (purpose === "generateForm") {
      setAdminSelectedCategory(part);
      return;
    }
    if (purpose === "userFiltration") {
      setUserSelectedCategory(part);
    }
  };

  const handleCaseSelection = () => {
    setAppropriateGlobalState("case");
  };
  const handleCpuSelection = () => {
    setAppropriateGlobalState("Cpu");
  };
  const handleCpuCoolerSelection = () => {
    setAppropriateGlobalState("cpu-cooler");
  };
  const handleMemorySelection = () => {
    setAppropriateGlobalState("memory");
  };
  const handleMotherboardSelection = () => {
    setAppropriateGlobalState("motherboard");
  };
  const handleGraphicsCardSelection = () => {
    setAppropriateGlobalState("graphics-card");
  };
  const handleFansSelection = () => {
    setAppropriateGlobalState("fans");
  };
  const handleStorageSelection = () => {
    setAppropriateGlobalState("storage");
  };
  const handlePowerSupplySelection = () => {
    setAppropriateGlobalState("power-supply");
  };
  const handleNetworkCardSelection = () => {
    setAppropriateGlobalState("network-card");
  };
  const handleNoneSelection = () => {
    setAppropriateGlobalState("none");
  };
  return (
    <>
      <div>
        <DropdownMenuItem onSelect={handleCaseSelection}>Case</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleCpuSelection}>CPU</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleCpuCoolerSelection}>
          Cpu cooler
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleMemorySelection}>
          memory
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleMotherboardSelection}>
          motherboard
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleGraphicsCardSelection}>
          graphics card
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleFansSelection}>fans</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleStorageSelection}>
          storage
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handlePowerSupplySelection}>
          power supply
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleNetworkCardSelection}>
          network card
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleNoneSelection}>none</DropdownMenuItem>
      </div>
    </>
  );
}
