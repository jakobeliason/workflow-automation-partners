/**
 * Qualifier form → Google Sheet webhook
 * -------------------------------------
 * HOW TO USE
 * 1. Create a new Google Sheet. Name it "Qualifier Submissions" (or anything).
 * 2. Extensions → Apps Script. Delete the default Code.gs contents, paste this file.
 * 3. Hit Deploy → New deployment.
 *      - Select type: Web app
 *      - Description: qualifier webhook
 *      - Execute as: Me (your account)
 *      - Who has access: Anyone
 *    Click Deploy. Authorize when prompted.
 * 4. Copy the "Web app URL" Google gives you.
 * 5. Open index.html, find the line:   var SHEET_WEBHOOK_URL = "";
 *    Paste the URL between the quotes. Save.
 * 6. Redeploy the site. Submissions from the form now land in the sheet.
 *
 * If you ever change the form fields, update HEADERS below and the row-building
 * logic in doPost accordingly.
 */

var HEADERS = [
  'Timestamp',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Company',
  'Annual Revenue',
  'Industry',
  'Team Size',
  'Pain Point',
  'Timeline',
  'Referrer',
  'User Agent'
];

function doPost(e) {
  try {
    // Body arrives as text (we set Content-Type: text/plain in the fetch to avoid
    // a CORS preflight that Apps Script doesn't handle cleanly).
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Write headers if the sheet is empty.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.first_name || '',
      data.last_name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.revenue || '',
      data.industry || '',
      data.team_size || '',
      data.pain || '',
      data.timeline || '',
      data.referrer || '',
      data.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Simple health-check endpoint (visit the web-app URL in a browser to confirm it's live).
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'Qualifier webhook is up.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
