import CategoryTabs from "./category-tabs";
import CurrencySwitcher from "./currencySwitcher";
import FilterButton from "./filter-button";

export default function DealActions() {
  return (
    <div className="border-BlueGray-200 flex-between w-full border-b">
      <CategoryTabs />
      <div className="flex items-center justify-end gap-3">
        <CurrencySwitcher />
        <FilterButton />
      </div>
    </div>
  );
}
