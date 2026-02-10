#!/usr/bin/env python3
"""
Generate unique SEO-optimized product descriptions for mein-schluessel.de
Each description MUST be unique, even for similar products.
"""

import json
import re
import random
import hashlib

# Seed for reproducibility
random.seed(42)

with open('projects/mein-schluessel/rewrite-batch-1.json') as f:
    products = json.load(f)

# ============================================================
# VARIATION POOLS - for creating unique texts
# ============================================================

# Opening patterns for Schließanlagen (rotating)
SA_OPENINGS = [
    "Die {name} ist eine individuell konfigurierte <strong>Schließanlage</strong>, die exakt auf Ihre Anforderungen zugeschnitten wurde.",
    "Mit der {name} erhalten Sie eine maßgeschneiderte <strong>Schließanlage</strong> für Ihr Objekt.",
    "Sichern Sie Ihre Räumlichkeiten mit der {name} – einer professionell geplanten <strong>Schließanlage</strong>.",
    "Die {name} bietet Ihnen eine durchdachte Schließlösung, die individuell für Ihr Gebäude zusammengestellt wurde.",
    "Für optimale Zutrittskontrolle sorgt die {name} als professionelle <strong>Schließanlage</strong>.",
    "Schlüsselorganisation leicht gemacht: Die {name} vereint Sicherheit und Komfort in einer durchdachten <strong>Schließanlage</strong>.",
    "Maximale Flexibilität bei der Zutrittsverwaltung bietet die {name} als individuell projektierte <strong>Schließanlage</strong>.",
    "Vertrauen Sie auf die {name} – eine nach Ihren Vorgaben realisierte <strong>Schließanlage</strong>.",
    "Die {name} wurde speziell für Ihre Liegenschaft konfiguriert und bietet eine lückenlose <strong>Schließlösung</strong>.",
    "Ordnung im Schließsystem schaffen Sie mit der {name}, einer individuell projektierten <strong>Schließanlage</strong>.",
    "Effiziente Zugangskontrolle beginnt mit der {name} – Ihrer maßgeschneiderten <strong>Schließanlage</strong>.",
    "Setzen Sie auf die {name} für eine zuverlässige und individuell abgestimmte <strong>Schließanlage</strong>.",
    "Die {name} ermöglicht eine strukturierte Zutrittsverwaltung durch eine professionell konfigurierte <strong>Schließanlage</strong>.",
    "Ihr individuelles Sicherheitskonzept beginnt mit der {name} als zentral geplanter <strong>Schließanlage</strong>.",
    "Durchdachte Sicherheit für jede Tür: Die {name} ist eine auf Ihre Bedürfnisse abgestimmte <strong>Schließanlage</strong>.",
    "Bringen Sie System in Ihre Schließtechnik mit der {name} – einer professionellen <strong>Schließanlage</strong>.",
    "Weniger Schlüssel, mehr Übersicht: Die {name} organisiert Ihre Zutrittsberechtigung als intelligente <strong>Schließanlage</strong>.",
    "Die {name} stellt als individuell zusammengestellte <strong>Schließanlage</strong> sicher, dass jeder Zutritt kontrolliert erfolgt.",
    "Planen Sie Ihre Gebäudesicherheit mit der {name} als professionell erstellter <strong>Schließanlage</strong>.",
    "Zuverlässige Schließtechnik nach Maß: Die {name} ist eine auf Sie zugeschnittene <strong>Schließanlage</strong>.",
]

# Second paragraph variations for Schließanlagen
SA_PARA2_TEMPLATES = [
    "Diese Konfiguration basiert auf dem bewährten <strong>{system}</strong>-System und umfasst {cyl_summary}. {key_info}Jede Anlage wird von <strong>{manufacturer}</strong> individuell nach Ihren Vorgaben gefertigt.",
    "Basierend auf der <strong>{system}</strong>-Technologie enthält diese Anlage {cyl_summary}. {key_info}Die Fertigung erfolgt durch <strong>{manufacturer}</strong> nach Ihrem individuellen Schließplan.",
    "Das <strong>{system}</strong>-System bildet die Grundlage dieser Anlage mit {cyl_summary}. {key_info}<strong>{manufacturer}</strong> produziert jede Schließanlage nach Maß.",
    "Im Kern arbeitet die Anlage mit dem <strong>{system}</strong>-Profilzylindersystem und beinhaltet {cyl_summary}. {key_info}Gefertigt wird sie exklusiv durch <strong>{manufacturer}</strong>.",
    "Herzstück ist das <strong>{system}</strong>-Schließsystem mit {cyl_summary}. {key_info}Die Zusammenstellung erfolgt individuell durch <strong>{manufacturer}</strong>.",
    "Die Anlage nutzt das hochwertige <strong>{system}</strong>-Profil und ist mit {cyl_summary} bestückt. {key_info}Jedes System wird von <strong>{manufacturer}</strong> exakt nach Plan konfiguriert.",
    "Aufgebaut auf dem <strong>{system}</strong>-System umfasst die Anlage {cyl_summary}. {key_info}Alle Komponenten werden durch <strong>{manufacturer}</strong> individuell zusammengestellt.",
    "Technisch setzt diese Konfiguration auf das <strong>{system}</strong>-System und liefert {cyl_summary}. {key_info}Die Planung und Umsetzung übernimmt <strong>{manufacturer}</strong>.",
]

# Bullet points pool for Schließanlagen
SA_BULLETS_POOL = [
    "Individuell konfigurierte Zylinderbestückung nach Ihrem Schließplan",
    "Maßgefertigte Schließanlage für Ihr spezifisches Objekt",
    "Professionelle Schlüsselverwaltung mit klar definierter Schließhierarchie",
    "Erweiterbar bei späterem Bedarf – flexible Nachrüstung möglich",
    "Hochwertige Profilzylinder mit Sicherungskarte gegen unbefugtes Kopieren",
    "Zentrale Schließordnung für effiziente Zutrittskontrolle",
    "Patentgeschütztes Schlüsselprofil für maximalen Kopierschutz",
    "Werksseitige Fertigung nach Ihren individuellen Angaben",
    "Komfortable Bedienung durch präzise gefertigte Schließmechanik",
    "Geeignet für Wohn-, Gewerbe- und Objektbereiche",
    "Einheitliches Schließsystem für alle Zugangspunkte",
    "Dokumentierte Schließmatrix für transparente Zugangsverwaltung",
    "Robuste Bauweise für den dauerhaften Einsatz im Alltag",
    "Alle Zylinder aufeinander abgestimmt in einer Schließhierarchie",
    "Schnelle Lieferung nach individueller Konfiguration",
]

# Closing sentences for Schließanlagen
SA_CLOSINGS = [
    "Geeignet für <strong>Privathaushalte</strong>, <strong>Gewerbeobjekte</strong> und öffentliche Gebäude.",
    "Ideal für <strong>Wohngebäude</strong>, <strong>Bürokomplexe</strong> und gewerbliche Liegenschaften.",
    "Perfekt für <strong>Mehrfamilienhäuser</strong>, <strong>Gewerbeeinheiten</strong> und Verwaltungsgebäude.",
    "Empfohlen für <strong>Privat</strong>, <strong>Gewerbe</strong> und den Objektbereich.",
    "Die optimale Lösung für <strong>Hausverwaltungen</strong>, <strong>Firmen</strong> und private Eigentümer.",
    "Bewährt im Einsatz bei <strong>Wohnanlagen</strong>, <strong>Geschäftsgebäuden</strong> und Industrieobjekten.",
    "Geeignet für den <strong>privaten Bereich</strong>, den <strong>gewerblichen Einsatz</strong> und institutionelle Objekte.",
    "Für <strong>Neubauten</strong>, <strong>Sanierungen</strong> und Nachrüstungen gleichermaßen geeignet.",
]

def parse_cylinders(desc):
    """Parse cylinder config from existing description."""
    cylinders = []
    rows = re.findall(r'<td>(Tür \d+)</td><td>([^<]+)</td>', desc)
    for door, typ in rows:
        cylinders.append((door, typ.strip()))
    
    # Parse key info
    keys = []
    key_rows = re.findall(r'<td>(Generalschlüssel|Gruppe \d+)</td><td>[^<]*</td><td>(\d+)</td>', desc)
    for ktype, count in key_rows:
        keys.append((ktype, int(count)))
    
    # Count total cylinders from desc
    cyl_count_match = re.search(r'mit (\d+) Zylindern', desc)
    cyl_count = int(cyl_count_match.group(1)) if cyl_count_match else len(cylinders)
    
    return cylinders, keys, cyl_count


def extract_system_name(name):
    """Extract the lock system name from product name."""
    # e.g. "Individuelle Schliessanlage DOM ix Twido Nr: 3SZG5" -> "DOM ix Twido"
    # e.g. "Individuelle Schliessanlage  Winkhaus X-TRA Nr: CUX95" -> "Winkhaus X-TRA"
    # e.g. "Individuelle Schliessanlage DOM RS Sigma plus Nr: B1QCF" -> "DOM RS Sigma plus"
    # e.g. "Individuelle Schliessanlage DOM Twinstar Nr: 0QGCB" -> "DOM Twinstar"
    match = re.search(r'Schliessanlage\s+(.+?)\s+Nr:', name)
    if match:
        return match.group(1).strip()
    return "Profilzylinder"


def summarize_cylinders(cylinders, cyl_count):
    """Create a natural language summary of cylinder configuration."""
    if not cylinders and cyl_count > 0:
        return f"{cyl_count} Profilzylinder"
    
    if not cylinders:
        return "Profilzylinder nach individueller Konfiguration"
    
    # Count types
    types = {}
    for door, typ in cylinders:
        types[typ] = types.get(typ, 0) + 1
    
    parts = []
    for typ, count in types.items():
        if count == 1:
            parts.append(f"1× {typ}")
        else:
            parts.append(f"{count}× {typ}")
    
    return ", ".join(parts)


def format_key_info(keys):
    """Format key information."""
    if not keys:
        return ""
    parts = []
    for ktype, count in keys:
        if ktype == "Generalschlüssel":
            parts.append(f"{count} Generalschlüssel")
        else:
            parts.append(f"{count} Schlüssel ({ktype})")
    return "Inklusive " + " und ".join(parts) + ". "


