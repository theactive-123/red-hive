"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Token = { text: string; color: string; italic?: boolean; weight?: number };

const KEYWORDS = new Set(
  (
    "const let var function return if else for while switch case break continue new class extends implements interface type " +
    "import export from default async await try catch finally throw public private protected readonly static this super " +
    "true false null undefined nil None True False void enum struct fn func go defer select chan package def lambda yield " +
    "in of as is not and or with pass raise elif self override final val fun when object data suspend package var some " +
    "SELECT FROM WHERE JOIN ON GROUP BY ORDER LIMIT CREATE TABLE INDEX PRIMARY KEY REFERENCES NOT NULL DEFAULT UNIQUE AND " +
    "AS CHECK INSERT INTO VALUES UPDATE SET DESC ASC SUM INTERVAL FROM WORKDIR COPY RUN CMD ENV ARG ENTRYPOINT EXPOSE " +
    "param resource Query Mutation type use match"
  ).split(" "),
);

const COLORS = {
  string: "#ff8fa3",
  comment: "#7a7f93",
  keyword: "#ffffff",
  number: "#ffb3c1",
  plain: "#c9cbd6",
};

/** Tiny line tokenizer: comments, strings, numbers, keywords, everything else. */
function tokenize(line: string): Token[] {
  const out: Token[] = [];
  const re =
    /(\/\/.*$|#(?![{%]).*$|--\s.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d[\d_.]*\b)|([A-Za-z_$][\w$]*)|(\s+)|([^\sA-Za-z_$\d"'`]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const [text, comment, str, num, word] = m;
    if (comment) out.push({ text, color: COLORS.comment, italic: true });
    else if (str) out.push({ text, color: COLORS.string });
    else if (num) out.push({ text, color: COLORS.number });
    else if (word) out.push(KEYWORDS.has(word) ? { text, color: COLORS.keyword, weight: 600 } : { text, color: COLORS.plain });
    else out.push({ text, color: COLORS.plain });
  }
  return out;
}

/** Tokenize every line and record each token's character offset (newlines count as one char). */
function layout(code: string) {
  const result: (Token & { start: number })[][] = [];
  let offset = 0;
  for (const line of code.split("\n")) {
    const row: (Token & { start: number })[] = [];
    for (const tk of tokenize(line)) {
      row.push({ ...tk, start: offset });
      offset += tk.text.length;
    }
    offset += 1;
    result.push(row);
  }
  return result;
}

export default function CodeWindow({ file, lang, code, className = "" }: { file: string; lang: string; code: string; className?: string }) {
  const lines = useMemo(() => layout(code), [code]);
  const total = code.length;
  const [shown, setShown] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- show everything immediately
      setShown(total);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (t: number) => {
          const n = Math.min(total, Math.floor(((t - start) / 1000) * 600));
          setShown(n);
          if (n < total) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [total]);

  const done = shown >= total;

  return (
    <div ref={root} className={`overflow-hidden rounded-lg bg-[#00020A] text-[13px] shadow-[0_30px_60px_-25px_rgba(0,2,10,0.6)] md:text-[14px] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto truncate pl-4 text-xs text-white/70">{file}</span>
        <span className="shrink-0 rounded bg-white/10 px-2 py-0.5 text-[11px] text-white/70">{lang}</span>
      </div>
      <div data-lenis-prevent className="overflow-x-auto py-4">
        <pre className="min-w-max leading-[1.7]" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
          <code>
            {lines.map((tokens, li) => (
              <div key={li} className="flex">
                <span className="w-10 shrink-0 select-none pr-4 text-right text-[#5D606C]">{li + 1}</span>
                <span className="pr-6">
                  {tokens.map((tk, ti) => {
                    const visible = Math.max(0, Math.min(tk.text.length, shown - tk.start));
                    const hidden = tk.text.slice(visible);
                    const caret = !done && tk.start <= shown && shown < tk.start + tk.text.length;
                    const style = { color: tk.color, fontStyle: tk.italic ? "italic" : undefined, fontWeight: tk.weight };
                    return (
                      <span key={ti} style={style}>
                        {tk.text.slice(0, visible)}
                        {caret && <Caret />}
                        {hidden && <span style={{ visibility: "hidden" }}>{hidden}</span>}
                      </span>
                    );
                  })}
                  {done && li === lines.length - 1 && <Caret />}
                  {"\u200b"}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function Caret() {
  return <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-pulse bg-[#E1013B]" />;
}
