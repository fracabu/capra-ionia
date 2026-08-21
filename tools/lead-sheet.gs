/**
 * Endpoint per i lead di Capra Ionia.
 *
 * Da incollare in un Google Sheet: Estensioni → Apps Script, sostituendo
 * tutto il contenuto del file. Poi Distribuisci → Nuova distribuzione →
 * Applicazione web, con "Esegui come: me" e "Chi ha accesso: chiunque".
 * L'URL che ottieni (termina con /exec) va in FORM_ENDPOINT in src/App.tsx.
 *
 * NOTIFY resta vuoto qui perché questo file sta in un repository pubblico:
 * scrivi il tuo indirizzo solo nella copia dentro Apps Script, che è privata.
 */
const SHEET_NAME = "Lead";
const NOTIFY = "";

function doPost(e) {
  try {
    // Il sito invia come testo semplice: mandarlo come JSON farebbe partire
    // una richiesta di preflight che Apps Script non sa gestire.
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data", "Nome", "Email", "Tipo", "Riferimento", "Origine"]);
      sheet.setFrozenRows(1);
    }

    // context arriva come "guida:afm" o "terreno:Chavriata-3": spezzarlo in
    // due colonne rende il foglio filtrabile senza lavoro manuale.
    const context = String(data.context || "");
    const sep = context.indexOf(":");
    const tipo = sep === -1 ? context : context.slice(0, sep);
    const riferimento = sep === -1 ? "" : context.slice(sep + 1);

    sheet.appendRow([
      new Date(),
      String(data.name || ""),
      String(data.email || ""),
      tipo,
      riferimento,
      context,
    ]);

    if (NOTIFY) {
      MailApp.sendEmail(
        NOTIFY,
        "Nuovo lead Capra Ionia · " + (tipo || "sconosciuto"),
        "Nome:  " + data.name +
        "\nEmail: " + data.email +
        "\nTipo:  " + tipo +
        "\nRif.:  " + riferimento
      );
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
