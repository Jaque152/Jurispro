"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:rounded-none group-[.toaster]:border group-[.toaster]:border-ink/20 group-[.toaster]:bg-ink group-[.toaster]:text-paper group-[.toaster]:font-mono group-[.toaster]:text-[10px] group-[.toaster]:uppercase group-[.toaster]:tracking-[0.16em] group-[.toaster]:shadow-[0_18px_50px_-24px_rgba(26,20,22,0.7)]",
          description:
            "group-[.toast]:font-body group-[.toast]:text-[13px] group-[.toast]:normal-case group-[.toast]:tracking-normal group-[.toast]:text-paper/60",
          actionButton:
            "group-[.toast]:rounded-none group-[.toast]:bg-claret group-[.toast]:text-paper",
          cancelButton:
            "group-[.toast]:rounded-none group-[.toast]:bg-paper/10 group-[.toast]:text-paper/70",
          icon: "group-[.toast]:text-blush",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
