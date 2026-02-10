# FangFührer - Flutter Auth Screens

Moderne Login & Register Screens für die FangFührer Angelfreunde-App.

## 🎨 Features

### Login Screen
- ✅ Email + Passwort Felder mit Validation
- ✅ "Anmelden" Button mit Loading State
- ✅ "Passwort vergessen?" Link (UI ready, Funktionalität folgt)
- ✅ "Noch kein Konto? Registrieren" Link
- ✅ Error Handling mit visueller Anzeige
- ✅ Email-Format-Validierung

### Register Screen
- ✅ Username, Email, Passwort, Passwort bestätigen
- ✅ "Registrieren" Button mit Loading State
- ✅ "Bereits ein Konto? Anmelden" Link
- ✅ Validation:
  - Username mindestens 3 Zeichen
  - Email-Format-Validierung
  - Passwort mindestens 8 Zeichen
  - Passwort muss Großbuchstaben + Zahlen enthalten
  - Passwörter müssen übereinstimmen
- ✅ Error Handling (z.B. Email bereits vergeben)

### Design
- 🐟 FangFührer Branding (Blau/Grün Ozean-Farbschema)
- 🎨 Clean, moderne UI mit Material Design 3
- 🇩🇪 Deutsche Texte
- 📱 Responsive Layout
- ⚡ Loading States & Animationen

### State Management
- ✅ Provider Pattern
- ✅ AuthProvider für Auth-Logik
- ✅ API Integration vorbereitet (nur UI implementiert)

## 🚀 Installation

### Prerequisites
- Flutter SDK (3.0.0 oder höher)
- Dart SDK

### Setup
```bash
# Dependencies installieren
flutter pub get

# App starten
flutter run
```

## 🧪 Demo Credentials

### Login Test
- **Email:** `test@test.de`
- **Passwort:** `Test1234`
- ✅ Erfolgreicher Login

### Register Test
- Beliebige neue Email funktioniert
- ❌ `existing@test.de` - simuliert "Email bereits vergeben" Error

## 📁 Projekt-Struktur

```
lib/
├── main.dart                    # App Entry Point
├── providers/
│   └── auth_provider.dart       # State Management (Provider)
├── screens/
│   ├── login_screen.dart        # Login UI
│   └── register_screen.dart     # Register UI
├── theme/
│   └── app_theme.dart           # FangFührer Design System
└── widgets/
    └── auth_text_field.dart     # Wiederverwendbares TextField
```

## 🎨 Farbschema

| Farbe | Hex | Verwendung |
|-------|-----|------------|
| Primary Blue | `#1E88E5` | Haupt-UI-Elemente, Buttons |
| Primary Green | `#26A69A` | Akzent-Farbe, Links |
| Accent Green | `#66BB6A` | Success States |
| Dark Blue | `#0D47A1` | Dunkle Akzente |
| Light Blue | `#E3F2FD` | Hintergründe, Input-Felder |
| Error Red | `#EF5350` | Fehler-Anzeigen |

## 🔧 API Integration (vorbereitet)

Die Auth Screens sind für API-Integration vorbereitet:

### Login API Call (Beispiel)
```dart
Future<void> login(String email, String password) async {
  _status = AuthStatus.loading;
  notifyListeners();

  try {
    final response = await http.post(
      Uri.parse('YOUR_API_ENDPOINT/auth/login'),
      body: json.encode({'email': email, 'password': password}),
      headers: {'Content-Type': 'application/json'},
    );
    
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      _token = data['token'];
      _status = AuthStatus.success;
    } else {
      throw Exception('Login fehlgeschlagen');
    }
  } catch (e) {
    _status = AuthStatus.error;
    _errorMessage = e.toString();
  }
  
  notifyListeners();
}
```

### Register API Call (Beispiel)
```dart
Future<void> register({...}) async {
  // Ähnliche Struktur wie Login
  // POST zu YOUR_API_ENDPOINT/auth/register
}
```

## 📝 Nächste Schritte

1. ✅ Auth Screens (FERTIG!)
2. 🔄 Backend API Integration
3. 🏠 Hauptseite / Dashboard
4. 🎣 Fang-Tracking Features
5. 👥 Freunde-System
6. 🗺️ Angelplatz-Karte

## 🐛 Bekannte Einschränkungen

- Passwort-Reset Flow ist nur UI (noch nicht implementiert)
- API Calls sind simuliert (2 Sekunden Delay)
- Keine persistente Session (Token wird nicht gespeichert)

## 📱 Screenshots

Die App zeigt:
- Login Screen mit Fisch-Icon und FangFührer Branding
- Register Screen mit vollständiger Validation
- Loading States während Auth
- Error Messages bei ungültigen Eingaben
- Moderne, saubere UI im Ozean-Theme

## 💡 Tipps

- Bei Änderungen am Theme → `app_theme.dart` bearbeiten
- Bei Auth-Logik → `auth_provider.dart` bearbeiten
- Wiederverwendbare Widgets in `widgets/` ablegen

---

Entwickelt mit ❤️ für die FangFührer Community 🐟
