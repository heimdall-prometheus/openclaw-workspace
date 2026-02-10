# ✅ FangFührer Auth Screens - Test Checklist

## 🎯 Manual Testing Guide

### Pre-Test Setup
```bash
cd /home/reisig/.openclaw/workspace/projects/fangfuehrer-app
flutter pub get
flutter run -d chrome
```

---

## 📝 Login Screen Tests

### ✅ Test 1: Successful Login
**Steps:**
1. Open app (Login Screen should load)
2. Enter: `test@test.de`
3. Enter: `Test1234`
4. Click "Anmelden"

**Expected Result:**
- Button shows loading spinner for ~2s
- Green SnackBar appears: "Login erfolgreich! 🎣"

---

### ✅ Test 2: Failed Login (Wrong Credentials)
**Steps:**
1. Enter: `wrong@test.de`
2. Enter: `WrongPassword123`
3. Click "Anmelden"

**Expected Result:**
- Button shows loading spinner for ~2s
- Red error box appears: "Ungültige E-Mail oder Passwort"
- Error icon (⚠️) visible

---

### ✅ Test 3: Email Validation
**Steps:**
1. Enter: `invalidemail` (no @)
2. Click "Anmelden"

**Expected Result:**
- No API call made
- Red text under email field: "Ungültige E-Mail-Adresse"

---

### ✅ Test 4: Empty Fields
**Steps:**
1. Leave both fields empty
2. Click "Anmelden"

**Expected Result:**
- Email field: "Bitte E-Mail eingeben"
- Password field: "Bitte Passwort eingeben"

---

### ✅ Test 5: Password Visibility Toggle
**Steps:**
1. Enter password: `Test1234`
2. Password should show as: `••••••••`
3. Click eye icon (👁)

**Expected Result:**
- Password now visible as text: `Test1234`
- Icon changes to: 👁 (visibility_off)
- Click again → Password hidden again

---

### ✅ Test 6: "Passwort vergessen?" Link
**Steps:**
1. Click "Passwort vergessen?" link

**Expected Result:**
- SnackBar appears: "Passwort-Reset kommt bald!"
- (Feature not implemented yet, UI only)

---

### ✅ Test 7: Navigate to Register
**Steps:**
1. Click "Registrieren" link

**Expected Result:**
- Register Screen opens
- Login Screen closes (replaced)

---

## 📝 Register Screen Tests

### ✅ Test 8: Successful Registration
**Steps:**
1. Navigate to Register Screen
2. Enter Username: `testuser`
3. Enter Email: `newuser@test.de`
4. Enter Password: `Test1234`
5. Enter Confirm Password: `Test1234`
6. Click "Registrieren"

**Expected Result:**
- Button shows loading spinner for ~2s
- Green SnackBar: "Registrierung erfolgreich! 🎣"
- Navigation to Login Screen

---

### ✅ Test 9: Email Already Exists
**Steps:**
1. Enter Username: `testuser`
2. Enter Email: `existing@test.de` ← Special test email
3. Enter Password: `Test1234`
4. Enter Confirm Password: `Test1234`
5. Click "Registrieren"

**Expected Result:**
- Button shows loading spinner for ~2s
- Red error box: "Diese E-Mail-Adresse ist bereits vergeben"

---

### ✅ Test 10: Username Validation
**Steps:**
1. Enter Username: `ab` (too short)
2. Tab to next field or click "Registrieren"

**Expected Result:**
- Red text: "Benutzername muss mindestens 3 Zeichen lang sein"

---

### ✅ Test 11: Email Format Validation
**Steps:**
1. Enter Email: `notanemail`
2. Tab or click "Registrieren"

**Expected Result:**
- Red text: "Ungültige E-Mail-Adresse"

---

### ✅ Test 12: Password Strength - Too Short
**Steps:**
1. Enter Password: `Test12` (7 chars, too short)
2. Tab or click "Registrieren"

**Expected Result:**
- Red text: "Passwort muss mindestens 8 Zeichen lang sein"

---

### ✅ Test 13: Password Strength - No Uppercase
**Steps:**
1. Enter Password: `test1234` (no uppercase)
2. Tab or click "Registrieren"

