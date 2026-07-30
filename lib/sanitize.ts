import DOMPurify from "isomorphic-dompurify";

/**
 * Post bodies arrive as HTML from the browser-side editor, so they are attacker
 * controlled by definition. Everything written to `posts.body_html` goes
 * through here first — the public page renders it with dangerouslySetInnerHTML.
 */
const ALLOWED_TAGS = [
  "p", "br", "hr",
  "h2", "h3", "h4",
  "strong", "b", "em", "i", "u", "s", "mark",
  "ul", "ol", "li",
  "blockquote",
  "a",
  "img",
  "code", "pre",
  "figure", "figcaption",
  "span",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "title", "width", "height", "class"];

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty ?? "", {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Block javascript:/data: URLs; allow only real links and images.
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/|#)/i,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input"],
    FORBID_ATTR: ["style", "onerror", "onload", "onclick", "srcset", "formaction"],
    KEEP_CONTENT: true,
  });
}

/** Plain text fields (title, excerpt, alt) — strip markup entirely. */
export function sanitizeText(dirty: string): string {
  return DOMPurify.sanitize(dirty ?? "", { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}
