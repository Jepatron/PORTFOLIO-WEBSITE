import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and files with an extension (images,
  // the video/media files under public/media, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
