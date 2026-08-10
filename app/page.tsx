"use client";

import { useMemo, useRef, useState } from "react";
import { AlertTriangle, Check, ChevronDown, Clipboard, Download, FileText, Info, Lock, Monitor, Sparkles, Upload, Volume2, WandSparkles } from "lucide-react";
import { demoAnalysis, SAMPLE_CONTENT } from "@/lib/demo";
import type { Analysis, Severity } from "@/lib/types";

const severityLabel: Record<Severity, string> = { high: "High", medium: "Medium", low: "Low" };

export default function Home() {
  const [content, setContent] = useState(SAMPLE_CONTENT);
  const [audience, setAudience] = useState("Community members");
  const [language, setLanguage] = useState("English (US)");
  const [fileName, setFileName] = useState("community-food-drive.jpg");
  const [mode, setMode] = useState<"demo" | "live">("demo");
  const [analysis, setAnalysis] = useState<Analysis>(() => demoAnalysis({ content: SAMPLE_CONTENT, audience, language, hasImage: true }));
  const [tab, setTab] = useState<"altText" | "easyToRead" | "accessibleRewrite">("altText");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const output = analysis[tab];
  const issuesBySeverity = useMemo(() => ["high", "medium", "low"].map(severity => ({
    severity: severity as Severity,
    items: analysis.issues.filter(issue => issue.severity === severity),
  })).filter(group => group.items.length), [analysis]);

  async function analyze() {
    if (content.trim().length < 10) { setNotice("Add at least 10 characters to analyze."); return; }
    setLoading(true); setNotice("");
    const payload = { content, audience, language, hasImage: Boolean(fileName) };
    try {
      if (mode === "demo") {
        await new Promise(resolve => setTimeout(resolve, 650));
        setAnalysis(demoAnalysis(payload));
      } else {
        const response = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Analysis failed");
        setAnalysis(data);
      }
      setNotice("Analysis complete. Review the prioritized fixes.");
    } catch (error) {
      setNotice(`${error instanceof Error ? error.message : "Analysis failed"} Switched to demo results.`);
      setMode("demo"); setAnalysis(demoAnalysis(payload));
    } finally { setLoading(false); }
  }

  function copy(text = analysis.accessibleRewrite) {
    navigator.clipboard.writeText(text);
    setNotice("Copied to clipboard.");
  }

  function download(name: string, text: string) {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url);
    setNotice(`${name} downloaded.`);
  }

  function speak() {
    speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(output));
  }

  return <main className="app-shell">
    <header className="topbar">
      <a className="brand" href="#workspace" aria-label="Accessly home">Accessly</a>
      <nav aria-label="Workflow"><a href="#input"><Upload />Upload</a><a className="active" href="#results"><Info />Analyze</a><a href="#fix"><WandSparkles />Fix</a><a href="#compare"><FileText />Compare</a><a href="#export"><Download />Export</a></nav>
      <label className="mode-control"><Monitor /><span className="sr-only">Analysis mode</span><select value={mode} onChange={e => setMode(e.target.value as "demo" | "live")}><option value="demo">Demo mode</option><option value="live">Live AI</option></select><ChevronDown /></label>
    </header>

    <div className="workspace" id="workspace">
      <aside className="input-rail" id="input" aria-labelledby="input-title">
        <h1 id="input-title">Make every message<br />easier to access</h1>
        <label className="field-label" htmlFor="content">Marketing content <Info aria-hidden="true" /></label>
        <textarea id="content" value={content} onChange={e => setContent(e.target.value)} maxLength={12000} />
        <div className="counter">{content.length}/12000</div>

        <span className="field-label">Upload an image or document</span>
        <button className="dropzone" type="button" onClick={() => fileRef.current?.click()}><Upload /><strong>{fileName || "Drag and drop files here"}</strong><span>{fileName ? "Click to replace" : "or click to browse"}</span><small>PNG, JPG, PDF, DOCX (max 10MB)</small></button>
        <input ref={fileRef} className="sr-only" type="file" accept="image/png,image/jpeg,.pdf,.docx" onChange={e => setFileName(e.target.files?.[0]?.name || "")} />

        <label className="field-label" htmlFor="audience">Audience <Info aria-hidden="true" /></label>
        <select id="audience" value={audience} onChange={e => setAudience(e.target.value)}><option>Community members</option><option>Customers</option><option>Students and families</option><option>Donors and volunteers</option></select>
        <label className="field-label" htmlFor="language">Language <Info aria-hidden="true" /></label>
        <select id="language" value={language} onChange={e => setLanguage(e.target.value)}><option>English (US)</option><option>Thai</option><option>Spanish</option></select>
        <button className="primary analyze" type="button" onClick={analyze} disabled={loading}><Sparkles />{loading ? "Analyzing…" : "Analyze accessibility"}</button>
        <p className="privacy"><Lock />Your content is private and secure.</p>
      </aside>

      <section className="results" id="results" aria-live="polite">
        <div className="score-area">
          <div className="score-block"><h2>Accessibility score <Info /></h2><div className="score-ring" style={{"--score": `${analysis.score * 3.6}deg`} as React.CSSProperties}><span><strong>{analysis.score}</strong><small>/100</small></span></div><b>{analysis.score >= 75 ? "Good" : "Needs work"}</b></div>
          <div className="issues"><div className="section-heading"><h2>Prioritized issues <Info /></h2><span>{analysis.issues.length} issues found</span></div>{issuesBySeverity.map(group => <div className={`issue-row ${group.severity}`} key={group.severity}><AlertTriangle /><strong>{severityLabel[group.severity]}</strong><div>{group.items.map(issue => <p key={issue.title}><b>{issue.title}</b><span>{issue.detail}</span></p>)}</div><em>{group.items.length}</em></div>)}</div>
        </div>

        <section className="fix-panel" id="fix">
          <div className="tabs" role="tablist" aria-label="Accessible outputs">
            {([['altText','Alt text'],['easyToRead','Easy-to-read'],['accessibleRewrite','Accessible rewrite']] as const).map(([key,label]) => <button role="tab" aria-selected={tab===key} key={key} onClick={() => setTab(key)}>{label}</button>)}
          </div>
          <div className="editor"><div className="editor-head"><label htmlFor="output">{tab === "altText" ? "Alt text for image (required)" : tab === "easyToRead" ? "Plain-language version" : "Accessible marketing rewrite"}</label><button onClick={() => copy(output)}><Clipboard />Copy</button></div><textarea id="output" value={output} onChange={e => setAnalysis({...analysis, [tab]: e.target.value})} /><div className="editor-footer"><span>{output.length} characters</span><button onClick={speak}><Volume2 />Preview with screen reader</button></div></div>
          <button className="primary apply" onClick={() => { setTab("accessibleRewrite"); setNotice("Recommended fixes applied to the comparison."); }}><WandSparkles />Apply fixes</button>
        </section>

        <section className="comparison" id="compare" aria-labelledby="compare-title"><h2 className="sr-only" id="compare-title">Before and after comparison</h2><article><header>Before <span className="status bad">Issues found</span></header><p>{content}</p></article><article><header>After <span className="status good"><Check />Improved</span></header><p>{analysis.accessibleRewrite}</p></article></section>

        <footer className="export-bar" id="export"><div role="status">{notice}</div><button onClick={() => copy()}><Clipboard />Copy</button><button onClick={() => download("accessly-rewrite.txt", analysis.accessibleRewrite)}><Download />Download .txt</button><button className="primary" onClick={() => download("accessly-report.txt", `ACCESSLY ACCESSIBILITY REPORT\n\nScore: ${analysis.score}/100\n${analysis.summary}\n\nISSUES\n${analysis.issues.map(i => `- [${i.severity.toUpperCase()}] ${i.title}: ${i.detail}`).join("\n")}\n\nACCESSIBLE REWRITE\n${analysis.accessibleRewrite}`)}><FileText />Export report</button></footer>
      </section>
    </div>
  </main>;
}
