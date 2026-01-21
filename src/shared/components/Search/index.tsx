import { Search } from "lucide-react";
import { memo, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../helper/debounceFunc";
import type { RootState } from "../../../app/store";
import { setUserSearch } from "../../lib/features/searchSlice";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const reduxValue = useSelector((state: RootState) => state.search.userSearch);

  const [localValue, setLocalValue] = useState(reduxValue);

  useEffect(() => {
    setLocalValue(reduxValue);
  }, [reduxValue]);

  const debouncedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setUserSearch(value));
      }, 800),
    [dispatch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    debouncedDispatch(value);
  };

  const handleClear = () => {
    setLocalValue("");
    dispatch(setUserSearch(""));
  };

  return (
    <div className="w-full flex items-center gap-2.5 border border-[#e8e9eb] py-3 pl-4 pr-3 rounded-2xl dark:bg-[#1f222b] dark:border-0 dark:text-white">
      <Search className="w-5 h-5" color="#5C6269" />
      <input
        type="text"
        placeholder="Search"
        value={localValue}
        onChange={handleChange}
        className="outline-none flex-1 bg-transparent dark:bg-transparent"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="text-helpertext hover:text-maintext transition-colors"
          aria-label="Clear search"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default memo(SearchInput);
