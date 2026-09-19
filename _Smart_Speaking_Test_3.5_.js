function doPost(e){
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let s = ss.getSheetByName('Summary');
  if(!s){ s = ss.insertSheet('Summary');
    s.appendRow(['วันเวลา','Name','ชั้น','เลขที่','คะแนน','เต็ม','ร้อยละ','ผล']); }
  s.appendRow([d.date, d.name, d.cls, d.no, d.score, 30, d.pct, d.pass?'ผ่าน':'ไม่ผ่าน']);

  let t = ss.getSheetByName('Detail');
  if(!t){ t = ss.insertSheet('Detail');
    t.appendRow(['วันเวลา','Name','ชั้น','เลขที่','ข้อ','หมวด','คำถาม','คำตอบนักเรียน','คะแนน','วิธีตอบ','วินาที']); }
  (d.detail||[]).forEach(function(l){
    t.appendRow([d.date, d.name, d.cls, d.no, l.no, l.cat, l.q, l.ans, l.pt, l.mode, l.used]);
  });

  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}