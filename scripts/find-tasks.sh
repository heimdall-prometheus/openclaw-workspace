#!/bin/bash
# Find tasks across all PROJECT.md files
# Usage: ./find-tasks.sh [status]
# Status: open, done, all (default: open)

WORKSPACE="${WORKSPACE:-$HOME/.openclaw/workspace}"
STATUS="${1:-open}"

echo "🔍 Searching tasks ($STATUS)..."
echo ""

if [ "$STATUS" = "open" ]; then
  grep -rn "^\- \[ \]" "$WORKSPACE/projects" "$WORKSPACE/marketing" --include="PROJECT.md" 2>/dev/null | \
    sed 's|.*/projects/|📁 |' | sed 's|.*/marketing/|📁 |' | sed 's|/PROJECT.md:| → |'
elif [ "$STATUS" = "done" ]; then
  grep -rn "^\- \[x\]" "$WORKSPACE/projects" "$WORKSPACE/marketing" --include="PROJECT.md" 2>/dev/null | \
    sed 's|.*/projects/|📁 |' | sed 's|.*/marketing/|📁 |' | sed 's|/PROJECT.md:| → |'
else
  grep -rn "^\- \[" "$WORKSPACE/projects" "$WORKSPACE/marketing" --include="PROJECT.md" 2>/dev/null | \
    sed 's|.*/projects/|📁 |' | sed 's|.*/marketing/|📁 |' | sed 's|/PROJECT.md:| → |'
fi

echo ""
echo "📊 Summary:"
OPEN=$(grep -r "^\- \[ \]" "$WORKSPACE/projects" "$WORKSPACE/marketing" --include="PROJECT.md" 2>/dev/null | wc -l)
DONE=$(grep -r "^\- \[x\]" "$WORKSPACE/projects" "$WORKSPACE/marketing" --include="PROJECT.md" 2>/dev/null | wc -l)
echo "   Open: $OPEN"
echo "   Done: $DONE"
