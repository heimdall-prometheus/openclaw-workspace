# GitHub Account Creation für Heimdall

## 🎯 Account Details
- **Username:** `heimdall-prometheus`
- **Email:** `heim.dall@prometheus-labs.io`
- **Name:** Heimdall

## 📝 Schritte (Erik macht das kurz):

### 1. Signup
1. Öffne: https://github.com/signup
2. Email: `heim.dall@prometheus-labs.io`
3. Passwort: [Erik wählt sicheres Passwort]
4. Username: `heimdall-prometheus`

### 2. Email Verification
1. Check inbox von `heim.dall@prometheus-labs.io`
2. Klick Verification Link
3. Complete setup

### 3. SSH Key hinzufügen
1. GitHub Settings → SSH and GPG keys
2. "New SSH key" klicken
3. Title: `Heimdall Workspace`
4. Key:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAID3BVjfximt3JucrW0J2hj3seeUr6u6SSysPqR4b2080 heim.dall@prometheus-labs.io
```
5. Save

### 4. Fertig!
Dann sag mir Bescheid und ich teste die Verbindung:
```bash
ssh -T git@github.com
```

## 🔑 Credentials Storage
Passwort bitte in `credentials/github.md` speichern:
```markdown
# GitHub Account - Heimdall

- **Username:** heimdall-prometheus
- **Email:** heim.dall@prometheus-labs.io
- **Password:** [SECURE_PASSWORD]
- **Profile:** https://github.com/heimdall-prometheus
```