# 🎨 FangFührer Auth Screens - Visual Guide

## 🐟 Login Screen

```
┌─────────────────────────────────────┐
│                                     │
│         ╭────────────╮              │
│         │            │              │
│         │   🐟       │  ← Fisch Icon (Blauer Kreis)
│         │            │              │
│         ╰────────────╯              │
│                                     │
│        FangFührer                   │  ← Große blaue Überschrift
│   Deine Angelfreunde-App            │  ← Graue Subtitle
│                                     │
│                                     │
│   E-Mail                            │  ← Label (Dunkelgrau, Bold)
│   ╭─────────────────────────────╮   │
│   │ 📧 deine@email.de           │   │  ← Input (Helles Blau BG)
│   ╰─────────────────────────────╯   │
│                                     │
│   Passwort                          │
│   ╭─────────────────────────────╮   │
│   │ 🔒 ••••••••            👁  │   │  ← Toggle Visibility
│   ╰─────────────────────────────╯   │
│                                     │
│              Passwort vergessen?    │  ← Türkis Link (rechts)
│                                     │
│   ╭─────────────────────────────╮   │
│   │      Anmelden               │   │  ← Blauer Button
│   ╰─────────────────────────────╯   │
│                                     │
│   Noch kein Konto? Registrieren     │  ← Grau + Türkis Link
│                                     │
└─────────────────────────────────────┘
```

