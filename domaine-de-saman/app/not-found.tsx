// Last-resort fallback for paths that somehow don't match any locale
// segment at all — in normal use, app/[locale]/not-found.tsx handles this
// with full translated copy. This one deliberately has no dependency on
// the content system, since it may render outside any resolved locale.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "20vh 1.5rem" }}>
        <h1>This page doesn&apos;t exist.</h1>
        <p>
          <a href="/">Back to the homepage</a>
        </p>
      </body>
    </html>
  );
}
