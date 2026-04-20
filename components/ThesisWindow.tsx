import { copy } from "@/content/copy";
import styles from "./ThesisWindow.module.css";

const MONTH_LABELS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/**
 * Thesis terminal-window component (landing page centerpiece).
 *
 * Spec: shixiang-thesis-section-spec-v3.md (2026-04-20).
 * Visual goal: looks like a real editor/terminal window (VSCode /
 * macOS Terminal) showing shixiang-agi-thesis.md, not "a card that
 * happens to use a monospace font".
 *
 * UPDATED month/year is injected at module init (build time for SSG),
 * so each production deploy carries the month of its build.
 */
export function ThesisWindow() {
  const now = new Date();
  const month = MONTH_LABELS[now.getMonth()];
  const year = now.getFullYear();

  return (
    <section className={styles.window} aria-labelledby="thesis-heading">
      <h2 id="thesis-heading" className="sr-only">
        Shixiang Investment Thesis
      </h2>

      {/* Top bar — mac traffic lights + filename + UPDATED MONTH YEAR */}
      <header className={styles.topbar}>
        <div className={styles.dots} aria-hidden="true">
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotAmber}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <span className={styles.filename}>{copy.thesis.filename}</span>
        <span className={styles.meta}>
          {copy.thesis.updatedLabel} {month} {year}
        </span>
      </header>

      {/* Main — `$ cat thesis.md` + 4 thesis entries */}
      <main className={styles.content}>
        <div className={styles.commandEcho} aria-hidden="true">
          {copy.thesis.command}
        </div>

        <ul className={styles.list} role="list">
          {copy.thesis.entries.map((entry, idx) => (
            <li
              key={entry.slug}
              className={styles.entry}
              data-direction={entry.slug}
            >
              <span className={styles.lineNumber} aria-hidden="true">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className={styles.link}>
                <div className={styles.primary}>
                  <span className={styles.tag}>{entry.tag}</span>
                  <span className={styles.desc}>{entry.desc}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </div>
                <div className={styles.sub}>{entry.sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Bottom bar — branch + year + ready indicator */}
      <footer className={styles.bottombar}>
        <div className={styles.statusLeft}>
          <span className={styles.branch}>
            <span className={styles.branchIcon} aria-hidden="true">⌥</span>
            <span>{copy.thesis.branch}</span>
          </span>
          <span className={styles.separator} aria-hidden="true">·</span>
          <span className={styles.date}>{year}</span>
        </div>
        <div
          className={styles.ready}
          role="status"
          aria-label="System status: ready"
        >
          <span className={styles.readyDot} aria-hidden="true" />
          <span>{copy.thesis.ready}</span>
        </div>
      </footer>
    </section>
  );
}
