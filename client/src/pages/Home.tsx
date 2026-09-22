import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  Command,
  Copy,
  Download,
  ExternalLink,
  Globe2,
  History,
  Keyboard,
  Menu,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  Star,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const starterQueries = [
  "Find me a calm dark-mode dashboard with great empty states",
  "Show me brutalist portfolios that still feel warm",
  "What are the best micro-interactions for a command palette?",
];

const results = [
  {
    tag: "PATTERN",
    title: "The Interface Index",
    url: "interfaceindex.dev / patterns / calm-systems",
    href: "https://interfaceindex.dev/patterns/calm-systems",
    description: "A field guide to restrained interfaces: soft surfaces, clear hierarchy, and motion that earns its keep.",
    accent: "violet",
    time: "2 min read",
  },
  {
    tag: "PLAYGROUND",
    title: "Linear-ish Command Menu",
    url: "ui.gallery / experiments / command-menu",
    href: "https://ui.gallery/experiments/command-menu",
    description: "Try 14 command palette patterns side-by-side. Keyboard-first, no modal fatigue, delightfully fast.",
    accent: "mint",
    time: "Interactive",
  },
  {
    tag: "FIELD NOTE",
    title: "Make it feel less like software",
    url: "notes.by-people / essays / soft-edges",
    href: "https://notes.by-people/essays/soft-edges",
    description: "A thoughtful essay on the small details that make a digital product feel authored by a human.",
    accent: "amber",
    time: "6 min read",
  },
];

function IconButton({ label, children, onClick, active = false }: { label: string; children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <button aria-label={label} title={label} onClick={onClick} className={`icon-button ${active ? "is-active" : ""}`}>
      {children}
    </button>
  );
}

