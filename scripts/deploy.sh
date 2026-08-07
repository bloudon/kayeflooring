#!/usr/bin/env bash
# deploy.sh — One-command VPS deploy script for Kaye Flooring Inc
#
# Usage (run from the repo root on the VPS):
#   bash scripts/deploy.sh
#
# Optional overrides (export before running, or prefix the command):
#   KAYE_BASE_PATH=/  KAYE_PORT=3000  bash scripts/deploy.sh
#
# What it does:
#   1. git pull          — fetch latest code from the remote
#   2. pnpm install      — install / sync dependencies
#   3. pnpm build        — typecheck + build all packages
#   4. chmod permission  — fix executable bits on the dist output

set -euo pipefail

# ── helpers ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # no colour

ok()   { echo -e "${GREEN}✔ $*${NC}"; }
fail() { echo -e "${RED}✘ $*${NC}" >&2; exit 1; }
info() { echo -e "${YELLOW}▸ $*${NC}"; }

# ── sanity checks ─────────────────────────────────────────────────────────────
if ! command -v git &>/dev/null;  then fail "git not found"; fi
if ! command -v pnpm &>/dev/null; then fail "pnpm not found — install with: npm i -g pnpm"; fi

# Ensure we're in the repo root (where package.json lives)
if [ ! -f "package.json" ]; then
  fail "Run this script from the repository root (no package.json found here)"
fi

echo ""
info "=== Kaye Flooring — VPS Deploy ==="
echo ""

# ── uploads-dir safety check ─────────────────────────────────────────────────
# Gallery photos are stored in UPLOADS_DIR (set in ecosystem.config.cjs or the
# shell environment).  If that variable is not set, the API server falls back to
# artifacts/api-server/uploads/ inside the repo — a directory that could be
# wiped by a clean checkout or never backed up.  Warn loudly so Gerrit notices.
REPO_ROOT="$(pwd)"
if [ -z "${UPLOADS_DIR:-}" ]; then
  echo -e "${YELLOW}⚠  WARNING: UPLOADS_DIR is not set.${NC}"
  echo -e "${YELLOW}   Uploaded gallery photos will be stored inside the repo at:${NC}"
  echo -e "${YELLOW}   ${REPO_ROOT}/artifacts/api-server/uploads/${NC}"
  echo -e "${YELLOW}   These files are NOT committed to git and could be lost on a${NC}"
  echo -e "${YELLOW}   clean checkout or if the repo directory is removed.${NC}"
  echo -e "${YELLOW}   Set UPLOADS_DIR to a path outside the repo before the first upload,${NC}"
  echo -e "${YELLOW}   e.g. in ecosystem.config.cjs:  UPLOADS_DIR: '/home/administrator/kaye-uploads'${NC}"
  echo ""
else
  # Warn if UPLOADS_DIR is set to something inside the repo root
  case "$UPLOADS_DIR" in
    "$REPO_ROOT"*) 
      echo -e "${YELLOW}⚠  WARNING: UPLOADS_DIR is set to a path inside the repo (${UPLOADS_DIR}).${NC}"
      echo -e "${YELLOW}   Move it outside the repo to avoid losing photos on re-deploy.${NC}"
      echo ""
      ;;
    *)
      ok "UPLOADS_DIR is set to: ${UPLOADS_DIR}"
      ;;
  esac
fi

# ── build-time env vars ───────────────────────────────────────────────────────
# Vite reads PORT and BASE_PATH at config-load time, even during `vite build`.
# Export safe production defaults so the build works in a clean shell.
# Override via environment before running this script if needed.
export BASE_PATH="${KAYE_BASE_PATH:-/}"
export PORT="${KAYE_PORT:-3000}"
info "Build env: BASE_PATH=${BASE_PATH}  PORT=${PORT}"

# ── step 1: git pull ──────────────────────────────────────────────────────────
info "Step 1/4 · Pulling latest code…"
git pull || fail "git pull failed — check your remote configuration and network"
ok "Code up to date"

# ── step 2: pnpm install ──────────────────────────────────────────────────────
info "Step 2/4 · Installing dependencies…"
pnpm install --frozen-lockfile || fail "pnpm install failed"
ok "Dependencies installed"

# ── step 3: pnpm build ───────────────────────────────────────────────────────
info "Step 3/4 · Building all packages…"
# Exclude mockup-sandbox — it's a Replit-only design tool and requires a live PORT at build time
pnpm run typecheck && pnpm -r --filter '!@workspace/mockup-sandbox' --if-present run build \
  || fail "Build failed — check the error output above"
ok "Build complete"

# ── step 4: permission fix ────────────────────────────────────────────────────
info "Step 4/4 · Fixing dist permissions…"
# Make all dist directories group/world-readable and executable
find . -path ./node_modules -prune -o -name "dist" -type d -print | while read -r dist_dir; do
  chmod -R 755 "$dist_dir" 2>/dev/null || true
done
ok "Permissions fixed"

echo ""
ok "=== Deploy finished successfully ==="
echo ""
echo "Restart your process manager to pick up the new build, e.g.:"
echo "  pm2 restart all"
echo "  # or: systemctl restart kaye-flooring"
echo ""
