import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

export interface RecentSearch {
  id: number;
  text: string;
}

export function useSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<RecentSearch[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("search-history");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setKeyword("");
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleClose]);

  const handleResetKeyword = () => {
    setKeyword("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearch = (e: React.FormEvent, keyword: string) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    save(keyword);
    router.push(`/search?q=${keyword}`);
    handleClose();
  };

  const save = useCallback((text: string) => {
    if (!text.trim()) return;

    setItems((prev) => {
      const filtered = prev.filter((item) => item.text !== text);
      const updated = [
        { id: Date.now(), text, date: new Date().toLocaleDateString() },
        ...filtered,
      ].slice(0, 10);
      localStorage.setItem("search-history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("search-history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    localStorage.removeItem("search-history");
    setItems([]);
  }, []);

  return {
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
  };
}
