import 'package:flutter/foundation.dart';

enum AuthStatus {
  idle,
  loading,
  success,
  error,
}

class AuthProvider extends ChangeNotifier {
  AuthStatus _status = AuthStatus.idle;
  String? _errorMessage;
  String? _token;

  AuthStatus get status => _status;
  String? get errorMessage => _errorMessage;
  String? get token => _token;
  bool get isAuthenticated => _token != null;
  bool get isLoading => _status == AuthStatus.loading;

  // Login Methode (API Integration vorbereitet)
  Future<void> login(String email, String password) async {
    _status = AuthStatus.loading;
    _errorMessage = null;
    notifyListeners();

    try {
      // Simuliere API Call (später durch echte API ersetzen)
      await Future.delayed(const Duration(seconds: 2));

      // Demo: Erfolgreicher Login bei test@test.de
      if (email == 'test@test.de' && password == 'Test1234') {
        _token = 'demo_token_${DateTime.now().millisecondsSinceEpoch}';
        _status = AuthStatus.success;
        _errorMessage = null;
      } else {
        throw Exception('Ungültige E-Mail oder Passwort');
      }
    } catch (e) {
      _status = AuthStatus.error;
      _errorMessage = e.toString().replaceAll('Exception: ', '');
      _token = null;
    }

    notifyListeners();
  }

  // Register Methode (API Integration vorbereitet)
  Future<void> register({
    required String username,
    required String email,
    required String password,
  }) async {
    _status = AuthStatus.loading;
    _errorMessage = null;
    notifyListeners();

    try {
      // Simuliere API Call (später durch echte API ersetzen)
      await Future.delayed(const Duration(seconds: 2));

      // Demo: Email bereits vergeben bei existing@test.de
      if (email == 'existing@test.de') {
        throw Exception('Diese E-Mail-Adresse ist bereits vergeben');
      }

      // Erfolgreiche Registrierung
      _token = 'demo_token_${DateTime.now().millisecondsSinceEpoch}';
      _status = AuthStatus.success;
      _errorMessage = null;
    } catch (e) {
      _status = AuthStatus.error;
      _errorMessage = e.toString().replaceAll('Exception: ', '');
      _token = null;
    }

    notifyListeners();
  }

  // Logout
  void logout() {
    _token = null;
    _status = AuthStatus.idle;
    _errorMessage = null;
    notifyListeners();
  }

  // Error zurücksetzen
  void clearError() {
    _errorMessage = null;
    _status = AuthStatus.idle;
    notifyListeners();
  }
}
