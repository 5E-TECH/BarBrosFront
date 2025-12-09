import { Search } from "lucide-react";
import { memo } from "react";

const SearchInput = () => {
  return (
    <div className="w-full flex gap-2.5 border border-[#e8e9eb] py-3 pl-4 rounded-2xl">
      <Search className="w-5 h-5" color="#5C6269" />
      <input
        type="text"
        placeholder="Qidirish"
        className="outline-none flex-1"
      />
    </div>
  );
};

export default memo(SearchInput);
