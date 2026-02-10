# 🚀 FangFührer - Quick Start

## Installation & Setup (5 Minuten)

### 1. Flutter Setup prüfen
```bash
# Flutter installiert?
flutter --version

# Wenn nicht: https://docs.flutter.dev/get-started/install
```

### 2. Dependencies installieren
```bash
cd /home/reisig/.openclaw/workspace/projects/fangfuehrer-app
flutter pub get
```

### 3. App starten
```bash
# Im Web Browser (schnellste Option)
flutter run -d chrome

# Auf Android Emulator
flutter run -d <device-id>

# Devices anzeigen
flutter devices
```

## 🧪 Testing Guide

### Demo Login
1. App öffnet automatisch Login Screen
2. Eingeben:
   - Email: `test@test.de`
   - Passwort: `Test1234`
3. Click "Anmelden"
4. → ✅ "Login erfolgreich! 🎣"

### Demo Register
1. Click "Registrieren"
2. Eingeben:
   - Username: `testuser`
   - Email: `newuser@test.de` (nicht `existing@test.de`!)
   - Passwort: `Test1234`
   - Passwort bestätigen: `Test1234`
3. Click "Registrieren"
4. → ✅ "Registrierung erfolgreich! 🎣"

### Error Testing
- **Login:** Falsche Email → Error Message
- **Register:** `existing@test.de` → "E-Mail bereits vergeben"
- **Validation:** Schwaches Passwort → Rote Fehlermeldung

## 📱 Platforms

| Platform | Status |
|----------|--------|
| 🌐 Web | ✅ Fully Supported |
| 📱 Android | ✅ Ready |
| 🍎 iOS | ✅ Ready |
| 💻 Desktop | ⚠️ Untested |

## 🎨 UI Preview

```
┌──────────────────────┐
│   🐟 FangFührer      │
│ Deine Angelfreunde   │
├──────────────────────┤
│                      │
│  E-Mail              │
│  ┌────────────────┐  │
│  │ deine@email.de │  │
│  └────────────────┘  │
│                      │
│  Passwort            │
│  ┌────────────────┐  │
│  │ ••••••••       │  │
│  └────────────────┘  │
│                      │
│  Passwort vergessen? │
│                      │
│  ┌────────────────┐  │
│  │   Anmelden  ➜  │  │
│  └────────────────┘  │
│                      │
│ Noch kein Konto?     │
│    Registrieren      │
└──────────────────────┘
```

## 🔧 Troubleshooting

### "flutter: command not found"
```bash
# Flutter installieren: https://docs.flutter.dev/get-started/install
# Oder PATH setzen
export PATH="$PATH:/path/to/flutter/bin"
```

### Dependencies fehlen
```bash
flutter clean
flutter pub get
```

### Build Errors
```bash
flutter doctor  # System checken
flutter upgrade # Flutter updaten
```

## 📚 Weiterführende Docs

- **README.md** - Vollständige Projekt-Dokumentation
- **DEMO.md** - Detaillierter Demo-Guide
- **lib/theme/app_theme.dart** - Design System
- **lib/providers/auth_provider.dart** - Auth Logic

## ⚡ Performance

- Initial Load: ~2s (simulated API)
- Form Validation: Instant
- Transitions: 300ms smooth
- Bundle Size: ~15MB (Flutter Web)

## 🎯 Next Steps

1. ✅ Teste Login & Register
2. 🔌 Backend API integrieren
3. 🏠 Dashboard Screen bauen
4. 🎣 Features hinzufügen

**Ready to fish? Let's go! 🎣**
