# 🔌 FangFührer - API Integration Guide

## 🎯 Übersicht

Die Auth Screens sind **vollständig vorbereitet** für Backend-Integration.
Aktuell simulieren sie API Calls mit 2 Sekunden Delay.

---

## 📡 Benötigte Endpoints

### 1. Login Endpoint
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "userPassword123"
}

Success Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "username": "anglerfan",
    "email": "user@example.com"
  }
}

Error Response (401):
{
  "error": "Ungültige E-Mail oder Passwort"
}

Error Response (400):
{
  "error": "E-Mail und Passwort erforderlich"
}
```

---

### 2. Register Endpoint
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "username": "anglerfan",
  "email": "user@example.com",
  "password": "userPassword123"
}

Success Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "username": "anglerfan",
    "email": "user@example.com"
  }
}

Error Response (409):
{
  "error": "Diese E-Mail-Adresse ist bereits vergeben"
}

Error Response (400):
{
  "error": "Username, E-Mail und Passwort erforderlich"
}
```

---

## 🛠️ Integration Steps

### Step 1: HTTP Package hinzufügen

**pubspec.yaml:**
```yaml
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.1
  flutter_svg: ^2.0.9
  http: ^1.1.0  # ← NEU
```

```bash
flutter pub get
```

---

### Step 2: API Service erstellen

**lib/services/api_service.dart:**
```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'https://your-api.com'; // ← DEINE API URL
  
  // Login API Call
  static Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else if (response.statusCode == 401) {
      final error = json.decode(response.body);
      throw Exception(error['error'] ?? 'Login fehlgeschlagen');
    } else {
      throw Exception('Netzwerkfehler: ${response.statusCode}');
    }
  }

  // Register API Call
  static Future<Map<String, dynamic>> register({
    required String username,
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'username': username,
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body);
    } else if (response.statusCode == 409) {
      final error = json.decode(response.body);
      throw Exception(error['error'] ?? 'E-Mail bereits vergeben');
    } else if (response.statusCode == 400) {
      final error = json.decode(response.body);
      throw Exception(error['error'] ?? 'Ungültige Eingaben');
    } else {
      throw Exception('Netzwerkfehler: ${response.statusCode}');
    }
  }
}
```

---

### Step 3: AuthProvider anpassen

**lib/providers/auth_provider.dart:**
```dart
import 'package:flutter/foundation.dart';
import '../services/api_service.dart'; // ← NEU

enum AuthStatus { idle, loading, success, error }

class AuthProvider extends ChangeNotifier {
  AuthStatus _status = AuthStatus.idle;
  String? _errorMessage;
  String? _token;
  Map<String, dynamic>? _user; // ← NEU für User-Daten

  // Getter...
  AuthStatus get status => _status;
  String? get errorMessage => _errorMessage;
  String? get token => _token;
  Map<String, dynamic>? get user => _user; // ← NEU
  bool get isAuthenticated => _token != null;
  bool get isLoading => _status == AuthStatus.loading;

  // Login mit echter API
  Future<void> login(String email, String password) async {
    _status = AuthStatus.loading;
    _errorMessage = null;
    notifyListeners();

    try {
      // ← ECHTE API CALL STATT SIMULATION
      final response = await ApiService.login(
        email: email,
        password: password,
      );

      _token = response['token'];
      _user = response['user'];
      _status = AuthStatus.success;
      _errorMessage = null;

      // Optional: Token persistent speichern
      // await SecureStorage.saveToken(_token!);

    } catch (e) {
      _status = AuthStatus.error;
      _errorMessage = e.toString().replaceAll('Exception: ', '');
      _token = null;
      _user = null;
    }

    notifyListeners();
  }

  // Register mit echter API
  Future<void> register({
    required String username,
    required String email,
    required String password,
  }) async {
    _status = AuthStatus.loading;
    _errorMessage = null;
    notifyListeners();

    try {
      // ← ECHTE API CALL STATT SIMULATION
      final response = await ApiService.register(
        username: username,
        email: email,
        password: password,
      );

      _token = response['token'];
      _user = response['user'];
      _status = AuthStatus.success;
      _errorMessage = null;

      // Optional: Token persistent speichern
      // await SecureStorage.saveToken(_token!);

    } catch (e) {
      _status = AuthStatus.error;
      _errorMessage = e.toString().replaceAll('Exception: ', '');
      _token = null;
      _user = null;
    }

    notifyListeners();
  }

  // Logout (bleibt gleich)
  void logout() {
    _token = null;
    _user = null;
    _status = AuthStatus.idle;
    _errorMessage = null;
    notifyListeners();
  }

  // Error clearing (bleibt gleich)
  void clearError() {
    _errorMessage = null;
    _status = AuthStatus.idle;
    notifyListeners();
  }
}
```

---

### Step 4: Token Persistence (Optional aber empfohlen)

**pubspec.yaml:**
```yaml
dependencies:
  flutter_secure_storage: ^9.0.0  # ← Für sichere Token-Speicherung
```

**lib/services/secure_storage.dart:**
```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  static const _storage = FlutterSecureStorage();
  static const _tokenKey = 'auth_token';

  // Token speichern
  static Future<void> saveToken(String token) async {
    await _storage.write(key: _tokenKey, value: token);
  }

  // Token laden
  static Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }

  // Token löschen
  static Future<void> deleteToken() async {
    await _storage.delete(key: _tokenKey);
  }
}
```

