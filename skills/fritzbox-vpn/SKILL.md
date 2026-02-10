# FRITZ!Box VPN Skill

Connect to Erik's residential network (Kiel, Germany) via IPSec VPN to bypass datacenter IP blocks.

## Purpose
- Route traffic through residential IP (31.19.31.13 - Vodafone)
- Bypass bot detection that blocks datacenter IPs
- Access services that require residential IP

## Connection

### Connect
```bash
sudo vpnc /etc/vpnc/fritzbox-test.conf
```

### Disconnect
```bash
sudo vpnc-disconnect
```

### Status
```bash
# Check if connected
ip addr show tun0
pgrep vpnc && echo "VPN running"

# Check exit IP
curl -s ifconfig.me
```

## Credentials
**Config file:** `/etc/vpnc/fritzbox-test.conf`
**Full credentials:** `credentials/fritzbox-vpn.md`

| Field | Value |
|-------|-------|
| Gateway | waldersee88.hopto.org |
| IPSec ID | heimdall |
| Username | heimdall |
| Tunnel IP | 192.168.178.202 |
| Exit IP | 31.19.31.13 |

## Routing Traffic Through VPN

By default, only traffic to 192.168.178.0/24 goes through VPN.

### Route specific site through VPN
```bash
# Get IP of target site
host www.reddit.com

# Add route through VPN
sudo ip route add 146.75.121.140 dev tun0

# Remove route
sudo ip route del 146.75.121.140 dev tun0
```

### Route ALL traffic through VPN (CAUTION!)
```bash
# This will route everything through residential IP
# May break server functionality!
sudo ip route add default dev tun0 metric 50
```

## Use Cases
1. **Reddit account creation** - Reddit blocks datacenter IPs
2. **Social media automation** - Many platforms flag datacenter IPs
3. **Web scraping** - Bypass IP-based rate limits
4. **Testing geo-restricted content** - German residential IP

## Network Info
- **ISP:** Vodafone GmbH (AS3209)
- **Location:** Kiel, Germany
- **Type:** Residential (Cable)
- **Router:** FRITZ!Box 6590 Cable

## Troubleshooting

### VPN connects but traffic doesn't route
Check default route:
```bash
ip route show | grep default
```
Add specific routes for target sites rather than changing default.

### Connection timeout
- Check if FRITZ!Box is reachable: `ping waldersee88.hopto.org`
- DynDNS might need update
- Vodafone might have changed public IP

### "No such process" on disconnect
VPN already disconnected, ignore the error.

## Current Status (2026-02-02)
⚠️ **VPN connects but routing through tunnel doesn't work**
- tun0 interface: UP
- Tunnel IP assigned: 192.168.178.202
- But traffic routed through tun0 times out

Possible causes:
1. FRITZ!Box NAT/firewall not forwarding return traffic
2. Split tunneling config issue
3. MTU mismatch

**TODO:** Debug with Erik - might need FRITZ!Box config changes.

## Created
2026-02-02
