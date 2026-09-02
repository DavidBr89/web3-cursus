#!/usr/bin/env python3
"""One-off migration helper: converts the web3-cursus-site AsciiDoc pages to Docusaurus MDX.

Usage: python3 tools/convert_adoc.py
Reads from ../web3-cursus-site/modules/ROOT/pages, writes into docs/.
"""
import re
import shutil
from pathlib import Path

SRC = Path(__file__).resolve().parents[2] / "web3-cursus-site" / "modules" / "ROOT" / "pages"
IMG_SRC = Path(__file__).resolve().parents[2] / "web3-cursus-site" / "modules" / "ROOT" / "images"
DOCS = Path(__file__).resolve().parents[1] / "docs"
STATIC_IMG = Path(__file__).resolve().parents[1] / "static" / "img"

# basename (as used in xref:) -> absolute docusaurus route
ROUTE_MAP = {
    "01-introductie.adoc": "/",
    "02-typescript.adoc": "/typescript",
    "03-es6+.adoc": "/es6-plus",
    "04-react.adoc": "/react/",
    "0401-components.adoc": "/react/components",
    "0402-state.adoc": "/react/state",
    "0403-interactivity.adoc": "/react/interactivity",
    "0404-hooks.adoc": "/react/hooks",
    "0405-react-router.adoc": "/react/router",
    "0406-react-hook-form.adoc": "/react/hook-form",
    "0407-axios.adoc": "/react/axios",
    "0408-react-query.adoc": "/react/query",
    "05-moderne-javascript-en-async.adoc": "/modern-js-async",
}
for i in range(1, 13):
    ROUTE_MAP[f"semesterproject/week-{i:02d}.adoc"] = f"/semesterproject/week-{i:02d}"
ROUTE_MAP["semesterproject/index.adoc"] = "/semesterproject/"

ADMONITION_TYPE = {
    "NOTE": "note",
    "TIP": "tip",
    "IMPORTANT": "info",
    "WARNING": "warning",
    "CAUTION": "danger",
}

XREF_RE = re.compile(r"xref:(\.\./)?([\w\-\+./]+\.adoc)\[([^\]]*)\]")
URL_RE = re.compile(r"(https?://\S+?)\[([^\]]*)\]")


def resolve_xref(m):
    basename = m.group(2)
    label = m.group(3)
    key = basename if "/" in basename else basename
    # normalize possible "../semesterproject/x" not needed since only "../NN-x.adoc" used from within semesterproject/
    route = ROUTE_MAP.get(key) or ROUTE_MAP.get("semesterproject/" + basename)
    if route is None:
        route = "/" + basename.replace(".adoc", "")
    if not label:
        label = route
    return f"[{label}]({route})"


def resolve_url(m):
    url, label = m.groups()
    label = label.split(",")[0].strip() if label else url
    return f"[{label}]({url})"


def inline_transform(line):
    line = XREF_RE.sub(resolve_xref, line)
    line = URL_RE.sub(resolve_url, line)
    # bold: *word* -> **word** (skip lines that are list markers, handled earlier)
    line = re.sub(r"(?<!\*)\*([^\n*]+?)\*(?!\*)", r"**\1**", line)
    return line


def convert_image(line):
    m = re.match(r"^image::?(\S+)\[(.*)\]$", line.strip())
    if not m:
        return None
    path, attrs = m.groups()
    parts = [p.strip() for p in attrs.split(",")] if attrs else []
    alt = parts[0] if len(parts) > 0 and parts[0] else ""
    # Markdown image syntax so Docusaurus resolves the baseUrl automatically
    # (raw <img src="/..."> tags are not baseUrl-aware).
    return f"![{alt}](/img/{path})"


def strip_callout(line):
    return re.sub(r"\s*<(\d+)>\s*$", r"  // (\1)", line)


