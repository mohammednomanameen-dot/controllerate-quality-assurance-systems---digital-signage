# Controllerate of Quality Assurance Systems — DIGITAL SIGNAGE SYSTEM
**गुणवत्ता से विश्वास • Secunderabad**

A production-grade, 100% offline-first corporate digital signage, welcome display, and employee recognition presentation system built for large Smart TVs (1080p Full HD & 4K Ultra HD) installed at the entrance of **Controllerate of Quality Assurance Systems, Secunderabad**.

---

## 1. HOW TO RUN THE APPLICATION OFFLINE

This application has **zero online dependencies**. It does not use remote CDNs, Google Fonts, YouTube/Vimeo, Firebase, or external APIs. All styling, vector assets, fonts, and engines are bundled locally.

### Standard Offline Execution:
1. Copy the entire application folder to the display PC connected to the Smart TV.
2. Build the static distribution using:
   ```bash
   npm run build
   ```
   or run the local web server:
   ```bash
   npm run preview
   ```
3. Open the browser (Google Chrome, Microsoft Edge, or Firefox) and navigate to `http://localhost:3000` (or open the built `dist/index.html`).
4. Press **`F11`** or **`F`** to engage borderless fullscreen mode.
5. The presentation immediately begins looping automatically. No receptionist or employee mouse interaction is needed.

---

## 2. FOLDER STRUCTURE

```text
controllerate-display/
│
├── index.html                   # HTML entry point (SEO, offline viewport metadata)
├── metadata.json                # Application metadata
├── package.json                 # Offline dependencies (React, Lucide, Tailwind, XLSX)
├── README.md                    # Operational manual
│
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Main digital signage orchestrator & fullscreen canvas
│   ├── index.css                # Offline styling, Devanagari Hindi typography, animations
│   │
│   ├── types/
│   │   └── index.ts             # Strict TypeScript definitions for all datasets
│   │
│   ├── data/
│   │   ├── config.json          # Central configuration (Org, Controller, Timings, Features)
│   │   ├── employees.json       # Employee roster database
│   │   ├── relations.json       # Family & indirect relations database
│   │   ├── festivals.json       # Annual festival dates and greetings
│   │   └── quotes.json          # Curated quotes classified by celebration type
│   │
│   ├── engine/
│   │   ├── date-engine.ts       # Local date parsing, milestone math & test-date resolver
│   │   ├── event-engine.ts      # Today's event detector, multi-birthday grouping & priority sorter
│   │   ├── slideshow-engine.ts  # Slideshow queue timer, auto-advance, and loop hooks
│   │   ├── template-engine.ts   # Placeholder interpolation engine ({{name}}, {{quote}}, etc.)
│   │   ├── excel-engine.ts      # 100% offline Excel (.xlsx) parser & sample generator
│   │   └── data-loader.ts       # Persistent local storage & data synchronization
│   │
│   ├── templates/
│   │   ├── WelcomeSlide.tsx     # SCREEN 1: Combined Org Introduction + Welcome (Single Slide)
│   │   ├── VideoSlide.tsx       # SCREEN 2: Introductory Video with generative fallback
│   │   ├── BirthdaySlide.tsx    # Employee Birthday (Single & Multi-Colleague Grouping)
│   │   ├── WorkAnniversarySlide.tsx # Milestone Work Anniversary & Calculated Years
│   │   ├── JoiningAnniversarySlide.tsx # Commemoration of Joining CQAS
│   │   ├── PromotionSlide.tsx   # Congratulations on Promotion (Old -> New role)
│   │   ├── RetirementSlide.tsx  # Dignified Superannuation Valedictory Honour
│   │   ├── WeddingAnniversarySlide.tsx # Elegant Wedding Anniversary
│   │   ├── FamilyEventSlide.tsx # Family Member Celebrations (Spouse, Child, Parent)
│   │   └── FestivalSlide.tsx    # Festival Greetings with Hindi blessings & organization signature
│   │
│   ├── assets/
│   │   ├── assetLibrary.ts      # Vector emblems, insignia, and avatars
│   │   ├── logo/                # Directory for official PNG/SVG crest
│   │   ├── controller/          # Directory for Controller photograph
│   │   ├── video/               # Directory for organization-intro.mp4
│   │   ├── employees/           # Directory for employee photos
│   │   └── relations/           # Directory for family photos
│   │
│   └── components/
│       └── AdminModal.tsx       # Offline Admin Console (Ctrl+Shift+A, PIN: 1234)
```

---

## 3. ORGANIZATION INFORMATION

To modify the organization name, Hindi slogan, location, or ministry:
Open `src/data/config.json`:
```json
"organization": {
  "name": "Controllerate of Quality Assurance Systems",
  "slogan": "गुणवत्ता से विश्वास",
  "location": "Secunderabad",
  "logo": "assets/logo/cqas-emblem.svg",
  "subTitle": "Department of Defence Production & Quality Assurance",
  "ministry": "Ministry of Defence, Government of India"
}
```
*Note: The slogan `"गुणवत्ता से विश्वास"` is configured to automatically render with system Devanagari fonts (`Nirmala UI`, `Mangal`, `Noto Sans Devanagari`).*

