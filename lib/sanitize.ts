import sanitizeHtmlLib from "sanitize-html";

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
  return sanitizeHtmlLib(dirty ?? "", {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      "*": ALLOWED_ATTR,
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      a: ["http", "https", "mailto", "tel"],
      img: ["http", "https", "data"],
    },
    disallowedTagsMode: "discard",
  });
}

/** Plain text fields (title, excerpt, alt) — strip markup entirely. */
export function sanitizeText(dirty: string): string {
  return sanitizeHtmlLib(dirty ?? "", {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  }).trim();
}

