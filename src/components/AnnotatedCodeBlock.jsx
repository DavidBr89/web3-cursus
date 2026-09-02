import React from "react";
import CodeBlock from "@theme/CodeBlock";

const NOTE_PATTERN = /\s*\/\/\s*\[!note\s+(.+?)\]\s*$/;

function normalizeCode(children) {
  return String(children).replace(/^\n/, "").replace(/\n\s*$/, "");
}

function extractCode(node) {
  if (typeof node === "string") return {code: node};
  if (Array.isArray(node)) {
    for (const child of node) {
      const result = extractCode(child);
      if (result?.code?.trim()) return result;
    }
    return {code: ""};
  }
  if (!React.isValidElement(node)) return {code: ""};

  const nested = extractCode(node.props.children);
  const languageClass = node.props.className?.match(/language-([\w-]+)/)?.[1];
  return {code: nested.code, language: languageClass ?? nested.language};
}

function NoteText({text}) {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith("`") && part.endsWith("`")
      ? <code key={index}>{part.slice(1, -1)}</code>
      : part,
  );
}

export default function AnnotatedCodeBlock({children, language, title, showLineNumbers = false}) {
  const extracted = extractCode(children);
  const notes = [];
  const code = normalizeCode(extracted.code)
    .split("\n")
    .map((line) => {
      const match = line.match(NOTE_PATTERN);
      if (!match) return line;

      const number = notes.length + 1;
      notes.push({number, text: match[1]});
      return line.replace(NOTE_PATTERN, ` // [${number}]`);
    })
    .join("\n");

  return (
    <div className="annotatedCode">
      <CodeBlock language={language ?? extracted.language ?? "javascript"} title={title} showLineNumbers={showLineNumbers}>
        {code}
      </CodeBlock>
      {notes.length > 0 && (
        <ol className="annotatedCode__notes" aria-label="Uitleg bij de code">
          {notes.map(({number, text}) => (
            <li key={number} className="annotatedCode__note">
              <span className="annotatedCode__marker" aria-hidden="true">{number}</span>
              <span><NoteText text={text} /></span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