def generate_schliesanlage(product, index):
    """Generate description for Schließanlage products."""
    name = product['name']
    manufacturer = product['manufacturer']
    desc = product['current_description']
    prod_nr = product['product_number']
    
    system = extract_system_name(name)
    cylinders, keys, cyl_count = parse_cylinders(desc)
    cyl_summary = summarize_cylinders(cylinders, cyl_count)
    key_info = format_key_info(keys)
    
    # Use product ID hash for consistent but varied selection
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    # Select opening
    opening_idx = h % len(SA_OPENINGS)
    opening = SA_OPENINGS[opening_idx].format(name=f"Schließanlage {system} (Nr. {prod_nr})")
    
    # Select para2
    para2_idx = (h // 100) % len(SA_PARA2_TEMPLATES)
    para2 = SA_PARA2_TEMPLATES[para2_idx].format(
        system=system,
        cyl_summary=cyl_summary,
        key_info=key_info,
        manufacturer=manufacturer
    )
    
    # Select 4 bullets (unique combination based on hash)
    bullet_indices = []
    base = (h // 10000) % len(SA_BULLETS_POOL)
    for i in range(4):
        idx = (base + i * 3 + (h // (100 * (i+1))) % 3) % len(SA_BULLETS_POOL)
        while idx in bullet_indices:
            idx = (idx + 1) % len(SA_BULLETS_POOL)
        bullet_indices.append(idx)
    bullets = [SA_BULLETS_POOL[i] for i in bullet_indices]
    
    # Select closing
    closing_idx = (h // 1000000) % len(SA_CLOSINGS)
    closing = SA_CLOSINGS[closing_idx]
    
    html = f"<p>{opening}</p>\n<p>{para2}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closing}</p>"
    
    return html


# ============================================================
# NON-Schließanlage product generators
# ============================================================

def generate_fenstergriff(product, index):
    """Generate for window handles."""
    name = product['name']
    mfr = product['manufacturer']
    
    # Parse color from name
    color = ""
    if "weiß" in name.lower():
        color = "in elegantem Weiß"
    elif "stahlf" in name.lower() or "stahl" in name.lower():
        color = "in zeitloser Stahlfarbe"
    elif "F1" in name:
        color = "in natürlichem Aluminium (F1)"
    elif "F9" in name:
        color = "in Stahlfarbe (F9)"
    elif "F12" in name:
        color = "in Weiß (F12)"
    
    # Parse model
    model = ""
    if "TOKYO" in name:
        model = "Tokyo"
    elif "BIRMINGHAM" in name:
        model = "Birmingham"
    
    openings = [
        f"Der <strong>{name}</strong> von <strong>{mfr}</strong> ist ein hochwertiger Dreh-/Kipp-<strong>Fenstergriff</strong> aus Aluminium {color}. Mit seinem klaren Design aus der Serie \"{model}\" passt er hervorragend zu modernen Fensterrahmen und sorgt für eine komfortable Bedienung Ihrer Fenster.",
        f"Setzen Sie auf Qualität mit dem <strong>{name}</strong> – einem Aluminium-<strong>Fenstergriff</strong> von <strong>{mfr}</strong> {color}. Die Serie \"{model}\" verbindet funktionale Präzision mit ansprechender Formgebung für den täglichen Einsatz an Dreh-/Kipp-Fenstern.",
        f"Der Aluminium-<strong>Fenstergriff</strong> <strong>{name}</strong> aus der {mfr}-Serie \"{model}\" überzeugt durch seine hochwertige Verarbeitung {color}. Als Dreh-/Kipp-Griff bedient er alle gängigen Fenstertypen zuverlässig und komfortabel.",
    ]
    
    bullets_options = [
        [
            "Geprüft nach <strong>DIN EN 13126-3</strong> und RAL-GZ 607/9",
            "90°-Rastung für sichere Bedienungsstellungen",
            "Verdeckte Befestigung für eine saubere Optik",
            f"Hochwertige Aluminium-Ausführung {color}",
            "HOPPE-Vollstift für zuverlässige Kraftübertragung",
        ],
        [
            "Zertifiziert nach <strong>DIN EN 13126-3</strong> und RAL-Gütezeichen",
            "Teil-Abdeckkappe für ein aufgeräumtes Erscheinungsbild",
            "Kunststoff-Unterkonstruktion mit Stütznocken für stabilen Sitz",
            "Für Gewindeschrauben M5 – einfache Montage",
            f"Elegante Optik {color} passend zu gängigen Fensterrahmen",
        ],
    ]
    
    closings = [
        f"Dieser <strong>Fenstergriff</strong> eignet sich für den Einsatz in <strong>Privathaushalten</strong>, <strong>Bürogebäuden</strong> und im Objektbereich.",
        f"Ideal für <strong>Wohnungen</strong>, <strong>Gewerberäume</strong> und öffentliche Gebäude – überall dort, wo zuverlässige Fensterbeschläge gefragt sind.",
    ]
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    oi = h % len(openings)
    bi = (h // 100) % len(bullets_options)
    ci = (h // 10000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets_options[bi]:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_schutzgarnitur(product, index):
    """Generate for protective door fittings (Schutz-Drückergarnitur / Schutz-Wechselgarnitur)."""
    name = product['name']
    mfr = product['manufacturer']
    pn = product['product_number']
    
    is_wechsel = "Wechsel" in name
    garnitur_type = "Schutz-Wechselgarnitur" if is_wechsel else "Schutz-Drückergarnitur"
    
    # Parse specs
    pz = "92 mm" if "92 mm" in name else ("72 mm" if "72 mm" in name else "")
    nuss = "10 mm" if "10 mm" in name else ("8 mm" if "8 mm" in name else "")
    material = "Edelstahl" if "Edelstahl" in name else ""
    za = "mit Zylinderabdeckung" if "ZA" in name else ""
    
    # Parse model series
    model = ""
    if "LOGO" in name:
        model = "LOGO"
    elif "Birmingham" in name:
        model = "Birmingham"
    
    # Parse finish
    finish = ""
    if "F1" in name and "F12" not in name:
        finish = "naturfarben eloxiert (F1)"
    elif "F9016" in name:
        finish = "in Weiß (F9016)"
    elif "F2" in name:
        finish = "neusilber (F2)"
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    openings = [
        f"Die <strong>{garnitur_type} {mfr} \"{model}\"</strong> bietet zuverlässigen Einbruchschutz für Ihre Haustür oder Wohnungseingangstür. Als <strong>Schutzbeschlag</strong> mit Profilzylinder-Lochung ({pz} PZ) schützt sie den Schließzylinder effektiv vor Manipulationsversuchen.",
        f"Schützen Sie Ihren Eingangsbereich mit der <strong>{garnitur_type} {mfr} \"{model}\"</strong>. Dieser <strong>Türbeschlag</strong> mit {pz} PZ-Lochung und {nuss} Nuss wurde speziell für erhöhte Sicherheitsanforderungen an Haus- und Wohnungstüren entwickelt.",
        f"Die <strong>{garnitur_type}</strong> aus der Serie \"{model}\" von <strong>{mfr}</strong> vereint Sicherheit und Design. Mit {pz} PZ-Lochung und {nuss} Vierkantnuss ist dieser <strong>Schutzbeschlag</strong> die ideale Wahl für sicherheitsbewusste Eigenheimbesitzer.",
        f"Für hohen Einbruchschutz an Ihrer Eingangstür sorgt die <strong>{garnitur_type} {mfr} \"{model}\"</strong>. Der hochwertige <strong>Türbeschlag</strong> aus {material} mit {pz} Profilzylinder-Lochung bietet Schutz vor Zylinder-Ziehen und -Bohren.",
    ]
    
    bullets_pool = [
        f"Profilzylinder-Lochung <strong>{pz} PZ</strong> für gängige Einsteckschlösser",
        f"Vierkantnuss <strong>{nuss}</strong> für sichere Drückerführung",
        f"Robuste Ausführung in <strong>{material}</strong>" if material else "Langlebige Materialqualität für dauerhaften Einsatz",
        "Schutzlangschild gegen Aufbohren und Abreißen des Zylinders",
        f"Zylinderabdeckung ({za}) für zusätzlichen Manipulationsschutz" if za else "Durchgehender Zylinderscutz im Langschild integriert",
        "Geeignet für Haus- und Wohnungseingangstüren",
        "Einfache Montage dank standardisierter Befestigung",
        f"Design-Serie \"{model}\" für ein zeitgemäßes Erscheinungsbild",
    ]
    
    closings = [
        f"Empfohlen für <strong>Privathaushalte</strong>, <strong>Mietobjekte</strong> und den <strong>Gewerbeeinsatz</strong>.",
        f"Die ideale Wahl für <strong>Eigenheime</strong>, <strong>Mehrfamilienhäuser</strong> und <strong>gewerbliche Objekte</strong>.",
        f"Bewährt im <strong>privaten</strong> und <strong>gewerblichen</strong> Einsatz sowie im <strong>Objektbereich</strong>.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    # Select 4-5 bullets
    n_bullets = 4 + (h % 2)
    selected = []
    base = (h // 100) % len(bullets_pool)
    for i in range(n_bullets):
        idx = (base + i * 2) % len(bullets_pool)
        while idx in [s[0] for s in selected]:
            idx = (idx + 1) % len(bullets_pool)
        selected.append((idx, bullets_pool[idx]))
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for _, b in selected:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_rosette(product, index):
    """Generate for rosette fittings."""
    name = product['name']
    mfr = product['manufacturer']
    
    # Parse specs
    locking = "BB" if "BB" in name else ("PZ" if "PZ" in name else ("BAD/WC" if "BAD" in name else ""))
    nuss = "8 mm" if "8 mm" in name else ""
    diameter = "52 mm" if "52 mm" in name else ""
    
    model = ""
    if "New York" in name:
        model = "New York"
    
    druecker = ""
    if "U-Form" in name:
        druecker = "U-Form"
    elif "L-Form" in name:
        druecker = "L-Form"
    
    material = "Edelstahl" if "Edelstahl" in name else "Aluminium"
    finish = ""
    if "F1" in name and "F12" not in name:
        finish = "in natürlichem Aluminium (F1)"
    
    locking_desc = {
        "BB": "Buntbart-Lochung (BB) – passend für herkömmliche Zimmertürschlösser",
        "PZ": "Profilzylinder-Lochung (PZ) – für erhöhte Sicherheit mit Zylinderschloss",
        "BAD/WC": "Bad/WC-Lochung – mit Drehknopf und Notentriegelung",
    }
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    if druecker:
        druecker_text = f"Der formschöne <strong>{druecker}-Drücker</strong> liegt ergonomisch in der Hand und fügt sich harmonisch in zeitgemäße Innenraumgestaltungen ein."
    elif model:
        druecker_text = f"Die formschöne Drückerform der Serie \"{model}\" überzeugt durch ergonomisches Design und liegt angenehm in der Hand."
    else:
        druecker_text = "Die ergonomische Drückerform liegt angenehm in der Hand und bietet ein ansprechendes Design."
    
    openings = [
        f"Die <strong>Rosettengarnitur {mfr}</strong> ({name.split(',')[0].split('Rosettengarnitur ')[-1]}) ist eine hochwertige <strong>Türdrückergarnitur</strong> aus {material} mit {locking_desc.get(locking, locking + '-Lochung')}. {druecker_text}",
        f"Werten Sie Ihre Innentüren auf mit der <strong>Rosettengarnitur</strong> von <strong>{mfr}</strong>. Diese Garnitur aus {material} mit {locking}-Lochung und {nuss} Nuss verbindet modernes Design mit bewährter Funktionalität. {druecker_text}",
        f"Die <strong>Rosettengarnitur</strong> von <strong>{mfr}</strong> besticht durch ihre schlichte Eleganz und hochwertige Verarbeitung in {material}. Mit {locking}-Lochung ausgestattet, eignet sie sich perfekt für den Einsatz an Innentüren. {druecker_text}",
    ]
    
    bullets = [
        f"<strong>{locking}-Lochung</strong> für den passenden Einsatzbereich",
        f"Vierkantnuss <strong>{nuss}</strong> – kompatibel mit gängigen Einsteckschlössern",
        f"Rosettenform mit <strong>Ø {diameter}</strong> – dezent und platzsparend",
        f"Hochwertiger <strong>{material}</strong> für langlebigen Einsatz",
        "Einfache Montage an Standard-Innentüren",
    ]
    
    closings = [
        f"Ideal für <strong>Wohnungen</strong>, <strong>Büros</strong> und den <strong>Objektbereich</strong> – überall dort, wo hochwertige Innentürbeschläge gefragt sind.",
        f"Geeignet für den <strong>privaten</strong> und <strong>gewerblichen</strong> Einsatz an Innentüren in Wohn- und Geschäftsgebäuden.",
    ]
    
    oi = h % len(openings)
    ci = (h // 100) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_zimmertuergarnitur(product, index):
    """Generate for interior door fittings."""
    name = product['name']
    mfr = product['manufacturer']
    
    locking = "BB" if " BB" in name else ("PZ" if " PZ" in name else ("BAD/WC" if "BAD" in name else ""))
    nuss = "8 mm" if "8 mm" in name else "10 mm"
    entf = "72 mm" if "72 mm" in name else ("78 mm" if "78 mm" in name else "92 mm")
    
    model = ""
    if "New York" in name:
        model = "New York"
    elif "Tokyo" in name:
        model = "Tokyo"
    
    finish = ""
    if "F1" in name and "F12" not in name:
        finish = "naturfarben eloxiert (F1)"
    elif "F2" in name:
        finish = "in Neusilber (F2)"
    
    locking_full = {
        "BB": "Buntbart (BB)",
        "PZ": "Profilzylinder (PZ)",
        "BAD/WC": "Bad/WC",
    }
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    openings = [
        f"Die <strong>Zimmertürgarnitur {mfr} \"{model}\"</strong> ist eine zeitlose <strong>Langschildgarnitur</strong> für den Einsatz an Innentüren. Ausgestattet mit {locking_full.get(locking,locking)}-Lochung und {entf} Entfernung, passt sie auf gängige Zimmertür-Einsteckschlösser.",
        f"Verleihen Sie Ihren Innentüren mit der <strong>Zimmertürgarnitur \"{model}\"</strong> von <strong>{mfr}</strong> einen hochwertigen Look. Diese <strong>Langschildgarnitur</strong> mit {locking_full.get(locking,locking)}-Lochung und {nuss} Vierkant überzeugt durch Qualität und Design.",
        f"Die <strong>{mfr} \"{model}\"</strong> Zimmertürgarnitur vereint formschönes Design mit robuster Funktion. Als <strong>Langschildgarnitur</strong> mit {locking_full.get(locking,locking)}-Lochung eignet sie sich ideal für Wohn- und Büroräume.",
    ]
    
    bullets = [
        f"<strong>{locking_full.get(locking,locking)}-Lochung</strong> mit {entf} Entfernung",
        f"Vierkantnuss <strong>{nuss}</strong> – passend für Standard-Einsteckschlösser",
        "Langschild-Ausführung für eine elegante, geschlossene Optik",
        f"Serie \"{model}\" {finish} – zeitloses Design" if finish else f"Serie \"{model}\" – zeitloses, modernes Design",
        "Einfache Montage auf Holz- und Röhrenspantüren",
    ]
    
    closings = [
        f"Ideal für <strong>Wohnräume</strong>, <strong>Büros</strong> und den <strong>Objektbau</strong>.",
        f"Geeignet für <strong>Privathaushalte</strong>, <strong>Bürogebäude</strong> und <strong>Hotels</strong>.",
    ]
    
    oi = h % len(openings)
    ci = (h // 100) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_master_lock_zurrgurt(product, index):
    """Generate for Master Lock straps."""
    name = product['name']
    mfr = product['manufacturer']
    desc = product['current_description']
    pn = product.get('product_number', '')
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    # Route Schlüsselkasten and Minisafe to generic handler
    if "Schlüsselkasten" in name or "schlüsselkasten" in name or "Schluesselkasten" in name:
        return generate_generic(product, index)
    if "Minisafe" in name or "minisafe" in name:
        return generate_generic(product, index)
    
    # Parse length and type from name
    length = ""
    m = re.search(r'(\d+[,.]?\d*)\s*m\s', name)
    if m:
        length = m.group(1) + " m"
    
    has_ratsche = "Ratsche" in name or "ratsche" in name
    has_s_haken = "S-Haken" in name
    
    if "Umzugsset" in name:
        openings = [
            f"Das <strong>{name}</strong> ist ein vielseitiges Sicherungsset für den Transport und Umzug. Mit Spannseilen und Spanngurten in verschiedenen Längen sichern Sie Kartons, Möbel und Matratzen zuverlässig.",
        ]
        bullets = [
            "4 Spannseile (2× 60 cm + 2× 80 cm) für flexible Sicherung",
            "2 Spanngurte (2,5 m × 2,5 cm) für leichte Ladung",
            "2 Spanngurte mit Ratsche für schwere Gegenstände",
            "Kompaktes Set – alles in einer Verpackung",
            "Robuste Verarbeitung für sicheren Transport",
        ]
    elif "Gepäckgurt" in name:
        gurt_color = ""
        if "GRN" in pn:
            gurt_color = "in auffälligem Grün"
        elif "RED" in pn:
            gurt_color = "in leuchtendem Rot"
        
        if "RED" in pn:
            openings = [
                f"Der <strong>{name}</strong> {gurt_color} schützt Ihr Gepäck auf Reisen zuverlässig. Die leuchtende Farbe macht Ihren Koffer am Gepäckband sofort erkennbar, während die <strong>Zahlenkombination</strong> den Inhalt vor unbefugtem Zugriff schützt.",
                f"Reisen Sie sicher mit dem <strong>{name}</strong> {gurt_color}. Der <strong>Gepäckgurt</strong> mit persönlichem Zahlencode hält Ihren Koffer zusammen und sorgt dank seiner auffälligen Farbe für schnelles Wiederfinden.",
            ]
        else:
            openings = [
                f"Der <strong>{name}</strong> {gurt_color} schützt Ihr Gepäck auf Reisen zuverlässig. Mit einer individuell einstellbaren <strong>Zahlenkombination</strong> sichern Sie Ihren Koffer gegen unbeabsichtigtes Öffnen – ganz ohne Schlüssel.",
                f"Reisen Sie sicher mit dem <strong>{name}</strong> {gurt_color}. Der <strong>Gepäckgurt</strong> mit persönlichem Zahlencode hält Ihren Koffer zusammen und schützt den Inhalt vor unbefugtem Zugriff.",
            ]
        bullets = [
            "Individuell einstellbare <strong>Zahlenkombination</strong>",
            "Universell passend für gängige Koffergrößen",
            f"Auffällige Farbe {gurt_color} zur schnellen Identifikation am Gepäckband",
            "Robustes Material für häufige Reisen",
            "Kein Schlüssel nötig – Code jederzeit änderbar",
        ]
    elif "Street Cuff" in name or "Schellen" in name:
        # Differentiate by product number (BLK=black, BLU=blue)
        color = ""
        if "BLK" in pn:
            color = "in Schwarz"
        elif "BLU" in pn:
            color = "in Blau"
        
        if "BLU" in pn:
            openings = [
                f"Das <strong>{name}</strong> {color} ist ein innovatives <strong>Kabelschloss</strong> mit Schellenbefestigung und Schlüssel. Die auffällige blaue Farbe sorgt für hohe Sichtbarkeit und einfaches Wiedererkennen Ihres Schlosses.",
                f"Sichern Sie Ihr Fahrrad oder Equipment mit dem <strong>{name}</strong> {color}. Dieses <strong>Kabelschloss</strong> mit Schellenmechanismus von <strong>{mfr}</strong> bietet schnelle Befestigung und zuverlässigen Schutz.",
            ]
        else:
            openings = [
                f"Das <strong>{name}</strong> {color} ist ein innovatives <strong>Kabelschloss</strong> mit Schellenbefestigung und Schlüssel. Dank der flexiblen Schellen befestigen Sie das Schloss schnell und sicher an Fahrrädern, Rollern oder anderen Gegenständen.",
                f"Sichern Sie Ihr Fahrrad oder Equipment mit dem <strong>{name}</strong> {color}. Dieses <strong>Kabelschloss</strong> mit Schellenmechanismus von <strong>{mfr}</strong> verbindet einfache Handhabung mit robustem Diebstahlschutz.",
            ]
        bullets = [
            "Schellen-Befestigung für schnelles An- und Abschließen",
            "Inklusive Schlüssel für zuverlässige Verriegelung",
            "Flexibles Stahlkabel für vielseitige Einsatzmöglichkeiten",
            "Kompakte Bauform – leicht zu transportieren",
            "Gehärteter Schließmechanismus gegen Aufbruchversuche",
        ]
    else:
        art = "Zurrgurt"
        ratsche_text = "mit Druckratsche" if has_ratsche else ""
        haken_text = "und S-Haken" if has_s_haken else ""
        
        openings = [
            f"Der <strong>{name}</strong> ist ein robuster <strong>Spanngurt</strong> {ratsche_text} {haken_text} für die sichere Ladungssicherung. Mit {length} Länge eignet er sich ideal für den Transport auf Anhängern, Dachträgern und in Transportern.",
            f"Für professionelle Ladungssicherung: Der <strong>{name}</strong> von <strong>{mfr}</strong> bietet {length} Gurtlänge {ratsche_text} {haken_text}. Ob Umzug, Campingausrüstung oder Werkzeugtransport – dieser <strong>Spanngurt</strong> hält Ihre Ladung zuverlässig.",
        ]
        bullets = [
            f"<strong>{length}</strong> Gurtlänge für vielseitigen Einsatz",
            "Druckratsche für stufenlose Spannkraft" if has_ratsche else "Sichere Spannmechanik für festen Halt",
            "S-Haken für schnelle Befestigung an Ösen und Trägern" if has_s_haken else "Einfache Befestigung an gängigen Fixpunkten",
            "Strapazierfähiges Gurtmaterial für dauerhaften Einsatz",
            "Von <strong>Master Lock</strong> – bewährte Qualität für Transport und Sicherung",
        ]
    
    closings = [
        f"Von <strong>{mfr}</strong> – bewährte Qualität für <strong>Privat</strong> und <strong>Gewerbe</strong>.",
        f"Ideal für <strong>Privatanwender</strong>, <strong>Handwerker</strong> und den <strong>gewerblichen Transport</strong>.",
    ]
    
    oi = h % len(openings)
    ci = (h // 100) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_simonsvoss(product, index):
    """Generate for SimonsVoss electronic lock products."""
    name = product['name']
    mfr = product['manufacturer']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    if "Doppelknaufzylinder" in name:
        features = []
        if "Tastersteuerung" in name or "(TS)" in name:
            features.append("Tastersteuerung")
            spec_text = "mit <strong>Tastersteuerung (TS)</strong> – ideal für die Anbindung an Gebäudeleittechnik und automatische Türsysteme"
        elif "Antipanik" in name or "(AP2)" in name:
            features.append("Antipanik")
            spec_text = "in der <strong>Antipanik-Ausführung (AP2)</strong> – speziell für Fluchttüren gemäß Brandschutzvorschriften"
        elif "DoorMonitoring" in name or "(DM)" in name:
            features.append("DoorMonitoring")
            spec_text = "mit <strong>DoorMonitoring (DM)</strong> – überwacht den Türstatus und meldet Öffnungen in Echtzeit"
        elif "(FD)" in name:
            features.append("Freidrehend")
            spec_text = "als <strong>freidrehende Europrofil-Ausführung (FD)</strong> – der Knauf dreht frei durch, bis eine Berechtigung vorliegt"
        else:
            spec_text = "– die kabellose Lösung für moderne Zutrittskontrolle"
        
        openings = [
            f"Der <strong>digitale Doppelknaufzylinder {mfr} MobileKey</strong> {spec_text}. Dieser <strong>elektronische Schließzylinder</strong> ersetzt mechanische Zylinder ohne Verkabelung und ermöglicht eine flexible Zutrittsverwaltung per Software.",
            f"Modernisieren Sie Ihre Zutrittskontrolle mit dem <strong>{mfr} MobileKey Doppelknaufzylinder</strong> {spec_text}. Der <strong>digitale Schließzylinder</strong> wird kabellos in bestehende Türen eingebaut und über die MobileKey-Software verwaltet.",
        ]
        
        bullets = [
            "Kabelloser Einbau in Standard-Europrofil – keine Verkabelung nötig",
            "Verwaltung über <strong>SimonsVoss MobileKey</strong>-Software",
            "Batterieversorgung mit langer Lebensdauer",
            "Berechtigungen jederzeit digital änderbar – kein Schlüsseltausch",
            "Bis zu 50 Schließungen im MobileKey-System verwaltbar",
        ]
        
    elif "Vorhängeschloss" in name:
        openings = [
            f"Das <strong>digitale Vorhängeschloss {mfr} MobileKey</strong> bringt die elektronische Zutrittskontrolle auch dorthin, wo herkömmliche Schließzylinder nicht verbaut werden können. Als kabelloses <strong>Vorhängeschloss</strong> sichert es Tore, Schränke, Spinde und Nebenräume.",
            f"Erweitern Sie Ihr <strong>{mfr} MobileKey</strong>-System mit dem <strong>digitalen Vorhängeschloss</strong>. Überall dort, wo ein Vorhängeschloss benötigt wird, ermöglicht es die gleiche komfortable, schlüssellose Zutrittskontrolle wie der digitale Zylinder.",
        ]
        bullets = [
            "Elektronische Verriegelung – schlüssellos per Transponder",
            "Nahtlose Integration in das <strong>MobileKey</strong>-System",
            "Wetterfest für den Außeneinsatz geeignet",
            "Berechtigungen zentral per Software verwaltbar",
            "Robuste Bauweise mit gehärtetem Bügel",
        ]
    elif "PinCode" in name:
        openings = [
            f"Die <strong>{mfr} PinCode-Tastatur MobileKey</strong> ermöglicht die Türöffnung per individuellem Zahlencode – ideal für Bereiche, in denen kein Transponder mitgeführt werden soll. Als Ergänzung zum <strong>MobileKey</strong>-System bietet sie eine komfortable Alternative zur schlüssellosen Zutrittskontrolle.",
            f"Erweitern Sie Ihr <strong>{mfr} MobileKey</strong>-System um eine <strong>PinCode-Tastatur</strong>. Besucher, Lieferanten oder Mitarbeiter öffnen Türen durch Eingabe eines persönlichen Codes – ohne Schlüssel und ohne Transponder.",
        ]
        bullets = [
            "Code-Eingabe als Alternative zum Transponder",
            "Individuelle PINs pro Nutzer möglich",
            "Nahtlose Integration in das <strong>MobileKey</strong>-System",
            "Vandalismusgeschützte Ausführung für den Außeneinsatz",
            "Einfache Programmierung über die MobileKey-Software",
        ]
    elif "Transponder" in name and "Leer" not in name:
        openings = [
            f"Der <strong>{mfr} Transponder MobileKey</strong> ist der digitale Schlüssel für Ihr MobileKey-Schließsystem. Klein, handlich und robust – er passt an jeden Schlüsselbund und öffnet autorisierte Türen per Knopfdruck.",
            f"Nutzen Sie den <strong>{mfr} MobileKey Transponder</strong> als komfortablen Ersatz für mechanische Schlüssel. Ein Tastendruck genügt, um berechtigte Türen zu öffnen – einfach, schnell und sicher.",
        ]
        bullets = [
            "Kompakte Bauform für den Schlüsselbund",
            "Öffnung per Tastendruck – schnell und komfortabel",
            "Berechtigungen zentral über <strong>MobileKey</strong>-Software verwaltbar",
            "Robustes Gehäuse für den täglichen Einsatz",
            "Bei Verlust einfach digital sperren – kein Schlossaustausch nötig",
        ]
    elif "Leer-Transpondergehäuse" in name:
        color = "blauem" if "blau" in name else ("rotem" if "rot" in name else "farbigem")
        openings = [
            f"Das <strong>{mfr} Leer-Transpondergehäuse</strong> mit {color} Taster dient als Ersatz- oder Zusatzgehäuse für MobileKey-Transponder. Es ermöglicht die farbliche Kennzeichnung von Transpondern zur einfacheren Unterscheidung in größeren Schließanlagen.",
            f"Organisieren Sie Ihr <strong>{mfr} MobileKey</strong>-System mit dem <strong>Leer-Transpondergehäuse</strong> mit {color} Taster. Durch farbliche Kodierung behalten Sie auch bei vielen Transpondern den Überblick.",
        ]
        bullets = [
            f"Gehäuse mit <strong>{color} Taster</strong> zur farblichen Zuordnung",
            "Passend für SimonsVoss MobileKey-Transponder-Elektronik",
            "Ermöglicht Austausch beschädigter Gehäuse",
            "Farbkodierung für Abteilungen, Etagen oder Nutzergruppen",
            "Robuster Kunststoff für den Alltagseinsatz",
        ]
    elif "USB-Programmiergerät" in name:
        openings = [
            f"Das <strong>{mfr} USB-Programmiergerät MobileKey</strong> ist das zentrale Verwaltungstool für Ihr MobileKey-Schließsystem. Über den USB-Anschluss verbinden Sie das Gerät mit Ihrem PC und programmieren Transponder, Zylinder und Zugangsberechtigungen.",
            f"Verwalten Sie Ihr <strong>{mfr} MobileKey</strong>-Schließsystem komfortabel mit dem <strong>USB-Programmiergerät</strong>. Schließkomponenten werden direkt am PC konfiguriert, Berechtigungen zugewiesen und Protokolle ausgelesen.",
        ]
        bullets = [
            "USB-Anschluss für direkte PC-Verbindung",
            "Programmierung von Zylindern und Transpondern",
            "Verwaltung aller Zugangsberechtigungen",
            "Kompatibel mit der <strong>MobileKey</strong>-Software",
            "Kompaktes Format für den mobilen Einsatz",
        ]
    elif "SmartCard" in name:
        openings = [
            f"Der <strong>{mfr} SmartCard Leser extern</strong> ermöglicht die kontaktlose Identifikation per SmartCard an Ihrem SimonsVoss-Schließsystem. Als externer Leser wird er einfach an der Tür montiert und erweitert Ihr System um eine kartenbbasierte Zutrittskontrolle.",
            f"Erweitern Sie Ihr <strong>SimonsVoss</strong>-System mit dem <strong>SmartCard Leser extern</strong>. Der kontaktlose Kartenleser bietet eine elegante Alternative zur Transponder-Öffnung und eignet sich besonders für Bürogebäude und Hotels.",
        ]
        bullets = [
            "Kontaktlose SmartCard-Identifikation",
            "Externer Leser zur Wandmontage",
            "Integration in SimonsVoss-Schließsysteme",
            "Elegantes Design passend zur Gebäudeausstattung",
            "Ideal für Büros, Hotels und öffentliche Einrichtungen",
        ]
    elif "Antenne" in name:
        openings = [
            f"Die <strong>{mfr} externe Antenne (SREL.AV)</strong> erweitert die Reichweite Ihres SimonsVoss SmartRelais. Durch den Anschluss an das SmartRelais wird die Funkabdeckung verbessert – ideal für den Einsatz an Türen mit ungünstiger Signalsituation.",
            f"Optimieren Sie die Funkreichweite Ihres <strong>SimonsVoss SmartRelais</strong> mit der <strong>externen Antenne SREL.AV</strong>. Besonders bei metallreichen Türkonstruktionen oder dicken Wänden sorgt sie für eine zuverlässige Kommunikation.",
        ]
        bullets = [
            "Erweiterung der Funkreichweite für SmartRelais",
            "Einfacher Anschluss an bestehende SmartRelais-Installation",
            "Verbesserte Signalqualität bei schwierigen Einbausituationen",
            "Kompakte Bauform für unauffällige Montage",
            "Von <strong>SimonsVoss</strong> – Markenqualität in der Zutrittskontrolle",
        ]
    else:
        # Generic SimonsVoss
        openings = [
            f"Das <strong>{name}</strong> von <strong>{mfr}</strong> ist eine hochwertige Komponente für digitale Zutrittskontrollsysteme. Es erweitert Ihr bestehendes SimonsVoss-System um wichtige Funktionalität.",
        ]
        bullets = [
            "Hochwertige SimonsVoss-Qualität",
            "Nahtlose Integration in bestehende Systeme",
            "Einfache Installation und Konfiguration",
            "Zuverlässiger Dauerbetrieb",
            "Für Gewerbe und Objektbereiche optimiert",
        ]
    
    closings = [
        f"Ideal für <strong>Gewerbeobjekte</strong>, <strong>Bürogebäude</strong> und den <strong>Objektbereich</strong> – überall dort, wo moderne Zutrittskontrolle gefragt ist.",
        f"Perfekt für <strong>Unternehmen</strong>, <strong>Verwaltungen</strong> und <strong>öffentliche Einrichtungen</strong>, die auf digitale Schließtechnik setzen.",
        f"Geeignet für <strong>mittlere und große Objekte</strong>, <strong>Büros</strong> und <strong>Einrichtungen</strong> mit professionellem Sicherheitsbedarf.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_effeff(product, index):
    """Generate for effeff ASSA ABLOY electric door openers."""
    name = product['name']
    mfr = product['manufacturer']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    # Parse model and voltage
    model = ""
    voltage = ""
    has_entriegelung = "mechanische Entriegelung" in name or "Entriegelung" in name
    is_austausch = "Austauschstück" in name
    is_flachschliesblech = "Flachschließblech" in name
    
    m = re.search(r'Modellreihe (\d+E?)', name)
    if m:
        model = m.group(1)
    
    v = re.search(r'(\d+)[–-](\d+)\s*V', name)
    if v:
        voltage = f"{v.group(1)}–{v.group(2)} V"
    
    din = ""
    if "DIN links" in name:
        din = "DIN links"
    elif "DIN rechts" in name:
        din = "DIN rechts"
    
    if is_flachschliesblech:
        openings = [
            f"Das <strong>Flachschließblech</strong> von <strong>{mfr}</strong> ist ein unverzichtbares Zubehör für elektrische Türöffner. Es ermöglicht eine bündige Montage des Türöffners in der Zarge und sorgt für ein sauberes Erscheinungsbild.",
            f"Für eine fachgerechte Installation elektrischer Türöffner bietet <strong>{mfr}</strong> dieses <strong>Flachschließblech</strong>. Es gewährleistet einen ebenen Abschluss mit der Zargenoberfläche und ermöglicht eine professionelle Montage.",
        ]
        bullets = [
            "Flache Bauform für bündigen Einbau in der Zarge",
            "Kompatibel mit gängigen effeff-Türöffnern",
            "Robustes Material für dauerhaften Einsatz",
            "Saubere Optik durch flächenbündige Montage",
            "Einfache Installation bei Neubau und Nachrüstung",
        ]
    elif is_austausch:
        openings = [
            f"Das <strong>Austauschstück {mfr} Modellreihe {model}</strong> mit mechanischer Entriegelung dient zum schnellen Austausch eines defekten oder zum Nachrüsten eines elektrischen Türöffners. Es wird anstelle des Türöffners eingesetzt, wenn die Tür vorübergehend ohne elektrische Funktion betrieben werden soll.",
            f"Mit dem <strong>{mfr} Austauschstück Modellreihe {model}</strong> können Sie einen elektrischen Türöffner vorübergehend durch ein mechanisches Element ersetzen. Die integrierte <strong>mechanische Entriegelung</strong> gewährleistet weiterhin die Turfunktion.",
        ]
        bullets = [
            "Mechanische Entriegelung als Ersatz für den elektrischen Türöffner",
            f"Passend für <strong>Modellreihe {model}</strong>",
            "Schneller Austausch ohne Zargenumbau",
            "Ideal als Überbrückungslösung bei Wartung oder Defekt",
            "Von <strong>effeff ASSA ABLOY</strong> – passgenau für das Originalsystem",
        ]
    else:
        entri_text = " mit <strong>mechanischer Entriegelung</strong>" if has_entriegelung else ""
        din_text = f" in Ausführung <strong>{din}</strong>" if din else ""
        
        openings = [
            f"Der <strong>Elektro-Türöffner {mfr} Modellreihe {model}</strong>{entri_text}{din_text} ist ein zuverlässiger <strong>Türöffner</strong> für die elektrische Zutrittskontrolle. Mit einem Spannungsbereich von <strong>{voltage}</strong> eignet er sich für den Einsatz an Wohn-, Büro- und Objekttüren.",
            f"Steuern Sie den Zutritt komfortabel mit dem <strong>{mfr} Elektro-Türöffner Modellreihe {model}</strong>{entri_text}. Dieser <strong>elektrische Türöffner</strong> arbeitet im Spannungsbereich <strong>{voltage}</strong>{din_text} und ermöglicht die ferngesteuerte Türfreigabe.",
            f"Der <strong>elektrische Türöffner</strong> der Modellreihe {model} von <strong>{mfr}</strong>{entri_text} bietet bewährte Qualität für die Gebäudezutrittskontrolle. Im Spannungsbereich <strong>{voltage}</strong>{din_text} betrieben, öffnet er Türen per Tastendruck oder Steuerungseinheit.",
        ]
        
        bullets_base = [
            f"Spannungsbereich <strong>{voltage}</strong> (AC/DC)",
            f"Modellreihe <strong>{model}</strong> – bewährte effeff-Qualität",
            "Kompakte Bauform für den Einbau in Standard-Zargen",
            "Zuverlässige Funktion auch bei hoher Beanspruchung",
        ]
        if has_entriegelung:
            bullets_base.append("Mechanische Entriegelung für Notfälle und Wartungszwecke")
        else:
            bullets_base.append("Geräuscharmer Betrieb für angenehmes Raumklima")
        if din:
            bullets_base.append(f"Ausführung <strong>{din}</strong> – bitte Anschlagrichtung beachten")
        
        bullets = bullets_base
    
    closings = [
        f"Geeignet für <strong>Wohngebäude</strong>, <strong>Büros</strong> und den <strong>gewerblichen Objektbereich</strong>.",
        f"Bewährt im Einsatz bei <strong>Hauseingängen</strong>, <strong>Praxen</strong>, <strong>Büros</strong> und im <strong>Objektbau</strong>.",
        f"Ideal für <strong>Hausverwaltungen</strong>, <strong>Gewerbe</strong> und <strong>öffentliche Einrichtungen</strong>.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_bmh_einsteckschloss(product, index):
    """Generate for BMH mortise locks."""
    name = product['name']
    mfr = product['manufacturer']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    is_haustuer = "Haustür" in name
    is_zimmer = "Zimmertür" in name
    
    # Parse specs
    pz = "PZ gelocht" if "PZ" in name else ("BB gelocht" if "BB" in name else "")
    
    # Parse dimensions
    dims_match = re.search(r'(\d+)/(\d+)/(\d+)\s*mm', name)
    dorn = dims_match.group(1) if dims_match else ""
    nuss = dims_match.group(2) if dims_match else ""
    entf = dims_match.group(3) if dims_match else ""
    
    # Parse Stulp
    stulp = ""
    if "Stulp kantig" in name:
        stulp = "kantigem Stulp"
    elif "Stulp rund" in name:
        stulp = "rundem Stulp"
    elif "TGL Stulp" in name:
        stulp = "TGL-Stulp (Tageslösung)"
    
    # Parse DIN
    din = ""
    if "DIN links" in name:
        din = "DIN links"
    elif "DIN rechts" in name:
        din = "DIN rechts"
    elif "Anschlag links" in name:
        din = "Anschlag links"
    elif "Anschlag rechts" in name:
        din = "Anschlag rechts"
    
    # Parse Stulp dimensions
    stulp_dims = ""
    sdm = re.search(r'(\d+x\d+)\s*mm\s*Stulp', name)
    if sdm:
        stulp_dims = sdm.group(1) + " mm"
    if not stulp_dims:
        sdm2 = re.search(r'(\d+x\d+)\s*mm\s*TGL', name)
        if sdm2:
            stulp_dims = sdm2.group(1) + " mm"
    
    if is_haustuer:
        openings = [
            f"Das <strong>Haustür-Einsteckschloss {mfr} Nr. 34</strong> ist ein robustes <strong>Einsteckschloss</strong> speziell für Haus- und Wohnungseingangstüren. Mit {pz}, {dorn}/{nuss}/{entf} mm Maßen und {stulp} ({stulp_dims}) bietet es zuverlässige Sicherheit für den Eingangsbereich.",
            f"Sichern Sie Ihre Haustür mit dem <strong>{mfr} Einsteckschloss Nr. 34</strong> – einem professionellen <strong>Haustür-Einsteckschloss</strong> mit {pz} und {stulp}. Die Maße {dorn}/{nuss}/{entf} mm passen auf gängige Haustürprofile. Ausführung: <strong>{din}</strong>.",
            f"Das <strong>Einsteckschloss Nr. 34</strong> von <strong>{mfr}</strong> wurde speziell für den Einsatz an Haustüren konzipiert. Mit {pz}, {entf} mm Entfernung und {stulp} in {stulp_dims} erfüllt es die Anforderungen an moderne Eingangstürsicherheit.",
        ]
        stulp_display = f"{stulp} ({stulp_dims})" if stulp_dims else stulp
        bullets = [
            f"<strong>{pz}</strong> mit {entf} mm Entfernung",
            f"Dornmaß {dorn} mm, Nuss {nuss} mm",
            f"Stulpausführung: {stulp_display}",
            f"Anschlagrichtung: <strong>{din}</strong>",
            "Robuste Bauweise für den Dauereinsatz an Eingangstüren",
        ]
    else:
        stulp_display = f"{stulp} ({stulp_dims})" if stulp_dims else stulp
        openings = [
            f"Das <strong>Zimmertür-Einsteckschloss {mfr} Nr. 1</strong> ist ein bewährtes <strong>Einsteckschloss</strong> für Innentüren. Mit {pz} und den Maßen {dorn}/{nuss}/{entf} mm passt es in gängige Zimmertürprofile und bietet zuverlässige Funktion im Alltag.",
            f"Für zuverlässige Funktion an Innentüren sorgt das <strong>{mfr} Einsteckschloss Nr. 1</strong>. Dieses <strong>Zimmertür-Einsteckschloss</strong> mit {pz} und {stulp} eignet sich für Standard-Zimmertüren in Wohn- und Gewerbegebäuden.",
        ]
        bullets = [
            f"<strong>{pz}</strong> mit {entf} mm Entfernung",
            f"Dornmaß {dorn} mm, Nuss {nuss} mm",
            f"Stulpausführung: {stulp_display}",
            f"Anschlagrichtung: <strong>{din}</strong>",
            "Leichtgängige Mechanik für komfortable Bedienung",
        ]
    
    closings = [
        f"Geeignet für <strong>Neubauten</strong>, <strong>Sanierungen</strong> und den <strong>Objektbereich</strong>.",
        f"Ideal für <strong>Wohngebäude</strong>, <strong>Gewerbe</strong> und den <strong>Objektbau</strong>.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_dom_zylinder(product, index):
    """Generate for DOM cylinders."""
    name = product['name']
    mfr = product['manufacturer']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    if "Hangschloss" in name or "hangschloss" in name:
        openings = [
            f"Das <strong>{name}</strong> vereint die Sicherheit des hochwertigen ix Twido-Systems mit der Flexibilität eines <strong>Vorhängeschlosses</strong>. Mit 32,5 mm Bügelhöhe eignet es sich ideal zum Absichern von Spinden, Toren, Kellern und Nebengebäuden.",
            f"Sichern Sie mobile Zugänge mit dem <strong>{mfr} ix Twido Hangschloss</strong>. Dieses <strong>Vorhängeschloss</strong> mit 32,5 mm Bügelhöhe nutzt das bewährte ix Twido-Schließsystem und lässt sich in bestehende Schließanlagen integrieren.",
        ]
        bullets = [
            "Bügelhöhe <strong>32,5 mm</strong> – kompakte, sichere Bauform",
            "Basierend auf dem <strong>DOM ix Twido</strong>-Schließsystem",
            "In bestehende Schließanlagen integrierbar",
            "Gehärteter Bügel gegen Aufbruchversuche",
            "Patentgeschütztes Schlüsselprofil",
        ]
    elif "Doppelzylinder" in name:
        openings = [
            f"Der <strong>{name}</strong> ist ein zuverlässiger <strong>Schließzylinder</strong> aus dem Hause <strong>{mfr}</strong>. Als Doppelzylinder bietet er beidseitige Schließfunktion und eignet sich für Haus-, Wohnungs- und Nebeneingangstüren.",
            f"Mit dem <strong>{mfr} RN Doppelzylinder</strong> setzen Sie auf bewährte Schließtechnik. Dieser <strong>Profilzylinder</strong> mit beidseitigem Schlüsselzugang bietet solide Sicherheit für den täglichen Einsatz.",
        ]
        bullets = [
            "Beidseitige Schließfunktion (Doppelzylinder)",
            "Europrofil-Standard für gängige Einsteckschlösser",
            "Robuste <strong>DOM</strong>-Qualität für dauerhaften Betrieb",
            "Verschiedene Längen verfügbar – passend für Ihre Tür",
            "Inklusive Schlüssel – Nachbestellung über Sicherungskarte",
        ]
    elif "Halbzylinder" in name:
        openings = [
            f"Der <strong>{name}</strong> von <strong>{mfr}</strong> ist ein kompakter <strong>Halbzylinder</strong> für Anwendungen, bei denen nur von einer Seite geschlossen werden muss. Typische Einsatzbereiche sind Garagentore, Schaltschränke und Briefkästen.",
            f"Für einseitige Schließanwendungen bietet <strong>{mfr}</strong> den <strong>RN Halbzylinder</strong>. Dieser <strong>Profilzylinder</strong> wird dort eingesetzt, wo eine Schlüsselseite ausreicht – etwa an Garagen, Kellertüren oder technischen Zugängen.",
        ]
        bullets = [
            "Einseitige Schließfunktion (Halbzylinder)",
            "Kompakte Bauform für spezielle Einbausituationen",
            "Europrofil-Standard – universell einsetzbar",
            "Solide <strong>DOM</strong>-Verarbeitung",
            "Ideal für Garagen, Schaltschränke und Briefkastenanlagen",
        ]
    elif "Knaufzylinder" in name:
        openings = [
            f"Der <strong>{name}</strong> von <strong>{mfr}</strong> kombiniert eine Schlüsselseite mit einem komfortablen Drehknauf. Dieser <strong>Knaufzylinder</strong> ermöglicht das Verriegeln von innen ohne Schlüssel – ideal für Wohnungseingangstüren.",
            f"Komfort trifft Sicherheit: Der <strong>{mfr} RN Knaufzylinder</strong> bietet außen die Schließfunktion per Schlüssel und innen einen Drehknauf. So verlassen Sie die Wohnung jederzeit ohne Schlüsselsuche – ein bewährter <strong>Profilzylinder</strong> für den Alltag.",
        ]
        bullets = [
            "Außen Schlüssel, innen Drehknauf – maximaler Komfort",
            "Europrofil-Standard für alle gängigen Einsteckschlösser",
            "Schnelle Notöffnung von innen ohne Schlüssel",
            "Zuverlässige <strong>DOM</strong>-Qualität",
            "Perfekt für Wohnungstüren und Büros",
        ]
    else:
        # Generic DOM
        openings = [
            f"Der <strong>{name}</strong> von <strong>{mfr}</strong> ist ein hochwertiger <strong>Schließzylinder</strong> für den professionellen Einsatz. Aus dem bewährten DOM-Sortiment bietet er zuverlässige Sicherheit und langlebige Funktion.",
        ]
        bullets = [
            "Europrofil-Standard – universell kompatibel",
            "Hochwertige <strong>DOM</strong>-Verarbeitung",
            "Langlebige Mechanik für den Dauereinsatz",
            "Verschiedene Ausführungen verfügbar",
            "Für Privat und Gewerbe geeignet",
        ]
    
    closings = [
        f"Geeignet für <strong>Privathaushalte</strong>, <strong>Gewerbeobjekte</strong> und die Integration in <strong>Schließanlagen</strong>.",
        f"Ideal für <strong>Wohn-</strong> und <strong>Geschäftsgebäude</strong> sowie den <strong>Objektbereich</strong>.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_burg_waechter_briefkasten(product, index):
    """Generate for Burg Wächter mailbox locks."""
    name = product['name']
    mfr = product['manufacturer']
    pn = product['product_number']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    # Parse model
    model = ""
    if "ZBK 72" in name:
        model = "ZBK 72"
        spec = "ein Zylinderschloss (Briefkastenzylinder)"
    elif "ZS 77" in name:
        model = "ZS 77"
        spec = "ein Stiftschloss für gängige Briefkastenanlagen"
    elif "ZS 81" in name:
        model = "ZS 81"
        spec = "ein universelles Stiftschloss für Briefkästen"
    else:
        model = pn
        spec = "ein Briefkastenschloss"
    
    openings = [
        f"Das <strong>{mfr} Briefkastenschloss {model}</strong> ist {spec} inklusive 2 Schlüsseln. Es eignet sich hervorragend zum Austausch defekter Briefkastenschlösser oder zur Nachrüstung an gängigen Briefkastenanlagen.",
        f"Ersetzen Sie Ihr altes Briefkastenschloss unkompliziert mit dem <strong>{mfr} {model}</strong>. Dieses <strong>Briefkastenschloss</strong> wird komplett mit 2 Schlüsseln geliefert und passt in gängige Briefkastenmodelle.",
        f"Das <strong>Briefkastenschloss {model}</strong> von <strong>{mfr}</strong> bietet zuverlässigen Schutz für Ihre Post. Inklusive 2 Schlüsseln ist es sofort einsatzbereit und lässt sich leicht montieren.",
    ]
    
    bullets = [
        f"Modell <strong>{model}</strong> – passend für gängige Briefkasten-Ausschnitte",
        "Inklusive <strong>2 Schlüssel</strong> – sofort einsatzbereit",
        "Schneller Austausch ohne Spezialwerkzeug",
        f"Bewährte <strong>{mfr}</strong>-Qualität",
        "Für Einzel- und Mehrfach-Briefkastenanlagen geeignet",
    ]
    
    closings = [
        f"Ideal für <strong>Privathaushalte</strong>, <strong>Mehrfamilienhäuser</strong> und <strong>Hausverwaltungen</strong>.",
        f"Geeignet für den <strong>privaten Bereich</strong> und <strong>Wohnanlagen</strong>.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_salto(product, index):
    """Generate for Salto access control products."""
    name = product['name']
    mfr = product['manufacturer']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    if "Keytag" in name or "Identmedium" in name or "DESFIRE" in name:
        openings = [
            f"Der <strong>{name}</strong> ist ein kontaktloses Identifikationsmedium für Salto-Zutrittskontrollsysteme. Als kompakter Schlüsselanhänger mit <strong>MIFARE DESFire®</strong>-Technologie (4K Speicher) ermöglicht er die berührungslose Identifikation an allen Salto-Lesern.",
            f"Nutzen Sie den <strong>SALTO DESFIRE® Keytag 4K</strong> als handlichen Schlüsselanhänger für Ihre elektronische Zutrittskontrolle. Dank <strong>MIFARE DESFire®</strong>-Chip bietet dieses <strong>Identmedium</strong> höchste Sicherheit bei kontaktloser Übertragung.",
        ]
        bullets = [
            "<strong>MIFARE DESFire®</strong>-Technologie mit 4K Speicher",
            "Kontaktlose Identifikation per Funk",
            "Kompakter Schlüsselanhänger – immer griffbereit",
            "Kompatibel mit allen <strong>Salto</strong>-Zutrittspunkten",
            "Verschlüsselte Datenübertragung für maximale Sicherheit",
        ]
    elif "XS4" in name:
        # Parse model variant
        model_num = ""
        m = re.search(r'EM(\d+\w*)', name)
        if m:
            model_num = m.group(0)
        
        din_text = ""
        if "DIN RO" in name:
            din_text = " in Ausführung <strong>DIN Rechts Offen</strong>"
        elif "DIN SH" in name:
            din_text = " in Ausführung <strong>DIN Selbst Hemmend</strong>"
        elif "DIN" in name:
            din_text = " in DIN-Ausführung"
        
        openings = [
            f"Der <strong>Salto XS4 Original+ Beschlag {model_num}</strong>{din_text} ist ein elektronischer <strong>Türbeschlag</strong> für die kabellose Zutrittskontrolle. Er wird anstelle eines mechanischen Beschlags montiert und verwandelt jede Standardtür in einen intelligent gesteuerten Zugang.",
            f"Modernisieren Sie Ihre Türen mit dem <strong>Salto XS4 Original+ {model_num}</strong>{din_text}. Dieser elektronische <strong>Zutrittskontroll-Beschlag</strong> bietet eine elegante, kabellose Lösung für die Steuerung von Zugangsberechtigungen.",
            f"Der <strong>{name}</strong> ermöglicht kabellose Zutrittskontrolle auf höchstem Niveau. Als elektronischer <strong>Türbeschlag</strong> der XS4 Original+-Serie{din_text} bietet er eine professionelle Lösung für Gebäudesicherheit.",
        ]
        bullets = [
            "Kabellose Zutrittskontrolle – kein Verdrahten notwendig",
            f"<strong>Salto XS4 Original+</strong> Serie – Modell {model_num}",
            "Integration in das SALTO Virtual Network (SVN)",
            "Batteriebetrieben mit langer Lebensdauer",
            "RFID-Leser im Beschlag integriert",
        ]
    else:
        openings = [
            f"Das <strong>{name}</strong> von <strong>{mfr}</strong> ist eine hochwertige Komponente für elektronische Zutrittskontrollsysteme. Salto steht für innovative, kabellose Schließtechnik auf höchstem Niveau.",
        ]
        bullets = [
            "Hochwertige Salto-Qualität",
            "Integration in Salto-Zutrittskontrollsysteme",
            "Kabellose Technologie",
            "Professionelle Sicherheitslösung",
            "Für Gewerbe und Objektbereich optimiert",
        ]
    
    closings = [
        f"Ideal für <strong>Bürogebäude</strong>, <strong>Hotels</strong>, <strong>Gesundheitseinrichtungen</strong> und den <strong>Objektbereich</strong>.",
        f"Perfekt für <strong>Unternehmen</strong>, <strong>Bildungseinrichtungen</strong> und <strong>öffentliche Gebäude</strong> mit professioneller Zutrittskontrolle.",
        f"Geeignet für <strong>Gewerbeobjekte</strong>, <strong>Kliniken</strong> und alle Einrichtungen mit hohen Sicherheitsanforderungen.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_axa(product, index):
    """Generate for AXA Bike Security products."""
    name = product['name']
    mfr = product['manufacturer']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    if "Einsteckkette" in name:
        # Parse dimensions
        dims = re.search(r'(\d+)\s*/\s*(\d+[,.]?\d*)', name)
        length = dims.group(1) if dims else ""
        thickness = dims.group(2) if dims else ""
        
        openings = [
            f"Die <strong>{name}</strong> ist eine robuste <strong>Einsteckkette</strong> für die Zusatzsicherung Ihres Fahrrads. Mit {length} cm Kettenlänge und {thickness} mm Gliedstärke bietet sie einen soliden Schutz gegen Diebstahl – perfekt als Ergänzung zu einem Rahmenschloss.",
            f"Erweitern Sie den Diebstahlschutz Ihres Fahrrads mit der <strong>{name}</strong>. Diese <strong>Einsteckkette</strong> mit {thickness} mm starken Gliedern und {length} cm Länge wird direkt in ein kompatibles Rahmenschloss eingesteckt und sichert das Rad an festen Gegenständen.",
        ]
        bullets = [
            f"Kettenlänge <strong>{length} cm</strong> – ausreichend für Laternen und Fahrradständer",
            f"Gliedstärke <strong>{thickness} mm</strong> – widerstandsfähig gegen Schneidwerkzeuge",
            "Einstecksystem – passt in gängige AXA-Rahmenschlösser",
            "Gehärteter Stahl mit Textilummantelung (lackschonend)",
            "Von <strong>AXA Bike Security</strong> – Spezialist für Fahrradsicherung",
        ]
    elif "Retractable" in name:
        is_large = "Large" in name
        is_xlarge = "X Large" in name
        size = "X Large" if is_xlarge else ("Large" if is_large else "")
        
        openings = [
            f"Das <strong>{name}</strong> ist ein ausziehbares <strong>Kabelschloss</strong> für Fahrräder. Dank des Retractable-Mechanismus zieht sich das Kabel nach Gebrauch automatisch zurück – kein umständliches Aufwickeln mehr. Die {size}-Ausführung bietet zusätzliche Kabellänge für mehr Flexibilität.",
            f"Kompakt, praktisch, sicher: Das <strong>{name}</strong> kombiniert ein <strong>Spiralkabelschloss</strong> mit automatischem Einzug. Einfach ausziehen, anschließen, fertig – und nach dem Aufschließen rollt sich das Kabel von selbst auf.",
        ]
        bullets = [
            "Automatischer Kabeleinzug (Retractable) – kein Aufwickeln nötig",
            f"<strong>{size}</strong>-Ausführung mit extra Kabellänge",
            "Integriertes Schloss mit Schlüssel",
            "Kompaktes Format – passt an jeden Rahmen",
            "Von <strong>AXA Bike Security</strong> – Qualität aus den Niederlanden",
        ]
    elif "Floor Anchor" in name:
        openings = [
            f"Der <strong>{name}</strong> ist ein massiver <strong>Bodenanker</strong> zur dauerhaften Sicherung von Fahrrädern, Motorrädern und anderen Wertgegenständen. Er wird fest im Boden verankert und bietet einen unverrückbaren Anschlusspunkt für Ketten und Bügelschlösser.",
            f"Schaffen Sie einen festen Anschlusspunkt mit dem <strong>AXA Floor Anchor</strong>. Dieser <strong>Bodenanker</strong> wird dauerhaft im Boden montiert und bietet höchsten Diebstahlschutz für Fahrräder und Zweiräder in Garagen, Kellern oder Innenhöfen.",
        ]
        bullets = [
            "Massive Stahlkonstruktion für höchsten Widerstand",
            "Dauerhafte Bodenmontage mit Schwerlast-Dübeln",
            "Universeller Anschlusspunkt für Ketten und Bügelschlösser",
            "Flache Bauform – kein Stolpern bei Nichtgebrauch",
            "Von <strong>AXA Bike Security</strong> – Premium-Fahrradsicherung",
        ]
    else:
        openings = [
            f"Das <strong>{name}</strong> von <strong>{mfr}</strong> bietet zuverlässigen Schutz für Ihr Fahrrad. Als Spezialist für Zweiradsicherheit liefert AXA hochwertige Schlösser und Sicherungslösungen.",
        ]
        bullets = [
            "Hochwertige AXA-Qualität",
            "Robuste Verarbeitung für den Alltagseinsatz",
            "Einfache Handhabung",
            "Bewährter Diebstahlschutz",
            "Speziell für Fahrräder entwickelt",
        ]
    
    closings = [
        f"Ideal für <strong>Pendler</strong>, <strong>Freizeitradler</strong> und alle, die ihr Fahrrad zuverlässig sichern möchten.",
        f"Geeignet für <strong>E-Bikes</strong>, <strong>Stadträder</strong> und <strong>Tourenräder</strong> – überall dort, wo Ihr Fahrrad sicher angeschlossen sein muss.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_bever_schlosskasten(product, index):
    """Generate for Bever lock cases."""
    name = product['name']
    mfr = product['manufacturer']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    # Parse size
    size = ""
    m = re.search(r'(\d+)\s*mm', name)
    if m:
        size = m.group(1) + " mm"
    
    openings = [
        f"Der <strong>{name}</strong> von <strong>{mfr}</strong> ist ein kompakter <strong>Schlosskasten</strong> für den Einsatz an Gittern, Toren und Pforten. Mit einer Profilbreite von {size} bietet er eine zuverlässige Schließlösung für Außenanwendungen.",
        f"Sichern Sie Tore und Pforten mit dem <strong>Schlosskasten {mfr}</strong> für {size} Profilrohre. Dieser aufschraubbare <strong>Schlosskasten</strong> ist komplett mit Schließmechanik geliefert und sofort einsatzbereit.",
    ]
    
    bullets = [
        f"Passend für Profilrohre mit <strong>{size}</strong> Breite",
        "Komplett mit Schließmechanik – sofort einsatzbereit",
        "Robuste Bauweise für den Außeneinsatz",
        "Aufschraubbarer Kastenaufbau – einfache Montage",
        "Von <strong>Bever</strong> – Spezialist für Tor- und Pforten-Schlösser",
    ]
    
    closings = [
        f"Ideal für <strong>Gartentore</strong>, <strong>Hofeinfahrten</strong> und <strong>Gewerbeeinzäunungen</strong>.",
        f"Geeignet für <strong>Privat</strong> und <strong>Gewerbe</strong> – überall dort, wo Tore und Pforten sicher verschlossen werden müssen.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_bever_kastenschloss(product, index):
    """Generate for Bever universal box locks."""
    name = product['name']
    mfr = product['manufacturer']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    locking = "BB" if "BB" in name else ("PZ" if "PZ" in name else "")
    locking_full = "Buntbart (BB)" if locking == "BB" else "Profilzylinder (PZ)"
    
    openings = [
        f"Das <strong>Universal-Kastenschloss {mfr}</strong> mit schließender Falle und <strong>{locking_full}</strong>-Lochung ist ein vielseitiges Aufschraubschloss für Innentüren, Kellertüren und Nebeneingänge. Es ist links wie rechts sowie einwärts wie auswärts verwendbar – maximale Flexibilität bei der Montage.",
        f"Vielseitig einsetzbar: Das <strong>{mfr} Universal-Kastenschloss</strong> mit <strong>{locking_full}</strong>-Lochung und schließender Falle eignet sich für nahezu jede Einbausituation. Dank seiner universellen Verwendbarkeit (links/rechts, einwärts/auswärts) benötigen Sie nur eine Ausführung.",
    ]
    
    bullets = [
        f"<strong>{locking_full}</strong>-Lochung – für den passenden Einsatzzweck",
        "Schließende Falle für automatisches Einrasten",
        "Universal verwendbar: links/rechts, einwärts/auswärts",
        "Aufschraubbares Kastenschloss – einfache Montage ohne Ausstemmen",
        "Von <strong>Bever</strong> – bewährte Qualität in der Schlosstechnik",
    ]
    
    closings = [
        f"Ideal für <strong>Kellertüren</strong>, <strong>Nebeneingänge</strong> und <strong>Zimmertüren</strong> ohne Schlosskasten.",
        f"Geeignet für <strong>Altbautüren</strong>, <strong>Nebentüren</strong> und überall dort, wo ein Aufschraubschloss die beste Lösung ist.",
    ]
    
    oi = h % len(openings)
    ci = (h // 1000) % len(closings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closings[ci]}</p>"
    return html


def generate_generic(product, index):
    """Generate for any remaining product not covered by specific generators."""
    name = product['name']
    mfr = product['manufacturer']
    desc = product['current_description']
    
    h = int(hashlib.md5(product['id'].encode()).hexdigest(), 16)
    
    # Product-specific handling
    if "BASI BK 900" in name:
        openings = [
            f"Die <strong>BASI BK 900</strong> ist eine kompakte <strong>Bügel-Kabelkombination</strong> von <strong>{mfr}</strong>, die vielseitigen Diebstahlschutz für Fahrräder und andere Gegenstände bietet. Das flexible Kabel ermöglicht eine einfache Befestigung an verschiedensten Fixpunkten.",
        ]
        bullets = [
            "Kombination aus Bügel und Kabel für doppelte Sicherheit",
            "Flexibles Kabel für vielseitige Anschlussmöglichkeiten",
            "Kompakte Bauform – leicht zu transportieren",
            "Robuster Schließmechanismus",
            "Von <strong>BASI</strong> – deutscher Hersteller für Sicherheitstechnik",
        ]
        closing = "Geeignet für <strong>Fahrräder</strong>, <strong>Roller</strong> und als Zusatzsicherung im <strong>Alltag</strong>."
        
    elif "BASI BK 100M" in name:
        openings = [
            f"Das <strong>BASI BK 100M</strong> ist ein handliches <strong>Bügelschloss</strong> von <strong>{mfr}</strong>, das durch seine kompakte Bauform und solide Verarbeitung überzeugt. Es bietet zuverlässigen Basisschutz für Fahrräder und lässt sich leicht am Rahmen transportieren.",
        ]
        bullets = [
            "Kompaktes <strong>Bügelschloss</strong> für den Alltagseinsatz",
            "Gehärteter Stahlbügel gegen Aufbruchversuche",
            "Inklusive Schlüssel – sofort einsatzbereit",
            "Leichtgewichtig und transportfreundlich",
            "Von <strong>BASI</strong> – Qualität Made in Germany",
        ]
        closing = "Ideal für <strong>Kurzstreckenfahrer</strong>, <strong>Pendler</strong> und als Zweitschloss für unterwegs."
        
    elif "Reparaturblech" in name:
        openings = [
            f"Das <strong>Reparaturblech in Edelstahl</strong> von <strong>{mfr}</strong> ist ein unverzichtbares Hilfsmittel bei der Nachrüstung oder dem Austausch von Türschlössern und Beschlägen. Es verdeckt Ausbrüche, alte Bohrlöcher und Beschädigungen im Türblatt zuverlässig.",
        ]
        bullets = [
            "Hochwertiger <strong>Edelstahl</strong> – korrosionsbeständig und langlebig",
            "Verdeckt Beschädigungen und alte Ausschnitte im Türblatt",
            "Professionelle Optik bei Schloss- und Beschlagaustausch",
            "Einfache Montage durch Aufschrauben",
            "Von <strong>Becker Sicherheitstechnik</strong> – Fachkompetenz in Schließtechnik",
        ]
        closing = "Ideal für <strong>Schlüsseldienste</strong>, <strong>Hausmeister</strong> und <strong>Sanierungsprojekte</strong>."
        
    elif "Paketbriefkasten" in name or "Paketbox" in name:
        openings = [
            f"Der <strong>{name}</strong> ist eine praktische <strong>Paketbox</strong> für die sichere Zustellung von Paketen, wenn Sie nicht zu Hause sind. In schlichtem Schwarz fügt sich der Paketbriefkasten dezent in jeden Eingangsbereich ein.",
        ]
        bullets = [
            "Sichere Paketannahme auch bei Abwesenheit",
            "Großes Fassungsvermögen für Standard-Pakete",
            "Robuste Bauweise mit Schloss gegen unbefugte Entnahme",
            "Unauffälliges Design in <strong>Schwarz</strong>",
            "Von <strong>Rottner Tresor</strong> – Spezialist für Sicherheitsaufbewahrung",
        ]
        closing = "Ideal für <strong>Eigenheime</strong>, <strong>Reihenhäuser</strong> und alle, die häufig Pakete empfangen."
        
    elif "Türspionverlängerung" in name:
        openings = [
            f"Die <strong>{name}</strong> von <strong>{mfr}</strong> verlängert bestehende Türspione um <strong>20 mm</strong>. Sie ist die ideale Lösung, wenn durch Dämm- oder Verkleidungsmaßnahmen die Türblattstärke zugenommen hat und der vorhandene Spion nicht mehr passt.",
        ]
        bullets = [
            "Verlängerung um <strong>20 mm</strong> für dickere Türblätter",
            "Kompatibel mit gängigen Türspionen",
            "Einfache Montage durch Zwischenschrauben",
            "Notwendig bei nachträglicher Dämmung oder Verkleidung",
            "Hochwertige Verarbeitung von <strong>BMB</strong>",
        ]
        closing = "Praktisches Zubehör für <strong>Sanierungen</strong>, <strong>Renovierungen</strong> und den <strong>Objektbau</strong>."
        
    elif "Schlüsselkasten" in name or "Schluesselkasten" in name:
        openings = [
            f"Der <strong>{name}</strong> ist ein mobiler <strong>Schlüsselkasten</strong> mit abnehmbarem Bügel für die sichere Aufbewahrung von Schlüsseln. Ob am Ferienhaus, bei Vermietungen oder am Arbeitsplatz – mit einer individuell einstellbaren Zahlenkombination haben nur autorisierte Personen Zugang zu den Schlüsseln.",
        ]
        bullets = [
            "Individuell einstellbare <strong>Zahlenkombination</strong>",
            "Abnehmbarer Bügel für flexible Befestigung",
            "Robustes Gehäuse aus wetterfestem Material",
            "Platz für Haus- und Autoschlüssel",
            "Von <strong>Master Lock</strong> – weltweit führend bei Sicherheitsschlössern",
        ]
        closing = "Ideal für <strong>Ferienwohnungen</strong>, <strong>Baustellen</strong>, <strong>Vermieter</strong> und den <strong>gewerblichen Einsatz</strong>."
        
    elif "Minisafe" in name:
        openings = [
            f"Der <strong>{name}</strong> ist ein kompakter, tragbarer <strong>Reisesafe</strong> mit individuell einstellbarer Zahlenkombination. Er schützt Ihre Wertsachen unterwegs – im Hotel, am Strand oder auf Reisen. Das flexible Stahlkabel ermöglicht die Befestigung an festen Gegenständen.",
        ]
        bullets = [
            "Individuell einstellbare <strong>Zahlenkombination</strong> – kein Schlüssel nötig",
            "Tragbar und kompakt – ideal für unterwegs",
            "Stahlkabel zur Sicherung an festen Gegenständen",
            "Schützt Geldbörse, Smartphone und Reisedokumente",
            "Von <strong>Master Lock</strong> – bewährter Schutz weltweit",
        ]
        closing = "Perfekt für <strong>Reisende</strong>, <strong>Strandbesucher</strong> und alle, die ihre Wertsachen unterwegs sichern möchten."
        
    elif "Profiltürdrückerlochteil" in name or "Profiltür-Knopf" in name:
        is_knopf = "Knopf" in name
        typ = "Profiltür-Knopf" if is_knopf else "Profiltürdrückerlochteil"
        
        finish = ""
        if "VA EST" in name:
            finish = "Edelstahl (VA EST)"
        elif "Alu.F1" in name and "F12" not in name:
            finish = "Aluminium naturfarben (F1)"
        elif "Alu.F12" in name:
            finish = "Aluminium weiß (F12)"
        
        if is_knopf:
            openings = [
                f"Der <strong>{name}</strong> von <strong>{mfr}</strong> ist ein formschöner <strong>Profiltür-Knopf</strong> in {finish}. Er dient als feststehender Griff auf der Außenseite von Profiltüren und ergänzt das Drückerlochteil auf der Innenseite.",
            ]
            bullets = [
                f"Ausführung in <strong>{finish}</strong>",
                "Feststehender Knopf für die Türaußenseite",
                "Passend für gängige Profiltürsysteme",
                "Kombinierbar mit EDI-Drückerlochteilen",
                "Robuste Verarbeitung für den Dauerbetrieb",
            ]
        else:
            openings = [
                f"Das <strong>{name}</strong> von <strong>{mfr}</strong> ist ein hochwertiges <strong>Drückerlochteil</strong> für Profiltüren in {finish}. Es wird innenseitig montiert und ermöglicht die komfortable Bedienung der Türfallenöffnung.",
            ]
            bullets = [
                f"Ausführung in <strong>{finish}</strong>",
                "Drückerlochteil für die Türinnenseite",
                "Passend für Profiltür-Einsteckschlösser",
                "Ergonomische Form für bequeme Bedienung",
                "Von <strong>EDI</strong> – Qualitätsbeschläge für Profiltüren",
            ]
        
        closing = "Geeignet für <strong>Bürogebäude</strong>, <strong>Geschäfte</strong> und den <strong>Objektbereich</strong> mit Profiltürsystemen."
        
    elif "Glastür-Einsteckschloss" in name:
        din = "DIN links" if "DIN links" in name else ("DIN rechts" if "DIN rechts" in name else "")
        
        openings = [
            f"Das <strong>{name}</strong> ist ein spezielles <strong>Einsteckschloss</strong> für Ganzglastüren. Mit PZ-Lochung, 40/8/72 mm Maßen und kantigem Stulp (20×235 mm) passt es in gängige Ganzglas-Türsysteme. Ausführung: <strong>{din}</strong>.",
            f"Für Ganzglastüren konzipiert: Das <strong>BKS Glastür-Einsteckschloss</strong> ({din}) bietet zuverlässige Verriegelung mit PZ-Lochung. Die Maße 40/8/72 mm und der 20×235 mm Stulp sind auf die Anforderungen von <strong>Glastüren</strong> abgestimmt.",
        ]
        bullets = [
            "<strong>PZ gelocht</strong> mit 72 mm Entfernung",
            "Dornmaß 40 mm, Nuss 8 mm",
            "Stulp 20×235 mm kantig – passend für Ganzglastüren",
            f"Anschlagrichtung: <strong>{din}</strong>",
            "Von <strong>BKS</strong> – Markenqualität in der Schlosstechnik",
        ]
        closing = "Ideal für <strong>Büros</strong>, <strong>Praxen</strong> und <strong>Geschäftsräume</strong> mit Ganzglastüren."
        
    elif "Mülltonnenverschluss" in name:
        is_gs = "gleichschließend" in name
        gs_text = " in <strong>gleichschließender</strong> Ausführung" if is_gs else ""
        
        openings = [
            f"Der <strong>{name}</strong> sichert Ihre Mülltonnen{gs_text} gegen unbefugtes Befüllen und Durchsuchen. Passend für Tonnen von <strong>60 bis 360 Liter</strong> bietet er eine einfache und effektive Lösung gegen Fremdeinwurf und Mülldiebstahl.",
            f"Schützen Sie Ihre Mülltonnen mit dem <strong>CTS Mülltonnenverschluss</strong>{gs_text}. Universal passend für <strong>60- bis 360-Liter-Tonnen</strong> verhindert er zuverlässig das Fremdeinwerfen von Abfall und schützt vor unbefugtem Zugriff.",
        ]
        bullets_base = [
            "Universell passend für Tonnen von <strong>60 bis 360 Liter</strong>",
            "Schutz gegen Fremdeinwurf und unbefugtes Durchsuchen",
            "Einfache Montage ohne Bohren oder Schrauben",
            "Robuste Ausführung für den ganzjährigen Außeneinsatz",
        ]
        if is_gs:
            bullets_base.append("<strong>Gleichschließend</strong> – ein Schlüssel für alle Tonnen")
        else:
            bullets_base.append("Mit Profilzylinder – auf Wunsch in Schließanlagen integrierbar")
        bullets = bullets_base
        closing = "Ideal für <strong>Hausverwaltungen</strong>, <strong>Mehrfamilienhäuser</strong> und <strong>Gewerbebetriebe</strong>."
        
    elif "Obentürschließer" in name or "Türschließer" in name:
        openings = [
            f"Der <strong>{name}</strong> ist ein zuverlässiger <strong>Obentürschließer</strong> mit Gestänge in silberfarbiger Ausführung (EV1). Er sorgt für ein kontrolliertes, sanftes Schließen der Tür und ist nach DIN EN 1154 klassifiziert.",
        ]
        bullets = [
            "Kontrolliertes Schließen mit einstellbarer Geschwindigkeit",
            "Aufschraubbares Gestänge – einfache Montage",
            "Silberfarbene Ausführung <strong>EV1</strong> – dezente Optik",
            "Geeignet für Türen bis zu einer definierten Breite und Gewicht",
            "Von <strong>GEZE</strong> – Marktführer für Türschließtechnik",
        ]
        closing = "Ideal für <strong>Büros</strong>, <strong>öffentliche Gebäude</strong>, <strong>Schulen</strong> und den <strong>Objektbereich</strong>."
        
    elif "Absperrpfosten" in name:
        openings = [
            f"Der <strong>{name}</strong> ist ein umlegbarer <strong>Absperrpfosten</strong> aus Stahlrohr (70×70 mm) zum Aufdübeln auf befestigtem Untergrund. Mit integriertem Profilzylinder lässt er sich bequem entriegeln und umlegen, wenn die Durchfahrt benötigt wird.",
        ]
        bullets = [
            "Umlegbar mit <strong>Profilzylinder</strong> – komfortable Bedienung",
            "Stahlrohr <strong>70×70 mm</strong> – stabile Ausführung",
            "Zum Aufdübeln auf Beton, Pflaster oder Asphalt",
            "Feuerverzinkt für Korrosionsschutz im Außenbereich",
            "Von <strong>Schake</strong> – Qualität für Absperr- und Sicherheitstechnik",
        ]
        closing = "Ideal für <strong>Parkplätze</strong>, <strong>Einfahrten</strong> und <strong>Gewerbegrundstücke</strong>."
        
    elif "Briefkastenschloss" in name and "Euro-Locks" in mfr:
        openings = [
            f"Das <strong>{name}</strong> ist ein hochwertiges <strong>Zylinderschloss</strong> speziell für JU-Briefkästen. Inklusive 2 Schlüsseln bietet es einen unkomplizierten Austausch des alten Schlosses und zuverlässigen Schutz für Ihre Post.",
        ]
        bullets = [
            "Speziell passend für <strong>JU-Briefkästen</strong>",
            "Inklusive <strong>2 Schlüssel</strong> – sofort einsatzbereit",
            "Zylinderschloss für sicheren Postverschluss",
            "Einfacher Austausch des vorhandenen Schlosses",
            "Von <strong>Euro-Locks</strong> – Spezialist für Funktionsschlösser",
        ]
        closing = "Ideal für <strong>Wohnanlagen</strong> und <strong>Mehrfamilienhäuser</strong> mit JU-Briefkastenanlagen."
        
    elif "Bodenplatte" in name and "Türpuffer" in name:
        openings = [
            f"Die <strong>{name}</strong> ist eine robuste Montageplatte für FSB-Türpuffer in schwarzer Ausführung. Sie wird am Boden befestigt und nimmt den Türpuffer auf, der das unkontrollierte Aufschlagen der Tür verhindert und Wand sowie Tür schützt.",
        ]
        bullets = [
            "Bodenplatte für <strong>FSB Türpuffer 3884</strong>",
            "Schwarze Ausführung – dezente Optik am Boden",
            "Robuste Befestigung per Verschraubung",
            "Schützt Wand und Tür vor Beschädigungen",
            "Von <strong>FSB</strong> – Premium-Türbeschläge aus Deutschland",
        ]
        closing = "Ideal für <strong>Büros</strong>, <strong>Praxen</strong> und den <strong>Objektbereich</strong>."
        
    elif "Kurzschildwechselgarnitur" in name:
        openings = [
            f"Die <strong>{name}</strong> ist eine praktische <strong>Wechselgarnitur</strong> in schwarzem Kunststoff mit Stahlkern und Stahl-Schildeinlage. Die robuste Materialkombination sorgt für Langlebigkeit, während die Kunststoffoberfläche pflegeleicht und griffsympathisch ist.",
        ]
        bullets = [
            "Kurzschild-Ausführung – kompakt und modern",
            "Kunststoff schwarz mit <strong>Stahlkern</strong> und Stahl-Schildeinlage",
            "Wechselgarnitur: außen feststehender Knopf, innen Drücker",
            "Entfernung <strong>72 mm</strong> – passend für Standard-Einsteckschlösser",
            "Von <strong>KBV</strong> – praxisbewährte Türbeschläge",
        ]
        closing = "Geeignet für <strong>Mietobjekte</strong>, <strong>Wohngebäude</strong> und den <strong>Objektbereich</strong>."
        
    elif "effeff" in name and "Modellreihe 19" in name:
        # Already handled by effeff generator but let's catch edge cases
        return generate_effeff(product, index)
    
    else:
        # Truly generic fallback
        category = "Sicherheitstechnik"
        openings = [
            f"Das <strong>{name}</strong> von <strong>{mfr}</strong> ist ein hochwertiges Produkt aus dem Bereich <strong>{category}</strong>. Es bietet zuverlässige Qualität für den professionellen Einsatz.",
        ]
        bullets = [
            f"Markenqualität von <strong>{mfr}</strong>",
            "Professionelle Verarbeitung für den Dauereinsatz",
            "Geeignet für verschiedene Einbausituationen",
            "Zuverlässige Funktion im täglichen Betrieb",
            "Für Privat und Gewerbe einsetzbar",
        ]
        closing = f"Geeignet für <strong>Privathaushalte</strong>, <strong>Gewerbeobjekte</strong> und den <strong>Objektbereich</strong>."
    
    oi = h % len(openings)
    
    html = f"<p>{openings[oi]}</p>\n<ul>\n"
    for b in bullets:
        html += f"<li>{b}</li>\n"
    html += f"</ul>\n<p>{closing}</p>"
    return html


# ============================================================
# MAIN ROUTING LOGIC
# ============================================================

def generate_description(product, index):
    """Route to the appropriate generator based on product type."""
    name = product['name'].lower()
    mfr = product['manufacturer']
    
    if 'schliessanlage' in name or 'schließanlage' in name:
        return generate_schliesanlage(product, index)
    elif 'fenstergriff' in name:
        return generate_fenstergriff(product, index)
    elif 'schutz-drückergarnitur' in name.lower() or 'schutz-wechselgarnitur' in name.lower() or \
         'schutz-drücker' in product['name'] or 'schutz-wechsel' in product['name'] or \
         ('Schutz' in product['name'] and 'garnitur' in name):
        return generate_schutzgarnitur(product, index)
    elif 'rosettengarnitur' in name:
        return generate_rosette(product, index)
    elif 'zimmertürgarnitur' in name or 'zimmertuer' in name:
        return generate_zimmertuergarnitur(product, index)
    elif mfr == 'SimonsVoss':
        return generate_simonsvoss(product, index)
    elif mfr == 'effeff ASSA ABLOY' or 'effeff' in name:
        return generate_effeff(product, index)
    elif 'einsteckschloss' in name and (mfr == 'BMH' or 'BMH' in name):
        return generate_bmh_einsteckschloss(product, index)
    elif mfr == 'DOM' or ('DOM' in product['name'] and 'Schliessanlage' not in product['name']):
        return generate_dom_zylinder(product, index)
    elif mfr == 'Burg Wächter' and 'briefkasten' in name:
        return generate_burg_waechter_briefkasten(product, index)
    elif mfr == 'Salto':
        return generate_salto(product, index)
    elif mfr == 'AXA Bike Security':
        return generate_axa(product, index)
    elif 'schlosskasten' in name and '300301' in product.get('product_number', ''):
        return generate_bever_schlosskasten(product, index)
    elif 'schlosskasten' in name and 'kompl.' in name:
        return generate_bever_schlosskasten(product, index)
    elif 'universal-kastenschloss' in name:
        return generate_bever_kastenschloss(product, index)
    elif mfr == 'Master Lock':
        return generate_master_lock_zurrgurt(product, index)
    else:
        return generate_generic(product, index)


# ============================================================
# GENERATE ALL + VALIDATE
# ============================================================

results = []
issues = []

for i, product in enumerate(products):
    try:
        desc = generate_description(product, i)
        
        # Strip HTML for length check
        plain = re.sub(r'<[^>]+>', '', desc)
        plain_len = len(plain)
        
        if plain_len < 400:
            issues.append(f"[{i}] {product['id']} TOO_SHORT ({plain_len}): {product['name'][:60]}")
        elif plain_len > 1500:
            issues.append(f"[{i}] {product['id']} TOO_LONG ({plain_len}): {product['name'][:60]}")
        
        # Check required elements
        if '<p>' not in desc:
            issues.append(f"[{i}] {product['id']} NO_P_TAGS")
        if '<ul>' not in desc:
            issues.append(f"[{i}] {product['id']} NO_UL_TAGS")
        if '<strong>' not in desc:
            issues.append(f"[{i}] {product['id']} NO_STRONG_TAGS")
        
        results.append({
            "product_id": product['id'],
            "description": desc
        })
    except Exception as e:
        issues.append(f"[{i}] {product['id']} ERROR: {str(e)}: {product['name'][:60]}")
        results.append({
            "product_id": product['id'],
            "description": f"<p>Fehler bei der Generierung: {str(e)}</p>"
        })

# Write output
with open('projects/mein-schluessel/rewrites-batch-1.json', 'w') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

# Report
print(f"Total processed: {len(results)}")
print(f"Issues: {len(issues)}")
for issue in issues:
    print(f"  {issue}")

# Check for duplicates
desc_hashes = {}
dupes = 0
for r in results:
    h = hashlib.md5(r['description'].encode()).hexdigest()
    if h in desc_hashes:
        dupes += 1
        print(f"  DUPLICATE: {r['product_id']} == {desc_hashes[h]}")
    desc_hashes[h] = r['product_id']

print(f"\nDuplicate descriptions: {dupes}")

# Length stats
lengths = []
for r in results:
    plain = re.sub(r'<[^>]+>', '', r['description'])
    lengths.append(len(plain))
print(f"Length range: {min(lengths)}-{max(lengths)}")
print(f"Length avg: {sum(lengths)/len(lengths):.0f}")
print(f"Under 400: {sum(1 for l in lengths if l < 400)}")
print(f"Over 1500: {sum(1 for l in lengths if l > 1500)}")
