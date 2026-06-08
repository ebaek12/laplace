"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, ArrowUpRight, Mail, Menu, X, Star } from "lucide-react";

/* ── Scroll reveal ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    el.querySelectorAll(".reveal").forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Data ── */

type Credential = string | { text: string; href: string };

const team = [
  {
    name: "Neal Karani",
    role: "Co-Founder",
    school: "Stanford '29",
    img: "/neal1.webp",
    linkedin: "https://www.linkedin.com/in/nealkarani/",
    credentials: [
      { text: "Coolidge Senator", href: "https://coolidgescholars.org/coolidge-senators/" },
      "Olympiad Winner",
      "Valedictorian",
      "36 ACT",
    ] as Credential[],
  },
  {
    name: "Arhan Barve",
    role: "Co-Founder",
    school: "Harvard '30",
    img: "/arhan1.webp",
    linkedin: "https://www.linkedin.com/in/arhanbarve/",
    credentials: [
      "Salutatorian · 36 ACT",
      "3x Harvard Researcher",
      { text: "Coolidge Senator", href: "https://coolidgescholars.org/coolidge-senators/" },
      { text: "Stanford Likely Letter Recipient", href: "/blog/stanford-likely-letter-explained/" },
    ] as Credential[],
  },
  {
    name: "Andrew Lin",
    role: "Co-Founder",
    school: "MIT '29",
    img: "/andrew1.webp",
    linkedin: "",
    credentials: [
      { text: "1600 SAT · AIME Qualifier", href: "/blog/how-to-get-1600-sat/" },
      { text: "Coca-Cola Scholar (Class of 2025)", href: "/blog/how-to-become-coca-cola-scholar/" },
      { text: "Cyberstart National Scholar with Honors", href: "https://www.cyberstartamerica.com/" },
      "Published researcher — brain-computer interfaces at MIT",
    ] as Credential[],
  },
  {
    name: "Shaunak Buche",
    role: "Consultant",
    school: "",
    img: "/shaunak1.webp",
    linkedin: "https://www.linkedin.com/in/shaunak-buche/",
    credentials: [
      { text: "Princeton Prize Finalist", href: "/blog/princeton-prize-race-relations-tips/" },
      { text: "NSLI-Y Summer Scholar", href: "/blog/nsli-y-application-tips/" },
      { text: "Benjamin Franklin Transatlantic Fellow", href: "/blog/benjamin-franklin-transatlantic-fellowship/" },
      "National Student Council Officer",
      { text: "Diamond + Conrad Award Winner", href: "/blog/how-to-win-diamond-challenge/" },
    ] as Credential[],
  },
  {
    name: "Vishwa Rajan",
    role: "Consultant",
    school: "",
    img: "/vishwa1.webp",
    linkedin: "https://www.linkedin.com/in/vishwarajan/",
    credentials: [
      { text: "Conrad Challenge Power Pitch Winner", href: "https://www.conradchallenge.org/2025conradprizes" },
      { text: "Gore Innovation Excellence Prize, Diamond Challenge", href: "https://diamondchallenge.org/finalists/" },
      "Co-Creator, Vigil — contactless vital-sign monitoring",
    ] as Credential[],
  },
  {
    name: "Soneesh Kothagundla",
    role: "Consultant",
    school: "Harvard '30",
    img: "/soneesh1.webp",
    linkedin: "https://www.linkedin.com/in/soneeshk/",
    credentials: [
      { text: "Regeneron STS Scholar (Top 300)", href: "https://www.societyforscience.org/regeneron-sts/" },
      { text: "Genes in Space Finalist", href: "https://genesinspace.org/" },
      { text: "Diamond Challenge Emerging Innovator of the Year", href: "https://emerginginnovatorawards.org/honorees/" },
      "Featured in Forbes, Fox, Times Square",
      "Harvard Researcher",
    ] as Credential[],
  },
];

const faqs = [
  { q: "How much does it cost?", a: "It depends on what you pick. Book a free call and we'll talk through options — no pressure." },
  { q: "Do you guarantee admission?", a: "No one can guarantee admission — but we guarantee effort. Every deliverable is founder-reviewed, and we stay with your student through decision day." },
  { q: "What grades do you work with?", a: "8th graders through seniors, plus transfer students. Earlier is better because we have more to work with, but we've helped seniors in October pull together great applications." },
  { q: "How is this different from other consultants?", a: "We're not career counselors — we're students who just went through this. We remember what worked, what didn't, and what the process actually feels like." },
  { q: "How fast do I get essay feedback?", a: "12 hours standard. Rush turnaround also available." },
  { q: "What if I'm not happy?", a: "Talk to us. We'll adjust the plan, switch your advisor, or find a solution. We've never had someone walk away unsatisfied." },
  { q: "Is college consulting worth it?", a: "For students aiming at highly selective schools, working with someone who recently went through the process provides clarity on essay strategy, school lists, and positioning that most families can't access on their own. The earlier you start, the more options you have." },
  { q: "When should I start working with a consultant?", a: "The ideal time is 8th or 9th grade — early enough to shape course selection, extracurriculars, and summer plans. But we regularly work with juniors and seniors too. Even starting in October of senior year, there's still meaningful improvement to be made." },
  { q: "Can you help with Common App and supplemental essays?", a: "Yes — essay strategy and revision is one of our core services. We provide detailed feedback within 12 hours, help students find their authentic voice, and review unlimited drafts on our top-tier packages." },
  { q: "What does a college admissions consultant actually do?", a: "We help students build a strategic plan for their entire application — essay editing, school list building, extracurricular positioning, interview prep, and activity descriptions. Every deliverable is personally reviewed by a founder." },
];

