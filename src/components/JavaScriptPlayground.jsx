import React, {useState} from "react";
import {Editor} from "react-live";
import {usePrismTheme} from "@docusaurus/theme-common";
import useIsBrowser from "@docusaurus/useIsBrowser";

function normalizeCode(children) {
  return String(children).replace(/^\n/, "").replace(/\n\s*$/, "");
}

function extractCode(node) {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) {
    return node.map(extractCode).find((code) => code.trim()) ?? "";
  }
  if (!React.isValidElement(node)) return "";
  return extractCode(node.props.children);
}

function formatValue(value) {
  if (typeof value === "string") return value;
  if (value instanceof Error) return `${value.name}: ${value.message}`;

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function JavaScriptPlayground({children}) {
  const initialCode = normalizeCode(extractCode(children));
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState([]);
  const prismTheme = usePrismTheme();
  const isBrowser = useIsBrowser();

  const run = async () => {
    const lines = [];
    const playgroundConsole = {
      log: (...values) => lines.push(values.map(formatValue).join(" ")),
      error: (...values) => lines.push(`Fout: ${values.map(formatValue).join(" ")}`),
      warn: (...values) => lines.push(`Waarschuwing: ${values.map(formatValue).join(" ")}`),
    };

    try {
      const execute = new Function("console", `return (async () => {\n${code}\n})();`);
      await execute(playgroundConsole);
    } catch (error) {
      lines.push(`${error.name}: ${error.message}`);
    }

    setOutput(lines.length > 0 ? lines : ["De code gaf geen uitvoer."]);
  };

  const reset = () => {
    setCode(initialCode);
    setOutput([]);
  };

  return (
    <div className="javascriptPlayground">
      <div className="javascriptPlayground__header">
        <span className="javascriptPlayground__windowButtons" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="javascriptPlayground__title">JavaScript · Live</span>
        <div className="javascriptPlayground__actions">
          <button type="button" className="button button--sm button--secondary" onClick={reset}>
            Herstellen
          </button>
          <button type="button" className="button button--sm button--primary" onClick={run}>
            Uitvoeren
          </button>
        </div>
      </div>
      <div
        className="javascriptPlayground__editor"
        role="region"
        aria-label="Bewerkbare JavaScript-code"
      >
        <Editor
          key={String(isBrowser)}
          code={code}
          language="javascript"
          theme={prismTheme}
          onChange={setCode}
          tabMode="indentation"
        />
      </div>
      <div className="javascriptPlayground__output" aria-live="polite">
        <strong>Uitvoer</strong>
        <pre>{output.length > 0 ? output.join("\n") : "Voer de code uit om het resultaat te bekijken."}</pre>
      </div>
    </div>
  );
}
