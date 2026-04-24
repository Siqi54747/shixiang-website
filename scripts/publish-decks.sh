#!/usr/bin/env bash
#
# One-shot: pull the latest decks from Base, review the diff, commit,
# push. Run this after making any Base edit you want reflected on
# shixiangcap.com.
#
#   npm run publish:decks
#
# Steps:
#   1. npm run sync:decks         (lark-cli → content/decks.ts + public/covers/)
#   2. if nothing changed → exit 0, no commit, no push
#   3. print the diff stat so you can sanity-check before git action
#   4. git add + commit with today's date + push origin main
#   5. Vercel auto-builds within ~90s
#
# If any step fails the script stops (set -e) — rerun once resolved.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "📥  Step 1/4  —  syncing decks from Base..."
npm run --silent sync:decks

# Only interested in tracked paths the sync can touch.
CHANGED_PATHS="content/decks.ts public/covers/"

if git diff --quiet -- $CHANGED_PATHS; then
  echo
  echo "✓  Nothing changed — Base is already in sync with the repo. Exiting."
  exit 0
fi

echo
echo "📝  Step 2/4  —  diff summary:"
git diff --stat -- $CHANGED_PATHS

echo
echo "💾  Step 3/4  —  committing..."
git add -- $CHANGED_PATHS
COMMIT_MSG="content: sync decks from Base ($(date +%Y-%m-%d))"
git commit -m "$COMMIT_MSG"

echo
echo "🚀  Step 4/4  —  pushing to origin/main..."
git push origin main

echo
echo "✅  Done. Vercel will deploy in ~90s."
echo "    https://shixiang-website-ten.vercel.app/reports"
