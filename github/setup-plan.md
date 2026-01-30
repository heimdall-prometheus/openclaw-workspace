# GitHub Setup für Heimdall

## 📋 Setup Plan

### 1. Account Erstellung
**Options:**
- **Username:** heimdall-ai, heimdall-assistant, oder erikreisig-heimdall
- **Email:** heim.dall@prometheus-labs.io
- **Name:** Heimdall (Erik's AI Assistant)

### 2. SSH Key Generation
```bash
# Generate ed25519 key for GitHub
ssh-keygen -t ed25519 -C "heim.dall@prometheus-labs.io" -f ~/.ssh/github_heimdall

# Display public key
cat ~/.ssh/github_heimdall.pub
```

### 3. SSH Config
```bash
# Add to ~/.ssh/config
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_heimdall
    IdentitiesOnly yes
```

### 4. Git Configuration
```bash
git config --global user.name "Heimdall"
git config --global user.email "heim.dall@prometheus-labs.io"
git config --global init.defaultBranch main
```

### 5. Test Connection
```bash
ssh -T git@github.com
# Should respond: Hi heimdall-ai! You've successfully authenticated...
```

## 🎯 Use Cases

### Repositories I'll manage:
- **mein-malbuch-monitoring** - Monitoring system we just built
- **heimdall-skills** - My skill library
- **prometheus-labs-tools** - Shared tools for Erik's projects
- **automation-scripts** - Various automation

### Workflow:
1. Code changes locally
2. Commit with meaningful messages
3. Push to GitHub
4. Erik can review/collaborate
5. Deploy to production

## 🔒 Security
- SSH key auth (no passwords)
- Separate key for GitHub (not same as server keys)
- Ed25519 (modern, secure)
- Keys stored in ~/.ssh/

## 📦 First Repository Ideas
1. **mein-malbuch-monitoring** - Today's work packaged
2. **heimdall-memory** - My memory/learning system
3. **erik-assistant-tools** - Tools I use daily