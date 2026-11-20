# Fryda AS – sjokoladedesigner med lagrede smakskombinasjoner

Smaksprofessoren er en **regelbasert chat, ikke KI**. Den finner blant 14 lagrede
kombinasjoner ut fra smak, sjokoladetype og ingredienser kunden skriver om.
Ingen API-nøkkel, Ollama, modellnedlasting eller KI-tjeneste trengs.

## Åpne siden

Åpne `index.html` direkte, eller bruk en vanlig statisk forhåndsvisning. Chatten
kjører i nettleseren uten nettverksforespørsler. Google Fonts er valgfri pynt;
systemskrifter brukes hvis fontene ikke kan lastes.

Du kan også bruke den medfølgende serveren med Node.js 22 eller nyere:

```powershell
npm start
```

Åpne `http://127.0.0.1:3000`. Ingen npm-pakker eller `.env` kreves. Gammel
KI-konfigurasjon leses ikke, og serveren har ingen KI-endepunkter.

## Bruk og innhold

- Skriv for eksempel «søtt og salt», «mørk og fruktig», «rosa» eller «uten lakris».
- «Et annet forslag» finner en annen lagret kombinasjon og beholder tidligere ønsker.
- Hurtigvalgene bruker den samme lokale oppslagsfunksjonen.
- «Prøv denne kombinasjonen» legger sjokolade og toppinger direkte på platen.
- Ukjente meldinger gir en tydelig forklaring om hvilke ønsker chatten kan finne.
- Enter sender; Escape lukker chatten og flytter fokus tilbake til åpningsknappen.

`catalog.js` inneholder produktene med stabile ID-er. `flavor-combinations.js`
inneholder de ferdige kombinasjonene og forklaringene. Legg nye kombinasjoner i
den filen med unik ID, én sjokolade-ID og 2–4 ulike topping-ID-er fra katalogen.
`taste-chat.js` finner passende kombinasjoner. `professor.js` håndterer chatten.

Historikk og enkle preferanser lagres i `sessionStorage` i denne nettleserfanen,
med opptil 60 meldinger. De sendes ikke til serveren. «Ny samtale» nullstiller
chatten, men beholder allergenfilteret. Hvis lagring er blokkert, virker chatten
fortsatt, men historikken beholdes bare mens siden er åpen.

## Allergener

Produktopplysningene er fortsatt **ikke verifisert**. Ingen allergener gjettes
ut fra produktnavn, og Matinfo er ikke tilkoblet. Aktive allergenfiltre og oppgitt
allergibehov stopper forslag med ukjente opplysninger, inkludert tidligere kort.
Fryda AS må avklare ingredienser og krysskontakt før bestilling. Chatten gir ingen
garanti om trygghet ved alvorlig allergi. Ordgjenkjenningen erstatter ikke en
allergenvurdering; kunden bør bruke det synlige allergenfilteret.

## Test

```powershell
npm test
```

Testene dekker de lagrede kombinasjonene, preferanser, videre samtale, allergener,
helt lokal chat → forslagskort → oppdatert plate, historikk, tastaturhendelser,
serverens filbeskyttelse og eksisterende relieff. Frontendtestene bruker en enkel
DOM-harness og er ikke visuelle nettlesertester. Ingen ekte KI-testing er aktuell.

Bestilling, betaling og produksjonsklar støpeform er fortsatt ikke koblet til.
