import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link/router — used everywhere instead of next/link so an
// internal link from a French page stays on /fr/... automatically.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
