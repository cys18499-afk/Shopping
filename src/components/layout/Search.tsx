"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { useSearch } from "@/src/hooks/useSearch";
import { useRouter } from "next/navigation";

const POPULAR_KEYWORDS = ["베이직", "오버핏", "빈티지", "반팔", "티셔츠"];
export default function Search() {
  const router = useRouter();

  const {
    isOpen,
    setIsOpen,
    keyword,
    setKeyword,
    containerRef,
    inputRef,
    handleSearch,
    handleResetKeyword,
    items,
    remove,
    clearAll,
  } = useSearch();

  const onSearchSubmit = (e: React.FormEvent) => {
    handleSearch(e, keyword);
  };

  const search = (text: string) => {
    router.push(`/search?q=${text}`);
    setIsOpen(false);
  };

  return (
    <div className="relative " ref={containerRef}>
      <button
        type="button"
        aria-label="검색창 열기"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex flex-col items-center gap-0.5"
      >
        <SearchIcon className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block cursor-pointer">
          Search
        </span>
      </button>

      {isOpen && (
        <div className="fixed right-0 top-0 w-full border-t z-100 border-b border-gray-200 bg-white p-10">
          <div className="inner">
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

            <div className="inner flex gap-4">
              <div className="flex-3">
                <div className="flex gap-2 w-full pb-5">
                  <span className="text-[16px] font-medium">최근 검색어</span>
                  {items.length > 0 && (
                    <button
                      className="cursor-pointer text-[12px] underline text-gray-500 hover:text-black"
                      onClick={clearAll}
                    >
                      전체삭제
                    </button>
                  )}
                </div>
                {items.length ? (
                  <div className="flex gap-1.5 flex-wrap pb-2">
                    {" "}
                    {items.map((item) => (
                      <div key={item.id} className="shrink-0">
                        <div
                          className="text-[14px] flex items-center border border-gray-500 cursor-pointer px-2 py-1"
                          onClick={() => search(item.text)}
                        >
                          <span className="truncate max-w-[100px] inline-block align-middle">
                            {item.text}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(item.id);
                            }}
                            className="ml-1 shrink-0"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[13px] text-gray-400">
                    최근 검색어가 없습니다.
                  </span>
                )}
              </div>

              <div className="flex-2 ">
                <div className="pb-5">
                  <span className="text-[16px] font-medium">인기 검색어</span>
                </div>

                <ul className="grid grid-flow-col grid-rows-5 gap-x-7 gap-y-2">
                  {POPULAR_KEYWORDS.map((text, i) => (
                    <li
                      key={text}
                      onClick={(e) => {
                        search(text);
                        handleSearch(e, text);
                      }}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 hover:bg-gray-50 ">
                        <span className="w-4 h-4 bg-black text-white text-[11px] flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-[14px]">{text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
