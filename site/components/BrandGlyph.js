/* Four cells of a table, one highlighted: the product in one glyph. */
export default function BrandGlyph({ size = 22 }) {
  return (
    <svg
      className="brand-glyph"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.28" />
      <rect x="13" y="2" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.28" />
      <rect x="2" y="13" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.28" />
      <rect x="13" y="13" width="9" height="9" rx="2.5" fill="currentColor" />
    </svg>
  );
}