const testimonials = [
  { text: "They helped my daughter find her voice in her essays. She got into her top choice and three other reaches.", who: "Parent of student admitted to Columbia '29", stars: 5 },
  { text: "I started working with them in October of senior year. Still got into Brown ED. They're fast and they actually care.", who: "Student admitted to Brown '29", stars: 5 },
  { text: "Best investment we made. The roadmap alone saved us months of confusion. Our son is now at Duke.", who: "Parent of student admitted to Duke '29", stars: 5 },
  { text: "The essay feedback was brutally honest and exactly what I needed. 12-hour turnaround every single time.", who: "Student admitted to Stanford '29", stars: 5 },
  { text: "They knew things about the process that our school counselor didn't even know existed. Total game changer.", who: "Parent of student admitted to UPenn '30", stars: 5 },
  { text: "Having someone my age who just went through it made all the difference. I could be honest without feeling judged.", who: "Student admitted to MIT '29", stars: 5 },
  { text: "We tried two other consultants before finding Laplace. Night and day difference in quality and responsiveness.", who: "Parent of student admitted to Cornell '30", stars: 5 },
  { text: "They rebuilt my entire activity list narrative in one session. That clarity carried through every supplement.", who: "Student admitted to Harvard '30", stars: 5 },
];

/* ── Page ── */

