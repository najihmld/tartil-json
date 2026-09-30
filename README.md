# tartil-json

Quran translations in JSON format, sourced from [Tanzil.net](https://tanzil.net), structured for use in Quran apps.

## Structure

```
translations/
├── manifest.json          # Language index
├── id/                    # Indonesian (Bahasa Indonesia)
│   ├── 1.json             # Al-Fatihah
│   ├── 2.json             # Al-Baqarah
│   └── ...                # 114 files total
├── en/                    # English
└── ...                    # 40 languages total
```

Each surah file is an array of ayah objects:

```json
[
  { "aya_number": 1, "text": "In the name of Allah..." },
  { "aya_number": 2, "text": "All praise is due to Allah..." }
]
```

`manifest.json` lists all available languages with their codes and native names.

## Languages (40)

| Code | Language | Native | Translator |
|------|----------|--------|------------|
| `am` | Amharic | አማርኛ | Muhammed Sadiq & Muhammed Sani Habib |
| `ar` | Arabic | العربية | Tafsir al-Muyassar |
| `az` | Azerbaijani | Azərbaycan | Mammadaliyev & Bunyadov |
| `ber` | Amazigh | ⵜⴰⵎⴰⵣⵉⵖⵜ | Ramdane At Mansour |
| `bg` | Bulgarian | Български | Tzvetan Theophanov |
| `bn` | Bengali | বাংলা | Muhiuddin Khan |
| `bs` | Bosnian | Bosanski | Besim Korkut |
| `cs` | Czech | Čeština | I. Hrbek |
| `de` | German | Deutsch | Bubenheim & Elyas |
| `dv` | Divehi | ދިވެހި | Office of the President of Maldives |
| `en` | English | English | Saheeh International |
| `es` | Spanish | Español | Julio Cortes |
| `fa` | Persian | فارسی | Naser Makarem Shirazi |
| `fr` | French | Français | Muhammad Hamidullah |
| `hi` | Hindi | हिन्दी | Farooq Khan & Ahmed |
| `id` | Indonesian | Bahasa Indonesia | Kementerian Agama RI |
| `it` | Italian | Italiano | Hamza Roberto Piccardo |
| `ja` | Japanese | 日本語 | — |
| `ko` | Korean | 한국어 | — |
| `ku` | Kurdish | Kurdî | Burhan Muhammad-Amin |
| `ml` | Malayalam | മലയാളം | Abdul Hameed & Parappoor |
| `ms` | Malay | Bahasa Melayu | Abdullah Muhammad Basmeih |
| `nl` | Dutch | Nederlands | Fred Leemhuis |
| `no` | Norwegian | Norsk | Einar Berg |
| `pl` | Polish | Polski | Józefa Bielawskiego |
| `ps` | Pashto | پښتو | Abdulwali Khan |
| `pt` | Portuguese | Português | Samir El-Hayek |
| `ru` | Russian | Русский | Elmir Kuliev |
| `sd` | Sindhi | سنڌي | Taj Mehmood Amroti |
| `so` | Somali | Soomaali | Mahmud Muhammad Abduh |
| `sq` | Albanian | Shqip | Hasan Efendi Nahi |
| `sv` | Swedish | Svenska | Knut Bernström |
| `sw` | Swahili | Kiswahili | Ali Muhsin Al-Barwani |
| `tg` | Tajik | Тоҷикӣ | AbdolMohammad Ayati |
| `th` | Thai | ภาษาไทย | King Fahad Quran Complex |
| `tr` | Turkish | Türkçe | Diyanet İşleri |
| `tt` | Tatar | Татар | Yakub Ibn Nugman |
| `ur` | Urdu | اردو | Abul A'ala Maududi |
| `uz` | Uzbek | O'zbek | Muhammad Sodik Muhammad Yusuf |
| `zh` | Chinese | 中文 | Ma Jian |

## Usage

```js
// Load a surah
const surah = await fetch('./translations/id/1.json').then(r => r.json());

// Load the language manifest
const manifest = await fetch('./translations/manifest.json').then(r => r.json());
```

## Regenerating

Requires Node.js 18+.

```bash
# Fetch all 40 translations
node transform.mjs

# Fetch specific translations
node transform.mjs en.sahih fr.hamidullah
```

## License

### Translation Data

All translation texts are sourced from [Tanzil.net](https://tanzil.net). Each translation is the intellectual property of its respective author or institution. Tanzil distributes these translations for non-commercial use with the requirement to include a link back to [tanzil.net/trans/](https://tanzil.net/trans/).

**You must comply with Tanzil's terms of use when using this data:**
> Tanzil Quran Text is distributed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/). Individual translations may have stricter terms — refer to each translator's rights.

### This Repository

The JSON structure, `transform.mjs` script, and `manifest.json` in this repository are released under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Attribution

Translation data sourced from [Tanzil.net](https://tanzil.net/trans/) — a project providing authentic Quran text and translations.
