# ReRead – Book Trading Platform

ReRead är en webbapplikation där användare kan skapa profiler, lägga upp böcker och byta dem med andra användare. Plattformen fungerar som ett peer-to-peer-bytesbibliotek: istället för att köpa eller sälja böcker kan användare erbjuda sina egna titlar i utbyte mot något de vill läsa.

Core-funktionalitet bygger på REST API, medan realtidsfunktioner som Socket.IO är stretch goals.

---

## 🚀 Funktioner
- Skapa konto & logga in  
- Lägga till, redigera och radera egna böcker  
- Bläddra bland andras böcker (filter, sök, detaljer)  
- Skicka & hantera bytesförfrågningar  
- Matchning & avslutade trades  
- *(Stretch goal)* Realtidsnotiser & chatt via Socket.IO  

---

## 🛠 Tech stack

**Frontend:** React (TypeScript), Vite, Sass/Tailwind, Axios  
**Backend:** Node.js, Express, TypeScript, JWT, bcrypt  
**Database:** MongoDB  
**Övrigt:** Prettier, Postman, Figma

---

# 🌿 Branch Rules (Solo-projekt)

Eftersom projektet har en enda utvecklare används en minimalistisk struktur som håller historiken ren och enhetlig, utan onödigt PR-flöde.

## Main Branch
- `main` ska alltid vara **deploybar**.  
- Endast merge från funktionsbrancher (eller `dev`).

## Branch-struktur
- `main` – stabil, produktionsredo kod  
- `dev` – aktiv utvecklingsgren  
- Funktionsbrancher enligt mönster:  
  - `feature/<kort-namn>`  
  - `fix/<kort-namn>`  
  - `refactor/<kort-namn>`
  - `exp/<kort-namn>` (specifikt för stretch goals och experimentella branches)

**Exempel:**  
- `feature/book-crud` 
- `fix/login-token-expiry`

## Commit-regler
- Små, tydliga commits med beskrivande meddelanden.  
- Format:
  - `"feat: add book creation endpoint"`
  - `"fix: correct trade request validation"`
---
