# SSH Konfiguration Template

## ~/.ssh/config Entry Template
```
Host [server-name]
    HostName [ip-or-domain]
    User [username]
    IdentityFile ~/.ssh/heimdall_key
    IdentitiesOnly yes
```

## Beispiel
```
Host prometheus-prod
    HostName prod.prometheus-labs.io
    User heimdall
    IdentityFile ~/.ssh/heimdall_key
    IdentitiesOnly yes
```

## Notizen
- Ed25519 Schlüssel: sicher und schnell
- IdentitiesOnly: verhindert andere Key-Tests
- Bereit für Server-Details von Erik