import { Search } from "lucide-react";
import { memo } from "react";

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value = "", onChange }) => {
  return (
    <div className="w-full flex gap-2.5 border border-[#e8e9eb] py-3 pl-4 rounded-2xl">
      <Search className="w-5 h-5" color="#5C6269" />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="outline-none flex-1"
      />
    </div>
  );
};

export default memo(SearchInput);
