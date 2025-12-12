"use client";

import { useState } from "react";

const examples = [
  {
    title: "Recipe Instructions",
    input: "To make the perfect omelette, crack three eggs into a bowl and whisk until smooth. Heat butter in a non-stick pan over medium heat. Pour in the eggs and let them set for 30 seconds. Gently push the edges toward the center, tilting the pan to let uncooked egg flow underneath. Add your fillings to one half, then fold and slide onto a plate.",
    output: "1. Crack 3 eggs into bowl and whisk until smooth\n2. Heat butter in non-stick pan over medium heat\n3. Pour eggs in, let set 30 seconds\n4. Push edges to center, tilt pan for uncooked egg\n5. Add fillings to one half\n6. Fold and slide onto plate",
  },
  {
    title: "Software Setup",
    input: "First, download the installer from our website. Once downloaded, run the executable file and follow the on-screen prompts. You'll need to accept the license agreement and choose an installation directory. After installation completes, restart your computer. Then launch the application and enter your license key when prompted.",
    output: "1. Download installer from website\n2. Run the executable file\n3. Accept license agreement\n4. Choose installation directory\n5. Restart computer after installation\n6. Launch app and enter license key",
  },
  {
    title: "Morning Routine",
    input: "Start your day by waking up at 6 AM without hitting snooze. Immediately drink a full glass of water to rehydrate. Spend 10 minutes stretching or doing light yoga. Take a cold shower to boost alertness. Eat a protein-rich breakfast within an hour of waking. Review your top 3 priorities for the day before checking any messages.",
    output: "1. Wake at 6 AM — no snooze\n2. Drink full glass of water immediately\n3. 10 min stretching or light yoga\n4. Take cold shower\n5. Eat protein-rich breakfast within 1 hour\n6. Review top 3 priorities before checking messages",
  },
];

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSummarize = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setSummary("");

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
throw new Error(data.error || "Failed to convert to steps");
      }

      setSummary(data.summary);
    } catch (error) {
      console.error("Convertion error:", error);
setSummary("Error: Failed to convert to steps. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setSummary("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy");
    }
  };

  const handleShareTwitter = () => {
    if (!summary) return;
    const text = encodeURIComponent(`${summary}\n\n— Made with InstructionSum.app`);
    const url = encodeURIComponent("https://InstructionSum.app");
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
    setShareOpen(false);
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent("https://InstructionSum.app");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
    setShareOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://InstructionSum.app");
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
        setShareOpen(false);
      }, 1500);
    } catch {
      console.error("Failed to copy link");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || emailSubmitting) return;

    setEmailSubmitting(true);
    setEmailError("");

    try {
      const response = await fetch("https://formspree.io/f/meoykeaj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          source: "InstructionSum",
          _gotcha: "",
        }),
      });

      if (response.ok) {
        setEmailSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 md:px-20">
      <div className="mx-auto max-w-content">
        {/* Header */}
        <header className="flex h-16 items-center justify-between">
          <div className="text-base font-semibold text-accent">InstructionSum</div>
          <a href="https://sumkit.app" target="_blank" rel="noopener noreferrer" className="flex h-7 items-center rounded-pill border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-3 transition-colors hover:border-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.06)]">
            <span className="text-xs text-text-secondary">SumKit suite</span>
          </a>
        </header>

        {/* Hero */}
        <section className="mt-10">
          <h1 className="text-h1 text-[rgba(255,255,255,0.96)]">
            Convert any text into actionable steps.
          </h1>
          <p className="mt-3 max-w-[520px] text-body text-text-secondary">
            Paste text below and Convert clear, numbered instructions.
          </p>
			
        </section>

        {/* Main Glass Panel */}
        <section className="glass-panel mt-8 rounded-glass p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Left Column - Input */}
            <div className="flex-1 lg:max-w-[680px]">
              <label className="text-label uppercase text-text-secondary">
                INPUT TEXT
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste text here..."
                className="input-field mt-3 h-[260px] w-full resize-none rounded-input p-4 text-input text-text-primary"
              />
              <p className="mt-2 text-xs text-text-muted">
                Paste or type any content — article, email, notes, etc.
              </p>

              {/* Privacy Notice */}
              <p className="mt-3 text-xs text-text-muted">
                🔒 Processed via Claude AI. Never stored. No account needed.
              </p>          

            </div>

            {/* Right Column - Output */}
            <div className="flex-1 lg:max-w-[420px]">
              <label className="text-label uppercase text-text-secondary">
                ACTION STEPS
              </label>
              <div className="mt-3">
                <div className="flex min-h-[80px] items-start rounded-input border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] p-4">
                  {isLoading ? (
                    <span className="text-input text-text-muted">
						Converting to steps...
					</span>
                  ) : summary ? (
                    <span className="text-input text-text-primary whitespace-pre-wrap">
                      {summary}
                    </span>
                  ) : (
                    <span className="text-input text-text-muted">
                      Numbered steps appear here...
                    </span>
                  )}
                </div>
              </div>

              {/* Button Row */}
              <div className="mt-4 flex gap-2 sm:gap-3">
                <button
                  onClick={handleClear}
                  className="flex-1 rounded-input border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] px-2 py-2 text-xs text-text-secondary transition-colors hover:border-[rgba(255,255,255,0.20)] hover:text-text-primary sm:px-4 sm:py-2.5 sm:text-button"
                >
                  Clear
                </button>
                <button
                  onClick={handleSummarize}
                  disabled={!inputText.trim() || isLoading}
                  className="flex-1 rounded-input bg-accent px-2 py-2 text-xs text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2.5 sm:text-button"
                >
                  {isLoading ? "Converting..." : "Convert"}
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!summary || isLoading}
                  className="flex-1 rounded-input border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] px-2 py-2 text-xs text-text-secondary transition-colors hover:border-[rgba(255,255,255,0.20)] hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2.5 sm:text-button"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <div className="relative flex-1">
                  <button
                    onClick={() => setShareOpen(!shareOpen)}
                    disabled={!summary || isLoading}
                    className="w-full rounded-input border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] px-2 py-2 text-xs text-text-secondary transition-colors hover:border-[rgba(255,255,255,0.20)] hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2.5 sm:text-button"
                  >
                    Share
                  </button>
                  {shareOpen && (
                    <div className="absolute right-0 top-full z-10 mt-2 w-40 rounded-input border border-[rgba(255,255,255,0.12)] bg-[rgba(20,20,20,0.95)] py-1 backdrop-blur-sm">
                      <button
                        onClick={handleShareTwitter}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-button text-text-secondary transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-text-primary"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter/X
                      </button>
                      <button
                        onClick={handleShareLinkedIn}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-button text-text-secondary transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-text-primary"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-button text-text-secondary transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-text-primary"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        {linkCopied ? "Link copied!" : "Copy link"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-3 text-xs text-text-muted">
                Converts to clear, numbered action steps.
              </p>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="mt-7">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-text-secondary">
            EXAMPLES
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {examples.map((example, index) => (
              <div
                key={index}
                className="glass-panel cursor-pointer rounded-glass p-5 transition-colors hover:bg-[rgba(255,255,255,0.08)]"
                onClick={() => {
                  setInputText(example.input);
                }}
              >
                <h3 className="text-sm font-medium text-text-primary">
                  {example.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-text-muted">
                  {example.input}
                </p>
                <div className="mt-3 border-t border-[rgba(255,255,255,0.08)] pt-3">
                  <p className="text-xs text-text-secondary whitespace-pre-wrap">
                    {example.output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Email Capture Section */}
        <section className="mt-8">
          <div className="h-px w-full bg-[rgba(255,255,255,0.08)]" />

          {emailSubmitted ? (
            <div className="py-8 text-center">
              <p className="text-body text-text-primary">
                You&apos;re in! We&apos;ll be in touch.
              </p>
            </div>
          ) : (
            <div className="py-8">
              <p className="text-center text-body text-text-secondary">
                Dig this tool? Drop us your email &amp; we&apos;ll let you know
                when we build more.
              </p>
              <form
                onSubmit={handleEmailSubmit}
                className="mx-auto mt-4 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="input-field flex-1 rounded-input px-4 py-2.5 text-input text-text-primary"
                />
                <button
                  type="submit"
                  disabled={emailSubmitting}
                  className="rounded-input border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] px-5 py-2.5 text-button text-text-secondary transition-colors hover:border-[rgba(255,255,255,0.20)] hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {emailSubmitting ? "Sending..." : "Keep me posted"}
                </button>
              </form>
              {emailError && (
                <p className="mt-2 text-center text-xs text-red-400">
                  {emailError}
                </p>
              )}
              <p className="mt-3 text-center text-[11px] text-text-muted">
                (No spam. Promise.)
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-6 flex flex-col items-center justify-between gap-4 pb-8 sm:flex-row">
          <p className="text-xs text-text-muted">InstructionSum &bull; A free tool in the SumKit suite. &copy; {new Date().getFullYear()}</p>
          <div className="flex gap-4">
            <a href="https://sumkit.app" target="_blank" rel="noopener noreferrer" className="text-xs text-text-secondary transition-colors hover:text-text-primary">SumKit.app</a>
            <span className="text-text-muted">|</span>
            <a href="https://sumkit.app/contact?from=instructionsum" className="text-xs text-text-secondary transition-colors hover:text-text-primary">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