function Logo() {
  return (
    <div className="brand-mark" aria-label="Glass Browser">
      <span className="brand-orb orb-a" />
      <span className="brand-orb orb-b" />
      <span className="brand-orb orb-c" />
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState(["Vibe Search"]);
  const [bookmarked, setBookmarked] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [panel, setPanel] = useState<"none" | "history" | "bookmarks" | "downloads">("none");
  const [isDark, setIsDark] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const activeTitle = tabs[activeTab] ?? "Vibe Search";
  const visibleResults = useMemo(() => submittedQuery ? results : results.slice(0, 2), [submittedQuery]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setPanel("none");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const runSearch = (value = query) => {
    if (!value.trim()) {
      searchRef.current?.focus();
      toast("Start with a feeling, a visual, or a specific problem.");
      return;
    }
    const trimmed = value.trim();
    const looksLikeUrl = /^https?:\/\//i.test(trimmed) || (/^[\w-]+\.[a-z]{2,}/i.test(trimmed) && !trimmed.includes(" "));
    if (looksLikeUrl) {
      window.location.href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      return;
    }
    setQuery(value);
    setSubmittedQuery(value.trim());
    setTabs((current) => current.map((tab, index) => index === activeTab ? value.trim().slice(0, 22) : tab));
    toast.success("Vibe captured", { description: "Curating a sharper set of references for you." });
  };

  const addTab = () => {
    setTabs((current) => [...current, "New tab"]);
    setActiveTab(tabs.length);
    setSubmittedQuery("");
    setQuery("");
  };

  const action = (message: string) => toast(message, { description: "This control is ready for your next build." });

  return (
    <main className="browser-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className="browser-window">
        <header className="window-topbar">
          <div className="traffic-lights" aria-hidden="true"><span /><span /><span /></div>
          <div className="tab-strip">
            {tabs.map((tab, index) => (
              <button key={`${tab}-${index}`} className={`tab ${activeTab === index ? "tab-active" : ""}`} onClick={() => setActiveTab(index)}>
                <span className="tab-favicon"><Globe2 size={13} /></span>
                <span>{tab}</span>
                {tabs.length > 1 && <X size={13} className="tab-close" onClick={(e) => { e.stopPropagation(); setTabs((all) => all.filter((_, i) => i !== index)); setActiveTab(Math.max(0, index - 1)); }} />}
              </button>
            ))}
            <button className="new-tab" onClick={addTab} aria-label="New tab"><Plus size={16} /></button>
          </div>
          <div className="window-actions">
            <IconButton label="Toggle theme" onClick={() => setIsDark(!isDark)}><span className="theme-dot" /></IconButton>
            <IconButton label="More options" onClick={() => setCommandOpen(true)}><MoreHorizontal size={17} /></IconButton>
          </div>
        </header>

        <div className="browser-toolbar">
          <div className="nav-controls">
            <IconButton label="Back" onClick={() => action("Back navigation") }><ArrowLeft size={17} /></IconButton>
            <IconButton label="Forward" onClick={() => action("Forward navigation") }><ArrowRight size={17} /></IconButton>
            <IconButton label="Refresh" onClick={() => { setSubmittedQuery(""); toast("Page refreshed"); }}><RefreshCw size={16} /></IconButton>
          </div>
          <div className="omnibox-wrap">
            <Search size={16} className="omnibox-icon" />
            <input aria-label="Address and search" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Search the web or ask for a vibe..." />
            {query && <button className="clear-input" onClick={() => setQuery("")}><X size={14} /></button>}
            <button className={`bookmark-action ${bookmarked ? "saved" : ""}`} onClick={() => { setBookmarked(!bookmarked); toast(bookmarked ? "Removed from bookmarks" : "Saved to bookmarks"); }}><Star size={16} fill={bookmarked ? "currentColor" : "none"} /></button>
          </div>
          <div className="toolbar-actions">
            <IconButton label="Open command palette" onClick={() => setCommandOpen(true)}><Command size={17} /></IconButton>
            <IconButton label="Menu" onClick={() => setPanel(panel === "none" ? "history" : "none")}><Menu size={18} /></IconButton>
          </div>
        </div>

        <div className="browser-content">
          <aside className="side-rail">
            <div className="rail-top"><Logo /><span className="rail-label">GLASS</span></div>
            <div className="rail-nav">
              <IconButton label="Search" active={panel === "none"} onClick={() => setPanel("none")}><Search size={18} /></IconButton>
              <IconButton label="History" active={panel === "history"} onClick={() => setPanel(panel === "history" ? "none" : "history")}><History size={18} /></IconButton>
              <IconButton label="Bookmarks" active={panel === "bookmarks"} onClick={() => setPanel(panel === "bookmarks" ? "none" : "bookmarks")}><BookOpen size={18} /></IconButton>
              <IconButton label="Downloads" active={panel === "downloads"} onClick={() => setPanel(panel === "downloads" ? "none" : "downloads")}><Download size={18} /></IconButton>
            </div>
            <div className="rail-bottom"><IconButton label="Settings" onClick={() => action("Settings opened")}><Settings2 size={18} /></IconButton><span className="keyboard-hint">⌘ K</span></div>
          </aside>

          <section className="search-stage">
            <div className="stage-header"><div className="crumb"><span className="live-dot" /> VIBE SEARCH <ChevronDown size={13} /></div><span className="stage-meta">{submittedQuery ? "CURATED FOR YOU" : "PRIVATE BY DEFAULT"}</span></div>
            {!submittedQuery ? (
              <div className="hero-block reveal">
                <div className="eyebrow"><Sparkles size={15} /> A SEARCH ENGINE FOR VIBECODERS</div>
                <h1>Search by <em>feeling.</em><br /><span>Build by instinct.</span></h1>
                <p className="hero-copy">A more human way to find the references, patterns, and tiny details that make your next build click.</p>
                <div className="hero-search">
                  <Search size={19} />
                  <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Try “quiet luxury meets developer tool”" />
                  <button className="search-submit" onClick={() => runSearch()}><span>Search</span><kbd>↵</kbd></button>
                </div>
                <div className="suggestion-row"><span>Try one of these</span>{starterQueries.map((item) => <button key={item} onClick={() => runSearch(item)}>{item.replace(/[“”]/g, "")}</button>)}</div>
              </div>
            ) : (
              <div className="results-block reveal">
                <div className="results-heading"><div><div className="eyebrow"><Zap size={14} /> YOUR VIBE, TRANSLATED</div><h2>Results for <em>“{submittedQuery}”</em></h2></div><button className="refine-button" onClick={() => searchRef.current?.focus()}><Command size={15} /> Refine <kbd>⌘ K</kbd></button></div>
                <div className="results-list">{visibleResults.map((result, index) => <article className="result-card" key={result.title} style={{ animationDelay: `${index * 70}ms` }}><div className={`result-glow ${result.accent}`} /><div className="result-top"><span className="result-tag">{result.tag}</span><span className="result-time">{result.time}</span></div><h3>{result.title}</h3><a className="result-url" href={result.href} target="_blank" rel="noreferrer">{result.url} <ExternalLink size={13} /></a><p>{result.description}</p><div className="result-footer"><a href={result.href} target="_blank" rel="noreferrer">Open reference <ArrowRight size={14} /></a><button className="copy-button" aria-label="Copy result link" onClick={() => { navigator.clipboard?.writeText(result.href); toast("Link copied"); }}><Copy size={14} /></button></div></article>)}</div>
                <div className="results-footer"><span><Check size={14} /> 3 thoughtful references · no noise</span><button onClick={() => { setSubmittedQuery(""); setQuery(""); }}>New search <ArrowRight size={14} /></button></div>
              </div>
            )}
            <footer className="stage-footer"><span>Glass Browser <b>0.1</b></span><span>Made for the in-between moments <span className="footer-star">✦</span></span><span><Terminal size={13} /> dev mode</span></footer>
          </section>

          {panel !== "none" && <aside className="utility-panel reveal"><div className="panel-header"><div><span className="panel-kicker">YOUR LIBRARY</span><h3>{panel}</h3></div><button onClick={() => setPanel("none")}><X size={16} /></button></div>{panel === "history" && <div className="panel-list"><div className="panel-item"><History size={16} /><div><strong>Vibe Search</strong><span>Just now</span></div></div><div className="panel-item"><Globe2 size={16} /><div><strong>interfaceindex.dev</strong><span>Yesterday</span></div></div></div>}{panel === "bookmarks" && <div className="empty-panel"><Bookmark size={25} /><strong>{bookmarked ? "1 saved reference" : "Your best finds live here"}</strong><span>Save references from the star in your omnibox.</span></div>}{panel === "downloads" && <div className="empty-panel"><Download size={25} /><strong>No downloads yet</strong><span>Files you save will appear right here.</span></div>}</aside>}
        </div>
      </section>

      {commandOpen && <div className="command-overlay" onClick={() => setCommandOpen(false)}><div className="command-modal" onClick={(e) => e.stopPropagation()}><div className="command-input"><Command size={18} /><input autoFocus placeholder="What do you want to do?" onKeyDown={(e) => e.key === "Enter" && setCommandOpen(false)} /><kbd>ESC</kbd></div><div className="command-section"><span>QUICK ACTIONS</span><button onClick={() => { setCommandOpen(false); searchRef.current?.focus(); }}><Search size={16} /><span>Focus omnibox</span><kbd>⌘ L</kbd></button><button onClick={() => { addTab(); setCommandOpen(false); }}><Plus size={16} /><span>New tab</span><kbd>⌘ T</kbd></button><button onClick={() => { setCommandOpen(false); action("Reading mode toggled"); }}><BookOpen size={16} /><span>Toggle reading mode</span><kbd>⌘ ⇧ R</kbd></button><button onClick={() => { setCommandOpen(false); action("Developer tools opened"); }}><Keyboard size={16} /><span>Keyboard shortcuts</span><kbd>?</kbd></button></div><div className="command-footer"><span>Navigate</span><span>↕</span><span>Choose</span><span>↵</span><span>Close</span><span>esc</span></div></div></div>}
    </main>
  );
}