def convert_table(lines, cols):
    # lines are the raw rows between |=== markers; a line may contain multiple
    # "|cell" segments, and a cell may continue onto following non-"|" lines.
    cells = []
    buf = None
    for raw in lines:
        stripped = raw.strip()
        if not stripped:
            continue
        if stripped.startswith("|"):
            segments = stripped.split("|")[1:]
            for seg in segments:
                if buf is not None:
                    cells.append(buf.strip())
                buf = seg
        elif buf is not None:
            buf += " " + stripped
    if buf is not None:
        cells.append(buf.strip())
    rows = [cells[i : i + cols] for i in range(0, len(cells), cols)]
    if not rows:
        return []
    rows = [[inline_transform(c) for c in row] for row in rows]
    out = []
    header = rows[0]
    out.append("| " + " | ".join(header) + " |")
    out.append("| " + " | ".join(["---"] * cols) + " |")
    for r in rows[1:]:
        r = r + [""] * (cols - len(r))
        out.append("| " + " | ".join(r) + " |")
    return out


def convert_lines(lines):
    out = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        stripped = line.strip()

        # admonition block: [NOTE] / [TIP] / [WARNING] / [IMPORTANT] / [CAUTION]
        m = re.match(r"^\[(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]$", stripped)
        if m:
            adtype = ADMONITION_TYPE[m.group(1)]
            i += 1
            title = ""
            if i < n and lines[i].strip().startswith("."):
                title = lines[i].strip()[1:].strip()
                i += 1
            # expect ==== or -- opening (both are valid AsciiDoc block delimiters)
            if i < n and lines[i].strip() in ("====", "--"):
                delim = lines[i].strip()
                i += 1
                inner = []
                while i < n and lines[i].strip() != delim:
                    inner.append(lines[i])
                    i += 1
                i += 1  # skip closing delimiter
                header = f":::{adtype}" + (f" {title}" if title else "")
                out.append(header)
                out.extend(convert_lines(inner))
                out.append(":::")
                continue

        # collapsible block: [%collapsible]
        if stripped == "[%collapsible]":
            i += 1
            title = "Oplossing"
            if i < n and lines[i].strip().startswith("."):
                title = lines[i].strip()[1:].strip()
                i += 1
            if i < n and lines[i].strip() in ("====", "--"):
                delim = lines[i].strip()
                i += 1
                inner = []
                while i < n and lines[i].strip() != delim:
                    inner.append(lines[i])
                    i += 1
                i += 1
                out.append("<details>")
                out.append(f"<summary>{title}</summary>")
                out.append("")
                out.extend(convert_lines(inner))
                out.append("")
                out.append("</details>")
                continue

        # source block: [source,lang] or shorthand [,lang] followed by ---- ... ----
        m = re.match(r"^\[source,?\s*(\w*)[^\]]*\]$", stripped) or re.match(r"^\[,(\w*)\]$", stripped)
        if m:
            lang = m.group(1) or "text"
            i += 1
            if i < n and lines[i].strip() == "----":
                i += 1
                code = []
                while i < n and lines[i].strip() != "----":
                    code.append(lines[i])
                    i += 1
                i += 1  # skip closing ----
                # collect trailing callout explanations: "<1> text"
                explanations = []
                while i < n and re.match(r"^<(\d+)>\s+", lines[i]):
                    explanations.append(re.sub(r"^<(\d+)>\s+", "", lines[i]).rstrip())
                    i += 1
                code = [strip_callout(c) for c in code]
                out.append(f"```{lang}")
                out.extend(code)
                out.append("```")
                if explanations:
                    out.append("")
                    for idx, exp in enumerate(explanations, 1):
                        out.append(f"{idx}. {exp}")
                continue

        # table
        m = re.match(r'^\[cols="([\d,]+)"[^\]]*\]$', stripped)
        if m:
            cols = len(m.group(1).split(","))
            i += 1
            if i < n and lines[i].strip() == "|===":
                i += 1
                rows = []
                while i < n and lines[i].strip() != "|===":
                    rows.append(lines[i])
                    i += 1
                i += 1
                out.extend(convert_table(rows, cols))
                out.append("")
                continue

        # skip pure attribute lines like [.text-center]
        if re.match(r"^\[\.[\w-]+\]$", stripped):
            i += 1
            continue

        # image
        img = convert_image(line)
        if img is not None:
            out.append(img)
            i += 1
            continue

        # headings (==, ===, ====, =====)
        m = re.match(r"^(=={1,4})\s+(.*)$", stripped)
        if m:
            level = len(m.group(1))
            out.append("#" * level + " " + inline_transform(m.group(2)))
            i += 1
            continue

        # inline admonitions: NOTE: text
        m = re.match(r"^(NOTE|TIP|WARNING|IMPORTANT|CAUTION):\s*(.*)$", stripped)
        if m:
            adtype = ADMONITION_TYPE[m.group(1)]
            out.append(f":::{adtype}")
            out.append(inline_transform(m.group(2)))
            out.append(":::")
            i += 1
            continue

        # description list: Term:: definition
        m = re.match(r"^([^:\n]+?)::\s+(.*)$", line)
        if m and "://" not in line[: line.index("::")]:
            out.append(f"**{inline_transform(m.group(1))}**: {inline_transform(m.group(2))}")
            i += 1
            continue

        # unordered list: * item / ** item
        m = re.match(r"^(\*+)\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            out.append("  " * (level - 1) + "- " + inline_transform(m.group(2)))
            i += 1
            continue

        # ordered list: . item / .. item
        m = re.match(r"^(\.+)\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            out.append("  " * (level - 1) + "1. " + inline_transform(m.group(2)))
            i += 1
            continue

        out.append(inline_transform(line))
        i += 1
    return out


def convert_file(rel_path: str, target_path: Path, sidebar_position: int):
    text = (SRC / rel_path).read_text(encoding="utf-8")
    lines = text.splitlines()
    title = "Untitled"
    if lines and lines[0].startswith("= "):
        title = lines[0][2:].strip()
        lines = lines[1:]
    body = convert_lines(lines)
    frontmatter = ["---", f'title: "{title}"', f"sidebar_position: {sidebar_position}", "---", ""]
    target_path.parent.mkdir(parents=True, exist_ok=True)
    target_path.write_text("\n".join(frontmatter + body) + "\n", encoding="utf-8")
    print(f"wrote {target_path}")


FILES = [
    ("02-typescript.adoc", DOCS / "typescript.mdx", 2),
    ("03-es6+.adoc", DOCS / "es6-plus.mdx", 3),
    ("04-react.adoc", DOCS / "react" / "index.mdx", 1),
    ("0401-components.adoc", DOCS / "react" / "components.mdx", 2),
    ("0402-state.adoc", DOCS / "react" / "state.mdx", 3),
    ("0405-react-router.adoc", DOCS / "react" / "router.mdx", 5),
    ("0406-react-hook-form.adoc", DOCS / "react" / "hook-form.mdx", 6),
    ("0407-axios.adoc", DOCS / "react" / "axios.mdx", 7),
    ("0408-react-query.adoc", DOCS / "react" / "query.mdx", 8),
    ("05-moderne-javascript-en-async.adoc", DOCS / "modern-js-async.mdx", 4),
    ("semesterproject/index.adoc", DOCS / "semesterproject" / "index.mdx", 0),
]
for i in range(1, 13):
    FILES.append(
        (
            f"semesterproject/week-{i:02d}.adoc",
            DOCS / "semesterproject" / f"week-{i:02d}.mdx",
            i,
        )
    )

if __name__ == "__main__":
    for rel_path, target, pos in FILES:
        convert_file(rel_path, target, pos)

    # copy all images referenced (whole images dir, simplest)
    STATIC_IMG.mkdir(parents=True, exist_ok=True)
    if IMG_SRC.exists():
        for item in IMG_SRC.iterdir():
            dest = STATIC_IMG / item.name
            if item.is_dir():
                shutil.copytree(item, dest, dirs_exist_ok=True)
            else:
                shutil.copy2(item, dest)
    print("done")