**Colors:**
- 🟦 Primary Blue (#1E88E5) - Logo-Kreis, Button
- 🟩 Türkis (#26A69A) - Links
- ☁️ Light Blue (#E3F2FD) - Input-Hintergründe
- ⚫ Dark Gray (#263238) - Labels
- 🔴 Error Red (#EF5350) - Error-Box (wenn aktiv)

**States:**
1. **Idle:** Alle Felder leer, Button aktiv
2. **Loading:** Button zeigt Spinner, Felder disabled
3. **Error:** Rote Box über Button mit "Ungültige E-Mail oder Passwort"
4. **Success:** Grüne SnackBar "Login erfolgreich! 🎣"

---

## 📝 Register Screen

```
┌─────────────────────────────────────┐
│ ← FangFührer                        │  ← AppBar (Blau)
├─────────────────────────────────────┤
│         ╭──────────╮                │
│         │   🐟     │                │  ← Kleinerer Kreis
│         ╰──────────╯                │
│                                     │
│   Willkommen bei FangFührer!        │  ← Überschrift (Blau)
│   Erstelle dein Angler-Konto        │  ← Subtitle (Grau)
│                                     │
│   Benutzername                      │
│   ╭─────────────────────────────╮   │
│   │ 👤 Dein Anglername          │   │
│   ╰─────────────────────────────╯   │
│                                     │
│   E-Mail                            │
│   ╭─────────────────────────────╮   │
│   │ 📧 deine@email.de           │   │
│   ╰─────────────────────────────╯   │
│                                     │
│   Passwort                          │
│   ╭─────────────────────────────╮   │
│   │ 🔒 Mindestens 8 Zeichen 👁  │   │
│   ╰─────────────────────────────╯   │
│                                     │
│   Passwort bestätigen               │
│   ╭─────────────────────────────╮   │
│   │ 🔒 Passwort wiederholen  👁  │   │
│   ╰─────────────────────────────╯   │
│                                     │
│   ╭─────────────────────────────╮   │
│   │    Registrieren             │   │  ← Blauer Button
│   ╰─────────────────────────────╯   │
│                                     │
│   Bereits ein Konto? Anmelden       │  ← Link
│                                     │
└─────────────────────────────────────┘
```

**Validation Feedback (bei ungültiger Eingabe):**

```
Username zu kurz:
   ╭─────────────────────────────╮
   │ 👤 ab                       │  ← Rote Border
   ╰─────────────────────────────╯
   ⚠️ Benutzername muss mind. 3 Zeichen lang sein

Ungültige Email:
   ╭─────────────────────────────╮
   │ 📧 test@                    │  ← Rote Border
   ╰─────────────────────────────╯
   ⚠️ Ungültige E-Mail-Adresse

Schwaches Passwort:
   ╭─────────────────────────────╮
   │ 🔒 test                  👁  │  ← Rote Border
   ╰─────────────────────────────╯
   ⚠️ Passwort muss mindestens 8 Zeichen lang sein
   ⚠️ Passwort muss mindestens einen Großbuchstaben enthalten
   ⚠️ Passwort muss mindestens eine Zahl enthalten

Passwörter nicht übereinstimmend:
   ╭─────────────────────────────╮
   │ 🔒 Test1235              👁  │  ← Rote Border
   ╰─────────────────────────────╯
   ⚠️ Passwörter stimmen nicht überein
```

**Error State (Email bereits vergeben):**
```
   ╭─────────────────────────────────────╮
   │ ⚠️ Diese E-Mail-Adresse ist bereits │  ← Rote Box
   │    vergeben                         │
   ╰─────────────────────────────────────╯
   
   ╭─────────────────────────────╮
   │    Registrieren             │  ← Button
   ╰─────────────────────────────╯
```

---

## 🎬 Animationen

### Loading State
```
Vorher:
   ╭─────────────────────────────╮
   │      Anmelden               │
   ╰─────────────────────────────╯

Nachher (während API Call):
   ╭─────────────────────────────╮
   │         ⏳                  │  ← Spinner (weiß, rotierend)
   ╰─────────────────────────────╯
   (Button ist disabled/grau)
```

### Success SnackBar
```
┌─────────────────────────────────────┐
│                                     │
│   ... (Screen Content) ...          │
│                                     │
├─────────────────────────────────────┤
│ ✅ Login erfolgreich! 🎣            │  ← Grüne SnackBar (unten)
└─────────────────────────────────────┘
```

### Error Box (Fade-In Animation)
```
   ╭─────────────────────────────────────╮
   │ ⚠️ Ungültige E-Mail oder Passwort   │  ← Fade-In von oben
   ╰─────────────────────────────────────╯
   ↓ 0.3s transition
```

---

## 📱 Responsive Breakpoints

### Mobile (< 600px)
- Padding: 24px
- Input Height: 56px
- Button Height: 56px
- Logo Size: 100x100px

### Tablet (600-900px)
- Gleiche Proportionen
- Zentrierter Content
- Max-Width: 500px

### Desktop (> 900px)
- Content zentriert
- Max-Width: 400px
- Großzügige Margins

---

## 🎨 Component Details

### Input Field (Idle)
```
   Label (14px, Bold, #263238)
   ↓
   ╭─────────────────────────────╮
   │ 📧 Placeholder (#607D8B)    │  Background: #E3F2FD
   ╰─────────────────────────────╯  Border-Radius: 12px
```

### Input Field (Focus)
```
   ╭─────────────────────────────╮
   │ 📧 User Input (#263238)     │  Border: 2px #1E88E5
   ╰─────────────────────────────╯
   (Smooth transition 0.2s)
```

### Input Field (Error)
```
   ╭─────────────────────────────╮
   │ 📧 Invalid Input            │  Border: 2px #EF5350
   ╰─────────────────────────────╯
   ⚠️ Error Text (#EF5350, 12px)
```

### Button (Normal)
```
   ╭─────────────────────────────╮
   │      Button Text (#FFF)     │  Background: #1E88E5
   ╰─────────────────────────────╯  Elevation: 2
   Border-Radius: 12px
```

### Button (Hover - Web)
```
   ╭─────────────────────────────╮
   │      Button Text            │  Background: #1565C0 (darker)
   ╰─────────────────────────────╯  Elevation: 4
   (Cursor: pointer)
```

### Button (Pressed)
```
   ╭─────────────────────────────╮
   │      Button Text            │  Background: #0D47A1
   ╰─────────────────────────────╯  Elevation: 0
   (Scale: 0.98)
```

---

## 🎯 Icon Details

**Logo Icon (Placeholder):**
- Icon: `Icons.phishing` (Flutter Material)
- Size: 60px (Login), 50px (Register)
- Color: #1E88E5
- Background Circle: #E3F2FD, 100px/80px diameter

**Input Icons:**
- Email: `Icons.email_outlined` (#1E88E5)
- Password: `Icons.lock_outline` (#1E88E5)
- Username: `Icons.person_outline` (#1E88E5)
- Visibility: `Icons.visibility` / `Icons.visibility_off` (#607D8B)

**Error Icon:**
- Icon: `Icons.error_outline`
- Color: #EF5350
- Size: 20px

---

## 📏 Spacing System

```
Vertical Spacing:
- Section Gap: 40px
- Field Gap: 16px
- Label-to-Input: 8px
- Button-to-Text: 24px

Horizontal Padding:
- Screen Edges: 24px
- Input Internal: 16px
- Button Internal: 16px (vertical)
```

---

## 🌊 Ozean-Theme Inspiration

Das Design ist inspiriert vom Meer:
- 🌊 Blautöne = Wasser
- 🐟 Grüntöne = Algen/Natur
- ☁️ Helles Blau = Himmel/Luft
- 🔵 Fisch-Icon = FangFührer Logo

**Emotional Goals:**
- Beruhigend (Pastelltöne)
- Vertrauenswürdig (Blau)
- Natürlich (Grün)
- Modern (Clean Design)

---

## 🚀 Future Enhancements

**Phase 2 (Visuals):**
- [ ] Echtes Fisch-Logo statt Material Icon
- [ ] Lottie Animationen (Fisch schwimmt bei Loading)
- [ ] Gradient Backgrounds (Ozean-Effekt)
- [ ] Wave Animations am unteren Rand
- [ ] Custom Illustrations für Empty States

**Phase 3 (Features):**
- [ ] Biometrische Auth (Face ID, Fingerprint)
- [ ] Social Login Buttons (Google, Apple)
- [ ] Passwort-Stärke Meter (visuell)
- [ ] Email-Verifikation Flow
- [ ] Welcome Tour nach Registration

---

**Visual Design Status: ✅ COMPLETE**
Bereit für Screenshots, Demo-Videos und weitere Entwicklung!
