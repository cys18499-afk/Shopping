"use client";
import { useSearch } from "@/src/hooks/useSearch";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function SearchBar({
  initialKeyword = "",
}: {
  initialKeyword: string;
}) {
  const { keyword, setKeyword, handleSearch, inputRef, handleResetKeyword } =
    useSearch();

  const onSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSearch(e, keyword);
    },
    [keyword, handleSearch],
  );

  useEffect(() => {
    if (initialKeyword) {
      setKeyword(initialKeyword);
    }
  }, [initialKeyword, setKeyword]);

  return (
    <form onSubmit={onSearchSubmit}>
      <div className="w-[700px] left-1/2 -translate-x-1/2 relative flex items-center gap-3 pb-10">
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="어떤 상품을 찾으시나요?"
          className="w-full bg-transparent outline-none text-sm font-medium border-b pb-3"
        />
        <button
          type="button"
          onClick={() => handleResetKeyword()}
          disabled={!keyword.trim()}
          className="absolute right-0 font-bold  pb-3 cursor-pointer"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}