---

## 4. CONTROLLER DETAILS & PHOTOGRAPH

To change the Controller's details or photograph:
1. Put the Controller's high-resolution JPG/PNG photograph in:
   ```text
   assets/controller/controller.jpg
   ```
2. Update `src/data/config.json`:
   ```json
   "controller": {
     "name": "Dr. Rajiv Sharma",
     "designation": "Controller",
     "photo": "assets/controller/controller.jpg",
     "message": "Committed to unwavering quality standards, precision engineering, and national security."
   }
   ```
   *(Or modify it in the live Admin Console via `Ctrl + Shift + A`).*

---

## 5. WHERE TO REPLACE THE LOGO

Place your official organization emblem in:
```text
assets/logo/logo.png (or svg)
```
Update `"logo": "assets/logo/logo.png"` in `src/data/config.json`.
The application comes pre-bundled with a crisp vector emblem of **Controllerate of Quality Assurance Systems - Secunderabad** with Ashoka precision gear and gold filigree.

---

## 6. WHERE TO PUT THE INTRODUCTORY VIDEO (SCREEN 2)

Place the introductory corporate video in:
```text
assets/video/organization-intro.mp4
```
### Video Behavior:
* Automatically plays on Screen 2 with `muted autoplay` and `playsinline`.
* Maintains exact 16:9 aspect ratio without stretching.
* When the video finishes, the presentation automatically moves to today's events.
* **Fallback Guarantee**: If the MP4 file is not yet placed, the system displays a generative corporate radar scanline graphic with quality metrics and automatically advances after the fallback duration (default 12 seconds). It will never crash or show an empty broken video error.

---

## 7. HOW TO ADD EMPLOYEES

Employee records are stored in `src/data/employees.json`.
Example structure:
```json
{
  "employeeId": "EMP001",
  "employeeCode": "CQAS/QA/042",
  "name": "Anita Sharma",
  "designation": "Senior Quality Officer",
  "department": "Quality Assurance",
  "section": "Electronic Systems & Avionics",
  "photo": "assets/employees/anita-sharma.jpg",
  "dateOfBirth": "1988-10-03",
  "dateOfJoining": "2014-04-15",
  "retirementDate": null,
  "weddingDate": "2012-10-03",
  "promotionDate": null,
  "status": "active"
}
```

### Event Logic:
* **Birthdays**: Evaluated using month and day (`MM-DD`) from `dateOfBirth`.
* **Work Anniversary / Joining Anniversary**: Evaluated using month and day from `dateOfJoining`. Completed years are calculated automatically: `currentYear - joiningYear`.
* **Promotions**: Evaluated using exact date (`YYYY-MM-DD`) in `promotionDate`.
* **Retirements**: Evaluated using exact date (`YYYY-MM-DD`) in `retirementDate`.
* **Wedding Anniversaries**: Evaluated using month and day from `weddingDate`.

---

## 8. WHERE FAMILY / INDIRECT RELATION DATA IS STORED

Family members are stored in `src/data/relations.json`.
Example structure:
```json
{
  "relationId": "REL001",
  "employeeId": "EMP001",
  "employeeName": "Anita Sharma",
  "personName": "Rahul Sharma",
  "relation": "Spouse",
  "eventType": "birthday",
  "eventDate": "10-03",
  "photo": "assets/relations/rahul-sharma.jpg"
}
```

### Identification Rule:
Family events are presented with clear, unambiguous relationship callouts:
> **"Warm Birthday Wishes — Rahul Sharma, Spouse of Anita Sharma"**  
> *(Never presented as an employee of the organization)*.

Supported relations: `Spouse`, `Son`, `Daughter`, `Father`, `Mother`, `Other`.

---

## 9. WHERE FESTIVAL DATA IS STORED

Festivals are stored in `src/data/festivals.json`.
Example structure:
```json
{
  "festivalId": "FEST001",
  "name": "Vijayadashami / Dussehra",
  "date": "10-03",
  "greeting": "Warm greetings on the auspicious occasion of Vijayadashami. May truth, dedication, and excellence triumph in all our missions.",
  "subtext": "विजयादशमी की हार्दिक शुभकामनाएं",
  "image": "assets/festivals/dussehra.svg"
}
```
If today's date matches `date` (`MM-DD` or `YYYY-MM-DD`), the dedicated festival greeting screen is automatically queued.

---

## 10. WHERE QUOTES ARE STORED

Quotes are stored in `src/data/quotes.json` under categories:
* `birthday`
* `workAnniversary`
* `joiningAnniversary`
* `promotion`
* `retirement`
* `weddingAnniversary`
* `familyBirthday`