**Expected Result:**
- Red text: "Passwort muss mindestens einen Großbuchstaben enthalten"

---

### ✅ Test 14: Password Strength - No Number
**Steps:**
1. Enter Password: `TestTest` (no number)
2. Tab or click "Registrieren"

**Expected Result:**
- Red text: "Passwort muss mindestens eine Zahl enthalten"

---

### ✅ Test 15: Password Mismatch
**Steps:**
1. Enter Password: `Test1234`
2. Enter Confirm Password: `Test1235` (different!)
3. Click "Registrieren"

**Expected Result:**
- Red text under confirm field: "Passwörter stimmen nicht überein"

---

### ✅ Test 16: Navigate to Login
**Steps:**
1. Click "Anmelden" link

**Expected Result:**
- Login Screen opens
- Register Screen closes (replaced)

---

## 🎨 UI/UX Tests

### ✅ Test 17: Responsive Design
**Steps:**
1. Resize browser window
2. Test: 400px, 768px, 1024px widths

**Expected Result:**
- Content stays centered
- No horizontal scrolling
- Text remains readable
- Buttons don't break

---

### ✅ Test 18: Loading State
**Steps:**
1. Click "Anmelden" with valid credentials
2. Observe button during API call

**Expected Result:**
- Button text disappears
- White spinner appears, rotating
- Button is disabled (can't click again)
- Other inputs are still editable

---

### ✅ Test 19: Error State Clearing
**Steps:**
1. Trigger an error (wrong login)
2. Red error box appears
3. Edit email field

**Expected Result:**
- Error box remains (doesn't auto-clear)
- Error clears on next submit attempt

---

### ✅ Test 20: Visual Consistency
**Steps:**
1. Navigate between Login and Register screens
2. Check color scheme consistency

**Expected Result:**
- Same blue (#1E88E5) in both screens
- Same green (#26A69A) for links
- Same input field styling
- Consistent spacing

---

## 🔍 Edge Case Tests

### ✅ Test 21: Very Long Email
**Steps:**
1. Enter: `verylongemailaddress@verylongdomainname.com`

**Expected Result:**
- Text wraps or scrolls within input
- No UI breaking
- Validation still works

---

### ✅ Test 22: Special Characters in Password
**Steps:**
1. Enter Password: `Test!@#$1234`

**Expected Result:**
- Accepts special characters
- Validation passes (if 8+ chars, uppercase, number)

---

### ✅ Test 23: Copy/Paste in Fields
**Steps:**
1. Copy email, paste into field
2. Copy password, paste into field

**Expected Result:**
- Paste works normally
- Validation triggers on blur

---

### ✅ Test 24: Tab Navigation
**Steps:**
1. Tab through all fields
2. Shift+Tab backwards

**Expected Result:**
- Tab order: Email → Password → Button → Links
- Focus indicators visible

---

### ✅ Test 25: Enter Key Submit
**Steps:**
1. Fill in email
2. Fill in password
3. Press Enter key

**Expected Result:**
- Form submits (same as clicking button)
- Loading state activates

---

## 📊 Test Results Template

```
Date: _____________
Tester: ___________
Platform: □ Web  □ Android  □ iOS

Test Results:
[ ] Test 1-7:   Login Screen Tests
[ ] Test 8-16:  Register Screen Tests
[ ] Test 17-20: UI/UX Tests
[ ] Test 21-25: Edge Case Tests

Issues Found:
_________________________________
_________________________________
_________________________________

Overall Status: _______________
```

---

## 🎯 Performance Benchmarks

**Expected Performance:**
- Initial Load: < 3s
- Form Validation: Instant (< 100ms)
- API Call Simulation: ~2s
- Screen Navigation: < 300ms
- Input Response: < 50ms

---

## ✅ Acceptance Criteria

All tests should pass with:
- ✅ No crashes
- ✅ No visual glitches
- ✅ Proper error messages
- ✅ Smooth animations
- ✅ Correct validation
- ✅ Consistent design

---

**Testing Status: Ready for Manual QA** 🎣
