/** ==========================================
 * ANNADATA CONNECT - CENTRALIZED GAS BACKEND (V2)
 * ==========================================
 * Includes: Setup, Table Management, and Auth (Login/Signup)
 * 1. Run 'setupDatabase()' once to create all tables (including Users).
 * 2. Deploy as "Web App" -> Manage Deployment -> New.
 * 3. Access: "Anyone".
 */

const TABLES = {
  USERS: 'Users',
  DONORS: 'Donors',
  NGOS: 'NGOs',
  FEED: 'FoodFeed',
  DELIVERIES: 'Deliveries',
  VOLUNTEERS: 'Volunteers'
};

const HEADERS = {
  [TABLES.USERS]: ['id', 'email', 'password', 'role', 'name', 'area'],
  [TABLES.DONORS]: ['id', 'name', 'type', 'area', 'rating'],
  [TABLES.NGOS]: ['id', 'name', 'capacity', 'area', 'activeVolunteers'],
  [TABLES.FEED]: ['id', 'donorId', 'donorName', 'type', 'qty', 'dist', 'status', 'createdAt'],
  [TABLES.DELIVERIES]: ['id', 'taskId', 'volunteerName', 'task', 'dest', 'status'],
  [TABLES.VOLUNTEERS]: ['id', 'name', 'points', 'rating', 'status']
};

/** SETUP: CREATE ALL SHEETS AND HEADERS */
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    } else {
      sheet.clear();
    }
    sheet.appendRow(HEADERS[sheetName]);
    sheet.getRange(1, 1, 1, HEADERS[sheetName].length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  });
  Logger.log("Database Setup Complete.");
}

/** API HANDLERS (GET/POST) */
function doGet(e) { return handleRequest(e); }
function doPost(e) { return handleRequest(e); }

function handleRequest(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const params = e.parameter;
  const action = params.action;
  
  if (!action) return jsonResponse({ error: "Missing action" });

  try {
    // 1. AUTH ACTIONS (Role-based access)
    if (action === 'signup') {
      const user = JSON.parse(e.postData.contents);
      return insertRow(ss, TABLES.USERS, user);
    }
    
    if (action === 'login') {
      const loginInfo = JSON.parse(e.postData.contents);
      return checkLogin(ss, loginInfo.email, loginInfo.password);
    }

    // 2. DATA READ Actions
    switch (action) {
      case 'get_feed': return fetchTable(ss, TABLES.FEED);
      case 'get_donors': return fetchTable(ss, TABLES.DONORS);
      case 'get_ngos': return fetchTable(ss, TABLES.NGOS);
      case 'get_deliveries': return fetchTable(ss, TABLES.DELIVERIES);
      case 'get_volunteers': return fetchTable(ss, TABLES.VOLUNTEERS);
      
      // 3. DATA WRITE Actions
      case 'add_surplus': 
        return insertRow(ss, TABLES.FEED, JSON.parse(e.postData.contents));
      case 'accept_surplus':
        const update = JSON.parse(e.postData.contents);
        return updateRowStatus(ss, TABLES.FEED, update.id, update.status);
      case 'complete_task':
        return deleteRow(ss, TABLES.DELIVERIES, params.id);
      
      default:
        return jsonResponse({ error: "Action not recognized" });
    }
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

/** AUTH HELPER: CHECK LOGIN */
function checkLogin(ss, email, password) {
  const sheet = ss.getSheetByName(TABLES.USERS);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[1] === email && row[2] === password) {
      let userObj = {};
      headers.forEach((h, idx) => userObj[h] = row[idx]);
      delete userObj.password; // Security: remove password
      return jsonResponse({ success: true, user: userObj });
    }
  }
  return jsonResponse({ success: false, error: "Invalid credentials" });
}

/** DB HELPER: INSERT NEW ROW */
function insertRow(ss, sheetName, item) {
  const sheet = ss.getSheetByName(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = headers.map(h => item[h] !== undefined ? item[h] : "");
  sheet.appendRow(newRow);
  return jsonResponse({ success: true, item: item });
}

/** DB HELPER: FETCH ALL ROWS */
function fetchTable(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return jsonResponse([]);
  const headers = data[0];
  const result = data.slice(1).map(row => {
    let obj = {}; headers.forEach((h, i) => obj[h] = row[i]); return obj;
  });
  return jsonResponse(result);
}

/** DB HELPER: UPDATE STATUS */
function updateRowStatus(ss, sheetName, id, status) {
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.getRange(i + 1, data[0].indexOf('status') + 1).setValue(status);
      return jsonResponse({ success: true });
    }
  }
  return jsonResponse({ success: false });
}

/** DB HELPER: DELETE RECORD */
function deleteRow(ss, sheetName, id) {
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1);
      return jsonResponse({ success: true });
    }
  }
  return jsonResponse({ success: false });
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
