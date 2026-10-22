"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import LogoMark from "@/components/LogoMark";
import { getContent, defaultLocale } from "@/content";

export default function NotFound() {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : defaultLocale;
  const { pages } = getContent(locale);
  const { notFound } = pages;

  return (
    <main className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <LogoMark className="h-10 w-10 text-forest" />
      <h1 className="mt-6 font-display text-3xl text-forest md:text-4xl">{notFound.title}</h1>
      <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-grey">{notFound.body}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-sm bg-forest px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-cream transition-all hover:-translate-y-0.5 hover:bg-forest/90 hover:shadow-lg"
      >
        {notFound.backHome}
      </Link>
    </main>
  );
}
