import { Search } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../helper/debounceFunc";
import type { RootState } from "../../../app/store";
import { setUserSearch } from "../../lib/features/searchSlice";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const reduxValue = useSelector(
    (state: RootState) => state.search.userSearch
  );

  const [localValue, setLocalValue] = useState(reduxValue);

  const debouncedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setUserSearch(value));
      }, 800),
    [dispatch]
  );

  const handleChange = (value: string) => {
    setLocalValue(value);       // input tezkor ishlaydi
    debouncedDispatch(value);  // redux sekin saqlaydi
  };

  return (
    <div className="w-full flex gap-2.5 border border-[#e8e9eb] py-3 pl-4 rounded-2xl dark:bg-[#1f222b] dark:border-0 dark:text-white">
      <Search className="w-5 h-5" color="#5C6269" />
      <input
        type="text"
        placeholder="Search"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        className="outline-none flex-1"
      />
    </div>
  );
};

export default memo(SearchInput);
