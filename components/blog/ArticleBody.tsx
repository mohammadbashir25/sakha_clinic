/**
 * Renders the stored article string. Blocks are separated by a blank line and
 * a block starting with "## " is a heading. If your existing blog already has
 * a renderer for its stored format (HTML / Markdown), use it here instead.
 */
export default function ArticleBody({ content }: { content: string }) {
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 text-lg leading-8 text-[#18151b] rtl:leading-10">
      {blocks.map((block, i) =>
        block.startsWith("## ") ? (
          <h2
            key={i}
            className="!mt-12 font-serif text-2xl leading-snug text-[#320154] sm:text-3xl rtl:leading-snug"
          >
            {block.slice(3)}
          </h2>
        ) : (
          <p key={i}>{block}</p>
        ),
      )}
    </div>
  );
}
