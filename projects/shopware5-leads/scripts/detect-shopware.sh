#!/bin/bash
# Shopware 5 Detection Script
# Checks for SW5 indicators in a given URL

URL="$1"
if [ -z "$URL" ]; then
    echo "Usage: $0 <url>"
    exit 1
fi

# Add https if missing
if [[ ! "$URL" =~ ^https?:// ]]; then
    URL="https://$URL"
fi

echo "Analyzing: $URL"
echo "---"

# Fetch headers and body
RESPONSE=$(curl -sL -A "Mozilla/5.0 (compatible; LeadBot/1.0)" -w "\n%{http_code}" --max-time 15 "$URL" 2>/dev/null)
HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "HTTP Status: $HTTP_CODE"

# Check for Shopware indicators
SW_INDICATORS=0

# Meta generator tag
if echo "$BODY" | grep -qi 'content="Shopware'; then
    echo "✓ Found: Shopware meta generator"
    SW_INDICATORS=$((SW_INDICATORS + 1))
fi

# Responsive theme path
if echo "$BODY" | grep -qi 'themes/Frontend/Responsive'; then
    echo "✓ Found: Shopware 5 Responsive Theme"
    SW_INDICATORS=$((SW_INDICATORS + 1))
fi

# SW5 specific JS/CSS
if echo "$BODY" | grep -qi 'jquery.shopware.js\|shopware-ag.de'; then
    echo "✓ Found: Shopware JS reference"
    SW_INDICATORS=$((SW_INDICATORS + 1))
fi

# Cookie/session pattern
if echo "$BODY" | grep -qi 'session-\|shop-session'; then
    echo "✓ Found: Shopware session pattern"
    SW_INDICATORS=$((SW_INDICATORS + 1))
fi

# sArticle URL pattern on page
if echo "$BODY" | grep -qi 'detail/index/sArticle\|listing/index'; then
    echo "✓ Found: SW5 URL patterns"
    SW_INDICATORS=$((SW_INDICATORS + 1))
fi

# Check for SW6 indicators (to differentiate)
SW6_FOUND=0
if echo "$BODY" | grep -qi 'Storefront\|sw-icon\|sw-button'; then
    echo "⚠ Note: Possible SW6 indicators found"
    SW6_FOUND=1
fi

echo "---"
echo "Shopware 5 confidence: $SW_INDICATORS/5 indicators"
if [ $SW6_FOUND -eq 1 ]; then
    echo "Note: May be Shopware 6"
fi