The Event Engine randomly picks a suitable quote for each event slide.

---

## 11. HOW TO REPLACE AN EVENT TEMPLATE

Every visual template is an independent modular component in `src/templates/`:
* `WelcomeSlide.tsx`
* `VideoSlide.tsx`
* `BirthdaySlide.tsx`
* `WorkAnniversarySlide.tsx`
* `JoiningAnniversarySlide.tsx`
* `PromotionSlide.tsx`
* `RetirementSlide.tsx`
* `WeddingAnniversarySlide.tsx`
* `FamilyEventSlide.tsx`
* `FestivalSlide.tsx`

You can customize the HTML and Tailwind CSS in any template file without altering event detection or date math.  
Additionally, `src/engine/template-engine.ts` provides placeholder strings (`{{name}}`, `{{designation}}`, `{{quote}}`, `{{years}}`) for raw HTML implementations.

---

## 12. HOW TO ENABLE / DISABLE FAMILY EVENTS & PHOTOS

In `src/data/config.json` (or via the Admin Console):
```json
"features": {
  "employeeEvents": true,
  "familyEvents": true,
  "familyPhotos": true,
  "festivalGreetings": true,
  "video": true,
  "quotes": true
}
```
* Set `"familyEvents": false` to exclude all family slides from the queue.
* Set `"familyPhotos": false` to hide photos and display the dignified family crest placeholder instead.

---

## 13. HOW TO TEST A SPECIFIC DATE (TEST DATE SYSTEM)

In `src/data/config.json`:
```json
"testing": {
  "testDate": "2026-10-03"
}
```
* **Test Mode**: When `testDate` is set (e.g. `"2026-10-03"`), the system simulates that date immediately.
* **Live Mode**: Set `"testDate": null` (or blank in Admin Console) to run on the computer's real-time local date.
* In the UI, press **`Ctrl + Shift + A`** (PIN: `1234`) and use the date picker to test any past or future date on the fly.

---

## 14. EXCEL IMPORT ARCHITECTURE

The application includes an offline Excel parser built with `xlsx` (SheetJS).

### Supported Worksheets:
1. **Employees** Sheet:
   * `Employee ID`
   * `Employee Code`
   * `Employee Name`
   * `Designation`
   * `Department`
   * `Section`
   * `Date of Birth` (`YYYY-MM-DD` or date cell)
   * `Date of Joining`
   * `Promotion Date`
   * `Previous Designation`
   * `New Designation`
   * `Retirement Date`
   * `Wedding Anniversary`
   * `Photo File`
   * `Status` (`active` / `retired`)

2. **FamilyRelations** Sheet:
   * `Employee ID`
   * `Relation Name`
   * `Relation Type` (`Spouse` / `Son` / `Daughter` / `Father` / `Mother`)
   * `Date of Birth`
   * `Wedding Anniversary`
   * `Photo File`

### How to Import:
1. Press **`Ctrl + Shift + A`** on the display computer.
2. Enter PIN: `1234`.
3. Go to the **Excel Import / Export** tab.
4. Click **"Download Excel Sample Template"** to receive the pre-formatted `.xlsx` file.
5. Populate the spreadsheet with real employee data.
6. Click **"Upload Excel Spreadsheet (.xlsx)"**. The app parses the file in-browser and updates the live roster.

---

## 15. SMART TV DEPLOYMENT & WINDOWS AUTO-STARTUP

### Deployment Setup:
1. Connect the display computer (Mini PC / Intel NUC / Raspberry Pi) to the Smart TV via HDMI.
2. Set TV resolution to **1920 × 1080 (16:9)** or **3840 × 2160 (4K)**.
3. In browser settings, enable kiosk mode:
   ```bash
   chrome.exe --kiosk --disable-features=TranslateUI --noerrdialogs http://localhost:3000
   ```

### Optional Windows Auto-Startup:
1. Press `Win + R`, type `shell:startup`, and press Enter.
2. Create a shortcut in that folder with target:
   ```cmd
   "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk "http://localhost:3000"
   ```
3. When the display PC is turned on in the morning, the digital signage launches automatically in fullscreen without mouse or keyboard intervention.

---

## 16. CONTROLS SUMMARY

| Action | Shortcut / Trigger |
| :--- | :--- |
| **Open Admin Console** | `Ctrl + Shift + A` (PIN: `1234`) |
| **Pause / Resume Presentation** | `Spacebar` |
| **Next Slide** | `ArrowRight` or `PageDown` |
| **Previous Slide** | `ArrowLeft` or `PageUp` |
| **Toggle Fullscreen** | `F` or `F11` |
| **Mouse / Touch Hotspot** | Hover over bottom-right corner for navigation controls |

---

*Controllerate of Quality Assurance Systems • Secunderabad • गुणवत्ता से विश्वास*
