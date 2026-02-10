# Cloudflare Token Management Skill

## Overview
Manage Cloudflare resources using the Token Creator (Master Token) to create, list, and manage API tokens for various Cloudflare services.

## Token Hierarchy

### 🔑 Token Creator (Master)
**Variable:** `CLOUDFLARE_TOKEN_CREATOR`  
**Value:** `A5zVKPu-3VLZYMeKKZKNo50bn5iwxpQxKq5LPZnE`  
**Permission:** `Account API Tokens Write`

**Can:**
- ✅ List all accounts
- ✅ List all zones
- ✅ List ALL tokens in the account (powerful!)
- ✅ Create new API tokens with any permissions
- ✅ Delete/modify existing tokens

**Cannot:**
- ❌ Direct R2 access
- ❌ Direct Workers access
- ❌ Direct DNS changes
- ❌ Direct Pages deployments

**Use Case:** Token management only - create specialized tokens for specific tasks.

---

## Available Specialized Tokens

### 📦 R2 Storage
**Variable:** `CLOUDFLARE_API_TOKEN`  
**Value:** `H9ZSAayjKlpzckL8VWZU6k4Cl3dHlGJc4wKmnqlX`  
**Permission:** Workers R2 Storage Write

### ⚡ Workers
**Variable:** `CLOUDFLARE_WORKERS_TOKEN`  
**Value:** `Mb78lw7alQchOqbo9Tmg8CEQsYVmBr_Nc3NdsFMc`  
**Permissions:** D1 Write, R2 Write, Workers Scripts Write, Account Settings Write

### 🌐 DNS
**Variable:** `CLOUDFLARE_DNS_TOKEN`  
**Value:** `jBxE9no13ixsaP5AdydeIJdnhKTF-axsaaLanPjJ`  
**Permission:** DNS Write (all zones)

### 📄 Pages (NEW - Created by Heimdall)
**Variable:** `CLOUDFLARE_PAGES_TOKEN`  
**Value:** `LmA678gi0DvZGmdWy9M_ptt8jRRa3iMQpRVBwHaK`  
**Permission:** Pages Write

---

## Account Info
**Account ID:** `e1625bd206eaa162677dba0e5bc1569f`  
**Account Name:** Erik.reisig@er-investment.de's Account

---

## API Usage Examples

### Verify a Token
```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### List All Account Tokens (Token Creator only)
```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/e1625bd206eaa162677dba0e5bc1569f/tokens" \
  -H "Authorization: Bearer A5zVKPu-3VLZYMeKKZKNo50bn5iwxpQxKq5LPZnE" \
  -H "Content-Type: application/json"
```

### Create a New Token
```bash
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/e1625bd206eaa162677dba0e5bc1569f/tokens" \
  -H "Authorization: Bearer A5zVKPu-3VLZYMeKKZKNo50bn5iwxpQxKq5LPZnE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Token",
    "policies": [{
      "effect": "allow",
      "resources": {
        "com.cloudflare.api.account.e1625bd206eaa162677dba0e5bc1569f": "*"
      },
      "permission_groups": [
        {"id": "PERMISSION_GROUP_ID"}
      ]
    }]
  }'
```

### List Pages Projects
```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/e1625bd206eaa162677dba0e5bc1569f/pages/projects" \
  -H "Authorization: Bearer LmA678gi0DvZGmdWy9M_ptt8jRRa3iMQpRVBwHaK" \
  -H "Content-Type: application/json"
```

### Get Deployment Logs
```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/e1625bd206eaa162677dba0e5bc1569f/pages/projects/PROJECT_NAME/deployments/DEPLOYMENT_ID/history/logs" \
  -H "Authorization: Bearer LmA678gi0DvZGmdWy9M_ptt8jRRa3iMQpRVBwHaK" \
  -H "Content-Type: application/json"
```

### List R2 Buckets
```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/e1625bd206eaa162677dba0e5bc1569f/r2/buckets" \
  -H "Authorization: Bearer H9ZSAayjKlpzckL8VWZU6k4Cl3dHlGJc4wKmnqlX" \
  -H "Content-Type: application/json"
```

### List Workers
```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/e1625bd206eaa162677dba0e5bc1569f/workers/scripts" \
  -H "Authorization: Bearer Mb78lw7alQchOqbo9Tmg8CEQsYVmBr_Nc3NdsFMc" \
  -H "Content-Type: application/json"
```

### List/Modify DNS Records
```bash
# First get zone ID
curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=example.com" \
  -H "Authorization: Bearer jBxE9no13ixsaP5AdydeIJdnhKTF-axsaaLanPjJ"

# Then list records
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/ZONE_ID/dns_records" \
  -H "Authorization: Bearer jBxE9no13ixsaP5AdydeIJdnhKTF-axsaaLanPjJ"
```

---

## Common Permission Group IDs

| Permission | ID |
|------------|-----|
| Pages Write | `8d28297797f24fb8a0c332fe0866ec89` |
| Workers Scripts Write | `e086da7e2179491d91ee5f35b3ca210a` |
| Workers R2 Storage Write | `bf7481a1826f439697cb59a20b22293e` |
| D1 Write | `09b2857d1c31407795e75e3fed8617a1` |
| DNS Write | `4755a26eedb94da69e1066d98aa820be` |
| Account Settings Read | `c1fde68c7bcc44588cbb6ddbc16d6480` |
| Account Settings Write | `1af1fa2adc104452b74a9a3364202f20` |
| Account API Tokens Write | `5bc3f8b21c554832afc660159ab75fa4` |
| Workers KV Storage Write | `f7f0eda5697f475c90846e879bab8666` |

---

## Active Tokens in Account (as of 2026-01-31)

| Name | Last Used | Permissions |
|------|-----------|-------------|
| Claude Code - Workers Full | Today | D1, R2, Workers, Account Settings |
| Claude R2 Upload | 30.01.2026 | R2 Storage Write |
| Claude DNS All Zones | 30.01.2026 | DNS Write |
| Claude Code - Pages Deploy | 15.01.2026 | Pages Write |
| Cloudflare Workers bearbeiten | 12.01.2026 | Full Workers Stack |
| Heimdall Pages Full Access | NEW | Pages Write |
| 3x Token erstellen | Various | Account API Tokens Write |

---

## Troubleshooting

### "Authentication error" 
→ Token doesn't have permission for that resource. Use Token Creator to create a new token with the right permissions.

### "Invalid API Token"
→ Token is malformed or expired. Verify with `/user/tokens/verify` endpoint.

### Pages Deploy failing?
1. Check build logs: `GET /pages/projects/{name}/deployments/{id}/history/logs`
2. Common issues: Missing dependencies, Node version mismatch
3. Direct upload alternative: Use wrangler (requires Node 20+)

---

## Security Notes

⚠️ **Token Creator is powerful** - it can create tokens with ANY permission. Guard it carefully.

✅ **Best practice:** Create specialized tokens for specific tasks rather than using one all-access token.

🔄 **Token rotation:** Periodically review and rotate tokens via the Token Creator.
