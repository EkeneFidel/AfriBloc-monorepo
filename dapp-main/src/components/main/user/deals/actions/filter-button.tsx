import { ChevronDown, Settings2, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import SelectField from "@/components/ui/form/select-field";
import { Button } from "@/components/ui/button";

const types = [
  { name: "All Status", value: "All" },
  { name: "Apartment", value: "apartment" },
  { name: "Townhouse", value: "town-house" },
];

export default function FilterButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-Gray-900 flex shrink-0 items-center gap-2">
          <Settings2 className="size-5" />
          <span className="text-sm font-medium">Filter</span>
          <ChevronDown className="size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60 min-w-0 rounded-lg px-4 py-0 sm:w-80 lg:mr-8">
        <div className="flex items-center justify-between gap-2 py-5">
          <span className="text-Cinder text-lg font-semibold">Filter</span>

          <PopoverClose asChild>
            <button>
              <X className="size-5" />
            </button>
          </PopoverClose>
        </div>
        <div className="relative w-full space-y-3">
          <SelectField
            className="!z-50 !h-[48px] w-full rounded-lg px-4"
            name="type"
            placeholder="Types"
            options={types.map((status) => ({
              name: status.name,
              value: status.value,
            }))}
          />
        </div>
        <div className="flex justify-end gap-3 py-5">
          <Button type="button" variant={"outline"} className="h-12 px-4">
            Clear filter
          </Button>

          <Button className="!bg-Orange-500 h-12">Apply filter</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