**AuthProvider erweitern:**
```dart
// In login() nach erfolgreichem API Call:
await SecureStorage.saveToken(_token!);

// In logout():
await SecureStorage.deleteToken();

// Beim App-Start (in main.dart):
final token = await SecureStorage.getToken();
if (token != null) {
  // User ist bereits eingeloggt
  authProvider.restoreSession(token);
}
```

---

## 🔒 Security Best Practices

### 1. HTTPS verwenden
```dart
static const String baseUrl = 'https://your-api.com'; // ← Immer HTTPS!
```

### 2. Token Expiration handling
```dart
// Token mit Expiry speichern
class TokenData {
  final String token;
  final DateTime expiresAt;
  
  bool get isExpired => DateTime.now().isAfter(expiresAt);
}
```

### 3. Refresh Token Flow (empfohlen)
```dart
// Wenn Access Token expired
if (tokenData.isExpired) {
  final newToken = await ApiService.refreshToken(refreshToken);
  await SecureStorage.saveToken(newToken);
}
```

### 4. Biometrische Auth (Optional)
```dart
// Fingerprint/Face ID vor Token-Restore
import 'package:local_auth/local_auth.dart';

final localAuth = LocalAuthentication();
final didAuthenticate = await localAuth.authenticate(
  localizedReason: 'Bitte authentifizieren',
);

if (didAuthenticate) {
  final token = await SecureStorage.getToken();
  // ...
}
```

---

## 🧪 Testing mit echter API

### Test 1: Erfolgreicher Login
```dart
test('Login with valid credentials', () async {
  final authProvider = AuthProvider();
  await authProvider.login('test@test.de', 'Test1234');
  
  expect(authProvider.status, AuthStatus.success);
  expect(authProvider.token, isNotNull);
  expect(authProvider.user, isNotNull);
});
```

### Test 2: Login Error
```dart
test('Login with invalid credentials', () async {
  final authProvider = AuthProvider();
  await authProvider.login('wrong@test.de', 'WrongPass');
  
  expect(authProvider.status, AuthStatus.error);
  expect(authProvider.errorMessage, contains('Ungültige'));
});
```

---

## 🚀 Deployment Checklist

### Backend Requirements:
- [ ] API Endpoints implementiert (/auth/login, /auth/register)
- [ ] CORS konfiguriert für Flutter Web
- [ ] HTTPS aktiviert (SSL-Zertifikat)
- [ ] Rate Limiting aktiviert (gegen Brute-Force)
- [ ] Input Validation (Backend-seitig!)
- [ ] Password Hashing (bcrypt, argon2)
- [ ] JWT Token Generation
- [ ] Token Expiration (z.B. 7 Tage)

### Frontend Changes:
- [ ] `baseUrl` in `api_service.dart` setzen
- [ ] HTTP Package installiert (`flutter pub get`)
- [ ] Token Persistence implementiert
- [ ] Error Messages angepasst (falls Backend andere Texte sendet)
- [ ] Loading States getestet
- [ ] Netzwerk-Fehler-Handling getestet

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error (Web)
**Problem:** API Call blockiert durch CORS
**Solution:** Backend CORS-Header setzen:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Issue 2: Certificate Error (Android)
**Problem:** SSL-Zertifikat nicht vertrauenswürdig
**Solution:** Android Network Security Config:
```xml
<!-- android/app/src/main/res/xml/network_security_config.xml -->
<network-security-config>
  <base-config cleartextTrafficPermitted="false" />
</network-security-config>
```

### Issue 3: Timeout Errors
**Problem:** API antwortet zu langsam
**Solution:** Timeout konfigurieren:
```dart
final response = await http.post(
  Uri.parse('$baseUrl/api/auth/login'),
  headers: {'Content-Type': 'application/json'},
  body: json.encode({...}),
).timeout(Duration(seconds: 10)); // ← Timeout
```

---

## 📊 API Response Examples

### Successful Login
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuZ2xlckZhbiIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "user": {
    "id": "user_123",
    "username": "anglerfan",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Failed Login
```json
{
  "error": "Ungültige E-Mail oder Passwort",
  "code": "INVALID_CREDENTIALS"
}
```

### Email Already Exists
```json
{
  "error": "Diese E-Mail-Adresse ist bereits vergeben",
  "code": "EMAIL_ALREADY_EXISTS"
}
```

---

## ✅ Integration Complete Checklist

- [ ] HTTP Package installiert
- [ ] API Service erstellt
- [ ] AuthProvider angepasst
- [ ] Token Persistence implementiert
- [ ] Error Handling getestet
- [ ] Loading States funktionieren
- [ ] Success States funktionieren
- [ ] HTTPS aktiviert
- [ ] CORS konfiguriert
- [ ] Rate Limiting vorhanden
- [ ] Backend deployed
- [ ] Frontend mit Backend verbunden
- [ ] End-to-End Test erfolgreich

---

**Status:** 🔌 Ready for Backend Integration!
Alle UI-Komponenten sind vorbereitet. Nur noch API URL setzen und testen! 🎣
