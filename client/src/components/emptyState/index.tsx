import React from "react";

interface EmptyStateProps {
  img: string;
  title: string;
  subtitle: string;
  children?: JSX.Element;
}

export function EmptyState({
  img,
  title,
  subtitle,
  children,
}: EmptyStateProps) {
  return (
    <section className="rounded-[3px] flex items-center justify-center py-[75px] flex-col">
      <img src={img} className="h-[250px] mb-[50px]" />
      <h3 className="font-bold">{title}</h3>
      <p className="text-[14px] mb-[20px]">{subtitle}</p>
      {children}
    </section>
  );
}
