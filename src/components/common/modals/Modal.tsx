"use client";

import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { HiXMark } from "react-icons/hi2";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  hasModalClass?: boolean;
  backdropBlur?: boolean;
  className?: string;
  padding?: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  hasModalClass = true,
  backdropBlur,
  padding = "p-4",
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMouseDownOnTarget = useRef<boolean>(false);

  useEffect(() => {
    // if (!isOpen) return;

    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth; // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  return (
    mounted &&
    createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal-backdrop"
            ref={modalRef}
            tabIndex={-1}
            onMouseDown={(e) => {
              if (
                e.target === e.currentTarget ||
                e.target === contentRef.current
              ) {
                isMouseDownOnTarget.current = true;
              } else {
                isMouseDownOnTarget.current = false;
              }
            }}
            onMouseUp={(e) => {
              if (
                (e.target === e.currentTarget ||
                  e.target === contentRef.current) &&
                isMouseDownOnTarget.current
              ) {
                onClose();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              hasModalClass ? "modal" : "",
              "fixed inset-0 z-[1000] flex items-center justify-center bg-black/60",
              backdropBlur ? "backdrop-blur-sm" : "",
              padding,
            )}
          >
            <div
              ref={contentRef}
              className={clsx("relative w-full flex justify-center", className)}
            >
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute right-0 top-0 z-10 p-2 text-gray-500"
                >
                  <HiXMark size={20} />
                </button>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.getElementById("portal-root") as HTMLDivElement,
    )
  );
}