export function MainPage() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitEmail, setExitEmail] = useState("");
  const [exitQuestion, setExitQuestion] = useState("");
  const [exitSubmitted, setExitSubmitted] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const exitShownRef = useRef(false);
  const rPage = useReveal();

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 32);
      setShowStickyBar(window.scrollY > 600);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  // Exit-intent popup (desktop only)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitShownRef.current) {
        exitShownRef.current = true;
        setShowExitPopup(true);
      }
    };
    document.addEventListener("mouseout", handler);
    return () => document.removeEventListener("mouseout", handler);
  }, []);

  const handleExitSubmit = useCallback(async () => {
    if (!exitEmail || !exitQuestion) return;
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: "5b816142-6b90-4c2a-b0fd-51eed84a73eb", subject: "Free Question — Exit Popup", Email: exitEmail, Question: exitQuestion, Source: "Exit Intent Popup" }),
      });
    } catch { /* continue */ }
    setExitSubmitted(true);
  }, [exitEmail, exitQuestion]);

  return (
    <div ref={rPage} className="overflow-x-hidden dark:bg-[#111110] dark:text-[#e8e8e6]">

      {/* ── Sticky CTA bar ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-[55] transition-transform duration-300 ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-[var(--fg)] dark:bg-[#0a0a09] border-t border-white/10 py-3 px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <p className="text-white text-[13px] font-medium hidden sm:block">
              <span className="text-[var(--red)] font-semibold">10 spots left</span> for the Class of 2031
            </p>
            <p className="text-white/50 text-[12px] hidden md:block">Free 15-minute strategy call — no commitment</p>
            <a href="/#builder"
              className="btn-press shrink-0 inline-flex items-center gap-1.5 bg-[var(--red)] text-white font-semibold px-5 py-2 rounded-full text-[13px]">
              Book a free call <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Announcement bar ── */}
      {announcementVisible && (
        <div className="fixed top-0 left-0 right-0 z-[70] bg-[var(--red)] text-white text-center text-[12px] sm:text-[13px] font-medium py-2 px-4">
          <span>Now accepting students for the Class of 2031 &mdash; </span>
          <a href="/#builder" className="underline font-semibold">Book your spot</a>
          <button onClick={() => setAnnouncementVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white" aria-label="Dismiss announcement">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Scroll progress ── */}
      <div className={`fixed left-0 right-0 z-[60] h-[3px] ${announcementVisible ? "top-[36px]" : "top-0"}`} aria-hidden="true">
        <div className="h-full bg-[var(--red)] transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ── Exit-intent popup ── */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowExitPopup(false)} />
          <div className="relative bg-white dark:bg-[#1a1a18] rounded-2xl p-8 max-w-md w-full shadow-2xl" style={{ animation: "fade-up 0.3s var(--ease) both" }}>
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[var(--fg)]">
              <X className="w-5 h-5" />
            </button>
            {!exitSubmitted ? (
              <>
                <p className="text-[var(--red)] text-[12px] font-semibold uppercase tracking-wide mb-2">Before you go</p>
                <h3 className="text-xl font-bold mb-2">Ask us one question — we&apos;ll answer it for free.</h3>
                <p className="text-gray-500 text-[14px] mb-5">School list, essay topic, activity positioning — whatever you&apos;re stuck on. A real answer from someone who just went through this.</p>
                <textarea value={exitQuestion} onChange={(e) => setExitQuestion(e.target.value)} placeholder="What's your question?"
                  rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--red)] focus:outline-none text-[14px] resize-none mb-3" />
                <input type="email" value={exitEmail} onChange={(e) => setExitEmail(e.target.value)} placeholder="Your email *"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--red)] focus:outline-none text-[14px] mb-3" />
                <button onClick={handleExitSubmit} disabled={!exitEmail || !exitQuestion}
                  className={`btn-press w-full font-semibold px-5 py-3 rounded-lg text-[14px] transition-all ${exitEmail && exitQuestion ? "bg-[var(--red)] text-white" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                  Send my question
                </button>
                <p className="text-[11px] text-gray-400 mt-3 text-center">No pitch. Just a straight answer.</p>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-xl font-bold mb-2">Got it — we&apos;ll reply soon.</p>
                <p className="text-gray-500 text-[14px]">Check the email you included. Usually within a few hours.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Nav ── */}
      <nav className={`fixed ${announcementVisible ? "top-[36px]" : "top-[3px]"} left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-glass dark:bg-[#111110]/90 border-b border-gray-200/50 dark:border-gray-800/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]" : "bg-transparent"}`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Laplace College Consulting logo" width={28} height={28} className="w-7 h-7 object-contain" />
            <span className="text-sm font-semibold tracking-tight text-[var(--fg)] dark:text-white">Laplace</span>
          </a>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1">
              {[["Team", "#about"], ["Results", "/results/"], ["Services", "#services"], ["FAQ", "#faq"], ["Blog", "/blog/"]].map(([l, h]) => (
                <a key={l} href={h} className="text-[13px] font-medium text-gray-400 hover:text-[var(--fg)] dark:hover:text-white px-3 py-2 transition-colors">{l}</a>
              ))}
            </div>
            <a href="#builder"
              className="btn-press hidden sm:inline-flex text-[13px] font-semibold px-5 py-2 rounded-full bg-[var(--red)] text-white">
              Book a free call
            </a>
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 -mr-2 text-[var(--fg)] dark:text-white" aria-label="Toggle navigation menu">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 bg-[var(--bg)] dark:bg-[#111110] pt-24 px-8" role="dialog" aria-label="Navigation menu">
          <div className="flex flex-col gap-2">
            {[["Team", "#about"], ["Results", "/results/"], ["Services", "#services"], ["FAQ", "#faq"], ["Blog", "/blog/"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMobileMenu(false)}
                className="text-2xl font-semibold text-[var(--fg)] dark:text-white hover:text-[var(--red)] py-3 border-b border-gray-100 dark:border-gray-800 transition-colors">{l}</a>
            ))}
          </div>
          <a href="#builder"
            onClick={() => setMobileMenu(false)}
            className="btn-press mt-8 inline-flex items-center gap-2 bg-[var(--red)] text-white font-semibold px-7 py-3.5 rounded-full text-[15px]">
            Book a free consultation <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="min-h-[100dvh] flex flex-col justify-center pt-20 pb-12 relative overflow-hidden">
        {/* Watermark logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-16">
          <Image src="/logo.png" alt="" width={800} height={800}
            className="w-[65vw] max-w-[620px] h-auto object-contain opacity-[0.035]" aria-hidden="true" />
        </div>

        <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--red)] text-[13px] font-semibold tracking-wide uppercase mb-3"
              style={{ animation: "fade-up 0.6s cubic-bezier(0.23,1,0.32,1) 0.15s both" }}>
              College consulting from people who actually got in
            </p>
            <h1
              className="text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.08] tracking-[-0.03em] font-bold"
              style={{ animation: "fade-up 0.7s cubic-bezier(0.23,1,0.32,1) 0.25s both" }}
            >
              Your dream school isn&apos;t out of reach.
              <span className="block text-[var(--red)] mt-1">Your application strategy is just wrong.</span>
            </h1>
            <p
              className="text-gray-400 text-lg md:text-xl leading-relaxed mt-7 max-w-2xl mx-auto"
              style={{ animation: "fade-up 0.7s cubic-bezier(0.23,1,0.32,1) 0.38s both" }}
            >
              Consultants from Stanford, Harvard &amp; MIT who personally review every essay, build your strategy around your strengths, and stay with you from first draft to decision day.
            </p>

            <div
              className="flex flex-wrap items-center justify-center gap-4 mt-10"
              style={{ animation: "fade-up 0.7s cubic-bezier(0.23,1,0.32,1) 0.5s both" }}
            >
              <a href="#builder"
                className="btn-press inline-flex items-center gap-2 bg-[var(--red)] text-white font-semibold px-8 py-4 rounded-full text-[15px]">
                Start with a free call <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#services"
                className="btn-press text-[var(--fg)] dark:text-white hover:text-[var(--red)] text-sm font-medium transition-colors border border-gray-200 dark:border-gray-700 px-6 py-3.5 rounded-full">
                See how it works
              </a>
            </div>

            {/* Trust markers */}
            <div
              className="flex items-center justify-center gap-8 md:gap-12 mt-16 pt-8 border-t border-gray-100"
              style={{ animation: "fade-up 0.7s cubic-bezier(0.23,1,0.32,1) 0.65s both" }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--fg)]">8th+</p>
                <p className="text-[11px] text-gray-400 mt-0.5">grade and above</p>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--fg)]">12hr</p>
                <p className="text-[11px] text-gray-400 mt-0.5">essay turnaround</p>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--fg)]">6</p>
                <p className="text-[11px] text-gray-400 mt-0.5">consultants</p>
              </div>
            </div>
          </div>
        </div>

        {/* School marquee at bottom of hero */}
        <div className="mt-auto pt-12 border-t border-gray-100 py-4 overflow-hidden"
          style={{ animation: "fade-in 0.8s cubic-bezier(0.23,1,0.32,1) 0.8s both" }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                {["Stanford", "Harvard", "MIT", "Princeton", "Yale", "Columbia", "Penn", "Duke", "Brown", "Dartmouth", "Cornell", "Johns Hopkins"].map((s) => (
                  <span key={`${s}-${i}`} className="text-[clamp(0.85rem,1.5vw,1.1rem)] font-semibold tracking-tight text-gray-200 px-6 md:px-10 whitespace-nowrap select-none">
                    {s}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="about" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal mb-14">
            <p className="text-[var(--red)] text-[13px] font-semibold tracking-wide uppercase mb-3">Who you&apos;ll work with</p>
            <h2 className="text-2xl md:text-[2.2rem] font-bold tracking-tight leading-snug max-w-lg">
              Six consultants who&apos;ve been exactly where your student is now.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 reveal">
            {team.map((t) => {
              const slug = t.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={t.name} className="group block">
                  <a href={`/consultants/${slug}/`} className="block">
                    <div className="overflow-hidden rounded-xl mb-4 bg-[#f0efee] dark:bg-[#252523]">
                      <Image src={t.img} alt={`${t.name} — ${t.role} at Laplace College Consulting${t.school ? `, ${t.school}` : ""}`} width={400} height={400}
                        className={`w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${t.img === "/vishwa1.webp" ? "object-center" : "object-top"}`} />
                    </div>
                  </a>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <a href={`/consultants/${slug}/`}>
                        <h3 className="font-semibold text-[var(--fg)] hover:text-[var(--red)] transition-colors">{t.name}</h3>
                      </a>
                      <div className="flex items-baseline gap-2 mt-0.5 mb-3">
                        <span className="text-[var(--red)] text-[12px] font-semibold">{t.role}</span>
                        {t.school && <span className="text-gray-400 text-[12px]">{t.school}</span>}
                      </div>
                    </div>
                    {t.linkedin && (
                      <a href={t.linkedin} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 mt-0.5 text-gray-300 hover:text-[#0077b5] transition-colors" aria-label={`${t.name} on LinkedIn`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                  <ul className="space-y-1" aria-label={`${t.name}'s achievements`}>
                    {t.credentials.map((c, j) => {
                      const text = typeof c === "string" ? c : c.text;
                      const href = typeof c === "string" ? null : c.href;
                      const isExternal = href?.startsWith("http");
                      return (
                        <li key={j} className="text-gray-500 text-[13px] leading-snug flex items-start gap-1.5">
                          <span className="text-gray-300 mt-[3px] shrink-0">—</span>
                          {href ? (
                            <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-[var(--red)] transition-colors underline decoration-gray-200 underline-offset-2">
                              {text}
                            </a>
                          ) : text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── As Seen In ── */}
      <section className="py-12 border-t border-b border-gray-100 bg-[#fafaf9] dark:bg-[#0f0f0e]">
        <div className="max-w-5xl mx-auto px-6 reveal">
          <p className="text-center text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-6">Our consultants have been featured in</p>
          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-14 opacity-50">
            {["Forbes", "Fox News", "Times Square", "Regeneron", "Coca-Cola Scholars"].map((name) => (
              <span key={name} className="text-[15px] md:text-[17px] font-bold text-gray-400 dark:text-gray-500 tracking-tight">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rolling Testimonials ── */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-12 reveal">
          <p className="text-[var(--red)] text-[13px] font-semibold tracking-wide uppercase mb-3">Results</p>
          <h2 className="text-2xl md:text-[2.2rem] font-bold tracking-tight leading-snug max-w-lg">
            Families trust us with what matters most.
          </h2>
        </div>
        {/* Rolling track — two rows, opposite directions */}
        <div className="space-y-4">
          <div className="testimonial-track">
            <div className="testimonial-scroll">
              {[...testimonials.slice(0, 4), ...testimonials.slice(0, 4)].map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[var(--red)] text-[var(--red)]" />)}
                  </div>
                  <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-[12px] text-gray-400 font-medium">{t.who}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonial-track">
            <div className="testimonial-scroll-reverse">
              {[...testimonials.slice(4), ...testimonials.slice(4)].map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[var(--red)] text-[var(--red)]" />)}
                  </div>
                  <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-[12px] text-gray-400 font-medium">{t.who}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 md:py-28 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal mb-14">
            <p className="text-[var(--red)] text-[13px] font-semibold tracking-wide uppercase mb-3">How it works</p>
            <h2 className="text-2xl md:text-[2.2rem] font-bold tracking-tight leading-snug max-w-md">
              A straightforward process, start to finish.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-8 reveal">
            {[
              { step: "01", title: "Free strategy call", desc: "15 minutes. Tell us about the student — grade, goals, where they are now. We tell you exactly where we'd focus and which package fits." },
              { step: "02", title: "Choose your track", desc: "Some students need a long-horizon plan. Others need execution help right now. We'll tell you which is which — and price them separately." },
              { step: "03", title: "We stay in it with you", desc: "Your advisor is available when it matters. No recurring calls you don't need — just real help on the things that move the needle." },
            ].map((s) => (
              <div key={s.step}>
                <p className="text-[var(--red)] text-[13px] font-bold mb-2">{s.step}</p>
                <h3 className="font-semibold text-[var(--fg)] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services / Packages ── */}
      <section id="services" className="py-20 md:py-28 bg-[#f9f9f8] dark:bg-[#0f0f0e]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal mb-5">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[var(--red)]/[0.06] border border-[var(--red)]/20">
              <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse shrink-0" />
              <span className="text-[12px] font-semibold text-[var(--red)]">Currently accepting 10 students for the Class of 2031</span>
            </div>
            <h2 className="text-2xl md:text-[2.2rem] font-bold tracking-tight leading-snug max-w-xl">
              Every package is built around what your student actually needs.
            </h2>
          </div>
          <div className="reveal mb-10">
            <div className="flex flex-wrap gap-3 text-[13px]">
              <span className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1c1c1a] border border-gray-200 dark:border-[#2e2e2c] text-gray-500 font-medium">Planning → we map the strategy</span>
              <span className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1c1c1a] border border-gray-200 dark:border-[#2e2e2c] text-gray-500 font-medium">Execution → we work through it with you</span>
              <span className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1c1c1a] border border-gray-200 dark:border-[#2e2e2c] text-gray-500 font-medium">Access → connections that take years to build</span>
            </div>
          </div>

          <div className="space-y-4 reveal">

            {/* Common App Package */}
            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[#1c1c1a] dark:border-[#2e2e2c] px-7 py-6 md:flex md:items-start md:gap-8">
              <div className="md:flex-1 mb-4 md:mb-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                  <h3 className="text-lg font-bold">Common App Package</h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Essays · Planning</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-md">
                  Full essay support from brainstorm to final draft — personal statement, supplements, and activities descriptions. Every essay is reviewed by a founder. 12-hour turnaround, unlimited revisions on core essays.
                </p>
              </div>
              <a href="#builder"
                className="btn-press shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--red)] hover:underline mt-1">
                Get started <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Roadmap */}
            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[#1c1c1a] dark:border-[#2e2e2c] px-7 py-6 md:flex md:items-start md:gap-8">
              <div className="md:flex-1 mb-4 md:mb-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                  <h3 className="text-lg font-bold">Roadmap</h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Long-Horizon · Planning</span>
                  <span className="text-[11px] font-medium text-gray-400">Best for 9th–10th grade</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-md">
                  A multi-year strategy built around your student. Courses, testing timeline, summer plans, extracurricular positioning, rec letter targets, and scholarship opportunities — mapped out clearly so nothing falls through the cracks.
                </p>
              </div>
              <a href="#builder"
                className="btn-press shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--red)] hover:underline mt-1">
                Get started <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Competitions & Scholarships */}
            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[#1c1c1a] dark:border-[#2e2e2c] px-7 py-6 md:flex md:items-start md:gap-8">
              <div className="md:flex-1 mb-4 md:mb-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                  <h3 className="text-lg font-bold">Competitions &amp; Scholarships</h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Execution · Access</span>
                  <span className="text-[11px] font-medium text-gray-400">Best for 10th–11th grade</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-md">
                  Strategy and hands-on coaching for the competitions and scholarships that actually move the needle: Conrad, Diamond Challenge, Coolidge, Coca-Cola Scholars, and more. Our team has won these — we know exactly what the committees look for.
                </p>
              </div>
              <a href="#builder"
                className="btn-press shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--red)] hover:underline mt-1">
                Get started <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Founder's Package */}
            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[#1c1c1a] dark:border-[#2e2e2c] px-7 py-6 md:flex md:items-start md:gap-8">
              <div className="md:flex-1 mb-4 md:mb-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                  <h3 className="text-lg font-bold">Founder&apos;s Package</h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Execution · Access</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-md">
                  For students building a company or nonprofit. We help structure the venture, position it for maximum application impact, and connect you with the people and programs that matter. Most students attempting this have no idea how to do it right — we do.
                </p>
              </div>
              <a href="#builder"
                className="btn-press shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--red)] hover:underline mt-1">
                Get started <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Creator / Influencer */}
            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[#1c1c1a] dark:border-[#2e2e2c] px-7 py-6 md:flex md:items-start md:gap-8">
              <div className="md:flex-1 mb-4 md:mb-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                  <h3 className="text-lg font-bold">Creator &amp; Personal Brand</h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Execution · Planning</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-md">
                  For students building an audience or public presence. SEO strategy, content positioning, and building in public — framed so it reads as a genuine extracurricular rather than a side project. We built our own audience; we can help you build yours.
                </p>
              </div>
              <a href="#builder"
                className="btn-press shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--red)] hover:underline mt-1">
                Get started <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Internship Package */}
            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[#1c1c1a] dark:border-[#2e2e2c] px-7 py-6 md:flex md:items-start md:gap-8">
              <div className="md:flex-1 mb-4 md:mb-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                  <h3 className="text-lg font-bold">Internship &amp; Research</h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Execution · Access</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-md">
                  Cold outreach strategy, research lab applications, and leveraging our Harvard and MIT connections to help students land real positions. We&apos;ll show you the exact emails that worked for us — and help you write yours.
                </p>
              </div>
              <a href="#builder"
                className="btn-press shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--red)] hover:underline mt-1">
                Get started <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Laplace Elite */}
            <div className="rounded-xl border-2 border-[var(--red)]/15 bg-white dark:bg-[#1c1c1a] px-7 py-6 md:flex md:items-start md:gap-8">
              <div className="md:flex-1 mb-4 md:mb-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                  <h3 className="text-lg font-bold">Laplace Full Access</h3>
                  <span className="text-[11px] font-semibold text-[var(--red)] uppercase tracking-wider">Everything · By Invitation</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-md">
                  The full stack — every package above, plus 24/7 founder availability, HYPSM alumni network access, private DC connections, inside EC and leadership opportunities, and end-to-end management through decision day. Priced on fit, not a menu.
                </p>
              </div>
              <a href="#builder"
                className="btn-press shrink-0 inline-flex items-center gap-2 bg-[var(--red)] text-white font-semibold px-5 py-2.5 rounded-full text-[13px] mt-1">
                Get started <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Package Comparison Table ── */}
      <section className="py-16 bg-[#f9f9f8] dark:bg-[#0f0f0e] border-t border-gray-100 dark:border-[#2a2a28]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal mb-8">
            <p className="text-[var(--red)] text-[13px] font-semibold tracking-wide uppercase mb-2">At a glance</p>
            <h2 className="text-xl font-bold tracking-tight">What&apos;s in each package</h2>
          </div>
          <div className="reveal overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 text-gray-400 font-medium w-48">What you get</th>
                  {["Common App", "Roadmap", "Competitions", "Founder's", "Creator", "Internship"].map((pkg) => (
                    <th key={pkg} className="text-center py-3 px-2 font-semibold text-[var(--fg)] text-[12px] w-20">{pkg}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Essay review & revision",          cols: [true,  false, false, false, false, false] },
                  { label: "Multi-year roadmap",               cols: [false, true,  false, false, false, false] },
                  { label: "School list strategy",             cols: [true,  true,  false, false, false, false] },
                  { label: "Competition coaching",             cols: [false, false, true,  false, false, false] },
                  { label: "Scholarship strategy",             cols: [false, false, true,  false, false, false] },
                  { label: "Venture/nonprofit structure",      cols: [false, false, false, true,  false, false] },
                  { label: "Personal brand + SEO",             cols: [false, false, false, false, true,  false] },
                  { label: "Cold outreach + lab applications", cols: [false, false, false, false, false, true]  },
                  { label: "Network connections",              cols: [false, false, true,  true,  false, true]  },
                  { label: "Founder oversight on everything",  cols: [true,  true,  true,  true,  true,  true]  },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-gray-100 hover:bg-white/60 transition-colors">
                    <td className="py-3 pr-4 text-gray-500">{row.label}</td>
                    {row.cols.map((included, i) => (
                      <td key={i} className="py-3 px-2 text-center">
                        {included
                          ? <span className="text-[var(--red)] font-bold">✓</span>
                          : <span className="text-gray-200">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-gray-400 mt-4 reveal">Laplace Full Access includes everything above. <a href="/#builder" className="text-[var(--red)] hover:underline">Book a call</a> to discuss a custom combination.</p>
        </div>
      </section>

      {/* ── Package Builder ── */}
      <section id="builder" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal mb-12">
            <p className="text-[var(--red)] text-[13px] font-semibold tracking-wide uppercase mb-3">Free 15-minute consultation</p>
            <h2 className="text-2xl md:text-[2.2rem] font-bold tracking-tight max-w-md">
              Tell us what you need.
            </h2>
            <p className="text-gray-500 mt-3 text-[15px] max-w-md">
              Select what you&apos;re looking for, fill in your info, and we&apos;ll set up a free 15-minute call to scope out exactly what makes sense for your student.
            </p>
          </div>
          <PackageBuilder />
        </div>
      </section>


      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[var(--red)] text-[13px] font-semibold tracking-wide uppercase mb-3 reveal">FAQ</p>
          <h2 className="text-2xl md:text-[2.2rem] font-bold tracking-tight mb-10 reveal">
            Questions we get a lot
          </h2>
          <div className="reveal">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-gray-100">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left gap-4 py-5 group">
                  <span className="font-medium text-[15px] group-hover:text-[var(--red)] transition-colors">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-[var(--red)]" : ""}`} />
                </button>
                <div className={`accordion-body ${openFaq === i ? "open" : ""}`}>
                  <div><div className="pb-5"><p className="text-gray-400 text-[14px] leading-relaxed">{f.a}</p></div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram ── */}
      <section className="py-20 md:py-28 bg-[#f9f9f8] dark:bg-[#0f0f0e]">
        <div className="max-w-5xl mx-auto px-6 reveal text-center">
          <p className="text-[var(--red)] text-[13px] font-semibold tracking-wide uppercase mb-3">Follow along</p>
          <h2 className="text-2xl md:text-[2.2rem] font-bold tracking-tight leading-snug mb-4">
            @laplace_cc
          </h2>
          <p className="text-gray-500 text-[15px] mb-8 max-w-md mx-auto">
            Tips, wins, and behind-the-scenes from the team. Follow us on Instagram for admissions advice and student spotlights.
          </p>
          <a href="https://www.instagram.com/laplace_cc/" target="_blank" rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-[var(--fg)] dark:text-white font-semibold px-7 py-3.5 rounded-full text-[15px] hover:border-[var(--red)] hover:text-[var(--red)] transition-colors">
            Follow @laplace_cc <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 bg-[var(--fg)] dark:bg-[#0a0a09]">
        <div className="max-w-5xl mx-auto px-6 reveal">
          <div className="md:flex md:items-center md:justify-between md:gap-12">
            <div className="max-w-lg mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug mb-3">
                15 minutes. No commitment.
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed">
                Tell us about your student and we&apos;ll tell you where we&apos;d focus — whether you sign up or not.
              </p>
            </div>
            <a href="/#builder"
              className="btn-press inline-flex items-center gap-2 bg-[var(--red)] text-white font-semibold px-7 py-3.5 rounded-full text-[15px]">
              Get your free strategy session <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-14 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <a href="#" className="flex items-center gap-2 mb-3">
                <Image src="/logo.png" alt="Laplace College Consulting" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-sm font-semibold text-[var(--fg)] dark:text-white">Laplace</span>
              </a>
              <p className="text-[13px] text-gray-400 leading-relaxed">College admissions consulting from people who actually got in.</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Pages</p>
              <div className="flex flex-col gap-2">
                <a href="#about" className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Our Team</a>
                <a href="#services" className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Services</a>
                <a href="/blog/" className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Blog</a>
                <a href="/results/" className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Results</a>
                <a href="/pricing/" className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Pricing</a>
                <a href="/scholarships/" className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Scholarships</a>
                <a href="/refer/" className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Refer a Friend</a>
                <a href="/privacy/" className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Privacy Policy</a>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Cities We Serve</p>
              <div className="flex flex-col gap-2">
                {[["New York", "/new-york/"], ["Los Angeles", "/los-angeles/"], ["Chicago", "/chicago/"], ["Houston", "/houston/"], ["Atlanta", "/atlanta/"], ["Dallas", "/dallas/"], ["Boston", "/boston/"], ["Washington DC", "/washington-dc/"]].map(([city, href]) => (
                  <a key={city} href={href} className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">{city}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Connect</p>
              <div className="flex flex-col gap-2">
                <a href="https://www.instagram.com/laplace_cc/" target="_blank" rel="noopener noreferrer"
                  className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Instagram</a>
                <a href="mailto:laplacecollegeconsulting@gmail.com"
                  className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Email Us</a>
                <a href="/#builder"
                  className="text-[13px] text-gray-500 hover:text-[var(--red)] transition-colors">Book a Call</a>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-gray-300 dark:text-gray-600 text-[12px]">&copy; {new Date().getFullYear()} Laplace College Consulting. All rights reserved.</span>
            <a href="https://www.instagram.com/laplace_cc/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-[var(--red)] text-[13px] font-medium transition-colors">@laplace_cc</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PACKAGE BUILDER
   ═══════════════════════════════════════════ */

const serviceItems = [
  // Essays
  { id: "essay-personal", label: "Personal statement — brainstorm, drafts, and final revision" },
  { id: "essay-supplements", label: "Supplement essays for every school on your list" },
  { id: "essay-activities", label: "Activities list + 150-character descriptions" },
  { id: "essay-unlimited", label: "Unlimited revisions on all essays (Common App + supplements)" },
  // Planning
  { id: "roadmap-full", label: "Full multi-year roadmap (courses, testing, summers, ECs, recs)" },
  { id: "school-list", label: "Personalized school list — reaches, targets, safeties" },
  { id: "roadmap-execution", label: "Execution plan with monthly milestones and deadlines" },
  // Competitions & Scholarships
  { id: "comp-coaching", label: "Competition coaching — Conrad, Diamond, Wharton, WEC, NEC" },
  { id: "scholarship-strategy", label: "Scholarship strategy + submission review (Coolidge, Coca-Cola, GHP)" },
  // Founder's
  { id: "founder-structure", label: "Company or nonprofit structure + positioning for applications" },
  { id: "founder-connections", label: "Founder network access — mentors, programs, DC connections" },
  // Creator
  { id: "creator-seo", label: "Personal brand SEO strategy + content positioning" },
  { id: "creator-buildingpublic", label: "Building-in-public strategy — audience growth and EC framing" },
  // Internship & Research
  { id: "internship-outreach", label: "Cold outreach strategy + email templates that actually worked" },
  { id: "internship-labs", label: "Research lab application strategy + review" },
  { id: "internship-network", label: "Harvard/MIT network access for research and internship leads" },
  // Access
  { id: "alumni-network", label: "HYPSM alumni network access" },
  { id: "inside-ecs", label: "Inside connections to private ECs and leadership roles" },
];

const gradeOptions = ["8th Grade", "Freshman (9th)", "Sophomore (10th)", "Junior (11th)", "Senior (12th)", "Gap Year / Transfer"];

// Field of interest → suggested majors. "Still exploring" has no major dropdown.
const fieldMajors: Record<string, string[]> = {
  "STEM / Engineering": ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Biomedical Engineering", "Mathematics", "Physics", "Chemistry", "Data Science", "Other STEM"],
  "Business / Economics": ["Business Administration", "Finance", "Economics", "Marketing", "Accounting", "Entrepreneurship", "Other Business"],
  "Pre-Med / Health Sciences": ["Biology", "Neuroscience", "Public Health", "Nursing", "Kinesiology", "Pre-Med (Undeclared)", "Other Health Science"],
  "Pre-Law / Policy": ["Political Science", "International Relations", "Public Policy", "Philosophy", "History", "Criminal Justice", "Other Pre-Law"],
  "Humanities / Social Sciences": ["English", "Psychology", "Sociology", "Anthropology", "Communications", "Linguistics", "Other Humanities"],
  "Arts / Design": ["Fine Arts", "Graphic Design", "Architecture", "Film / Media", "Music", "Theater", "Other Arts"],
  "Still exploring": [],
};
const fieldOptions = Object.keys(fieldMajors);

function PackageBuilder() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [field, setField] = useState("");
  const [major, setMajor] = useState("");
  const [notes, setNotes] = useState("");
  const [consultant, setConsultant] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const canProceed = step === 0 ? selected.length > 0 : !!(name && email && grade);

  const handleSubmit = async () => {
    setSubmitting(true);
    const labels = selected.map((id) => serviceItems.find((s) => s.id === id)?.label).filter(Boolean).join("\n• ");
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "5b816142-6b90-4c2a-b0fd-51eed84a73eb",
          subject: `New Custom Package — ${name} (${selected.length} services)`,
          Name: name, Email: email, Phone: phone || "Not provided", Grade: grade,
          "Field of Interest": field || "Not specified",
          "Intended Major": major || "Not specified",
          "Preferred Consultant": consultant || "No preference",
          "Services Selected": `• ${labels}`,
          "Additional Notes": notes || "None",
        }),
      });
    } catch { /* proceed anyway */ }
    setSubmitting(false);
    window.location.href = "https://calendly.com/laplacecc/freeconsultation";
  };

  if (submitted) {
    return (
      <div className="max-w-md py-12">
        <h3 className="text-xl font-bold mb-2">Done — we&apos;ve got your info.</h3>
        <p className="text-gray-400 text-[15px] mb-6">
          We&apos;ll review your {selected.length} selections and reach out within 24 hours. In the meantime:
        </p>
        <a href="/#builder"
          className="btn-press inline-flex items-center gap-2 bg-[var(--red)] text-white font-semibold px-7 py-3.5 rounded-full text-[15px]">
          Book your free call <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div>
      {step === 0 ? (
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-[15px] text-gray-400">Tap to select. Pick as many as you want.</p>
            {selected.length > 0 && (
              <span className="text-[13px] text-[var(--red)] font-semibold">{selected.length} selected</span>
            )}
          </div>

          <div className="space-y-2">
            {serviceItems.map((item) => {
              const active = selected.includes(item.id);
              return (
                <button key={item.id} onClick={() => toggle(item.id)}
                  className={`w-full text-left flex items-center gap-3 px-5 py-3.5 rounded-lg border transition-all duration-150 ${
                    active ? "border-[var(--red)] bg-[var(--red)]/[0.03]" : "border-gray-100 hover:border-gray-200"
                  }`}>
                  <span className={`w-[18px] h-[18px] rounded flex-shrink-0 flex items-center justify-center border-2 transition-all duration-150 text-[10px] ${
                    active ? "border-[var(--red)] bg-[var(--red)] text-white" : "border-gray-200"
                  }`}>{active && "✓"}</span>
                  <span className={`text-[14px] ${active ? "text-[var(--fg)]" : "text-gray-500"}`}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {selected.length > 0 && (
            <div className="sticky bottom-6 mt-8 p-4 rounded-xl bg-white dark:bg-[#1c1c1a] border border-gray-200 dark:border-[#2e2e2c] shadow-lg flex items-center justify-between gap-4">
              <p className="text-[14px]"><span className="font-semibold">{selected.length}</span> service{selected.length !== 1 && "s"} selected</p>
              <button onClick={() => setStep(1)}
                className="btn-press inline-flex items-center gap-1.5 bg-[var(--red)] text-white font-semibold px-5 py-2.5 rounded-full text-[13px]">
                Continue <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-lg">
          <button onClick={() => setStep(0)} className="text-[13px] text-gray-400 hover:text-[var(--fg)] mb-6 transition-colors">&larr; Back to selections ({selected.length})</button>
          <p className="text-lg font-semibold mb-5">Your info</p>
          <div className="space-y-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student's name *"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2e2e2c] dark:bg-[#1c1c1a] dark:text-white focus:border-[var(--red)] focus:outline-none text-[14px] transition-colors" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email *"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2e2e2c] dark:bg-[#1c1c1a] dark:text-white focus:border-[var(--red)] focus:outline-none text-[14px] transition-colors" />
            <div className="grid grid-cols-2 gap-3">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2e2e2c] dark:bg-[#1c1c1a] dark:text-white focus:border-[var(--red)] focus:outline-none text-[14px] transition-colors" />
              <select value={grade} onChange={(e) => setGrade(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2e2e2c] dark:bg-[#1c1c1a] dark:text-white focus:border-[var(--red)] focus:outline-none text-[14px] transition-colors appearance-none ${!grade ? "text-gray-400" : ""}`}>
                <option value="" disabled>Grade *</option>
                {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className={field && fieldMajors[field]?.length ? "grid grid-cols-2 gap-3" : ""}>
              <select value={field} onChange={(e) => { setField(e.target.value); setMajor(""); }}
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2e2e2c] dark:bg-[#1c1c1a] dark:text-white focus:border-[var(--red)] focus:outline-none text-[14px] transition-colors appearance-none ${!field ? "text-gray-400" : ""}`}>
                <option value="" disabled>Field of interest</option>
                {fieldOptions.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              {field && fieldMajors[field]?.length > 0 && (
                <select value={major} onChange={(e) => setMajor(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2e2e2c] dark:bg-[#1c1c1a] dark:text-white focus:border-[var(--red)] focus:outline-none text-[14px] transition-colors appearance-none ${!major ? "text-gray-400" : ""}`}>
                  <option value="" disabled>Intended major</option>
                  {fieldMajors[field].map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              )}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--fg)] mb-2">Preferred consultant <span className="font-normal text-gray-400">(optional)</span></p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Shaunak Buche", tag: "Pre-Law · Policy · Summer Programs · Liberal Arts · Entrepreneurship" },
                  { name: "Vishwa Rajan", tag: "Finance · Business · Internships" },
                  { name: "Arhan Barve", tag: "Essays · Application Strategy · Economics · STEM · CS · International" },
                  { name: "Soneesh Kothagundla", tag: "Advocacy · Healthcare" },
                ].map((c) => (
                  <button key={c.name} type="button" onClick={() => setConsultant(consultant === c.name ? "" : c.name)}
                    className={`text-left px-4 py-3 rounded-lg border transition-all duration-150 ${
                      consultant === c.name ? "border-[var(--red)] bg-[var(--red)]/[0.04]" : "border-gray-200 hover:border-gray-300"
                    }`}>
                    <p className={`text-[13px] font-semibold ${consultant === c.name ? "text-[var(--red)]" : "text-[var(--fg)]"}`}>{c.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{c.tag}</p>
                  </button>
                ))}
              </div>
            </div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything else? (target schools, timeline...)"
              rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2e2e2c] dark:bg-[#1c1c1a] dark:text-white focus:border-[var(--red)] focus:outline-none text-[14px] transition-colors resize-none" />
          </div>
          <button onClick={handleSubmit} disabled={!canProceed || submitting}
            className={`btn-press mt-6 inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-[15px] transition-all ${
              canProceed && !submitting ? "bg-[var(--red)] text-white" : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}>
            {submitting ? "Sending..." : "Submit & book your call"} <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
