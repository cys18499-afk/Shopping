"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const TABS = [
  { id: "info", label: "정보" },
  { id: "size", label: "사이즈" },
  { id: "review", label: "리뷰/후기" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ProductTabs({
  infoContent,
  sizeContent,
  reviewContent,
}: {
  infoContent: React.ReactNode;
  sizeContent: React.ReactNode;
  reviewContent: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("info");

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 100;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "auto" });
    }
    setActiveTab(id as TabId);
  };

  useEffect(() => {
    const sectionIds = ["info", "size", "review"];
    const sections = sectionIds.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id as TabId);
          }
        });
      },
      {
        rootMargin: "-10% 0px -40% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full mx-auto min-h-screen bg-white ">
      <nav className="flex sticky top-13 bg-white z-10 border-t border-b  border-gray-200 ">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleScroll(tab.id)}
            className={clsx(
              "flex-1 py-4 text-[13px] font-bold transition-all relative cursor-pointer",
              activeTab === tab.id
                ? "text-black"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <article className="transition-opacity duration-300 bg-white flex flex-col gap-9">
        <section id="info">{infoContent}</section>
        <section id="size">{sizeContent}</section>
        <section id="review">{reviewContent}</section>
      </article>
    </section>
  );
}
