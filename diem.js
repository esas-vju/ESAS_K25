// =====================================================================
// Bảng điểm: đọc tệp "Bảng điểm theo lớp" xuất từ hệ thống đào tạo (.xls dạng HTML),
// quy đổi điểm và tính điểm trung bình (GPA). Dùng chung cho index.html và nhap-diem.html.
//
// Quy tắc (đã đối chiếu với cột "Điểm TBC" và "TBC TL" của bảng điểm ESAS2024):
// - Điểm hệ 10 → điểm chữ → hệ 4: A+ ≥9.0 (4.0) · A ≥8.5 (3.7) · B+ ≥8.0 (3.5) · B ≥7.0 (3.0)
//   · C+ ≥6.5 (2.5) · C ≥5.5 (2.0) · D+ ≥5.0 (1.5) · D ≥4.0 (1.0) · F <4.0 (0).
// - GPA học kỳ: trung bình theo tín chỉ của mọi học phần có điểm trong học kỳ, kể cả điểm F.
// - GPA tích lũy: mỗi học phần lấy lần có điểm cao nhất, chỉ tính học phần đã đạt (≥4.0).
// - Không tính vào GPA và tín chỉ tích lũy: học phần điều kiện (Giáo dục thể chất, Giáo dục
//   quốc phòng – an ninh, Kỹ năng bổ trợ [VJU-BT]).
// =====================================================================

// Mã trên hệ thống đào tạo → mã trong khung chương trình (ESAS5) khi hai mã khác nhau.
export const ALIAS={
  SAS2030:"SAS2001", // Sinh lý thực vật
  SAS2031:"SAS2004", // Cơ sở hóa học phân tích
  SAS2032:"SAS2005", // Cơ sở vi sinh vật học
  SAS2033:"SAS2006", // Thống kê sinh học
  SAS2034:"SAS2009"  // Khí tượng nông nghiệp
};
// Mã khung tương ứng (id dùng trong index.html). SAS3048 bị trùng mã trong khung: tên có
// "thương mại điện tử" thì là học phần V.2.3.
export function frameId(code,name){
  if(code==="SAS3048"&&/thương mại điện tử/i.test(name||""))return "SAS3048-TMDT";
  return ALIAS[code]||code;
}
// Học phần điều kiện: không tính GPA, không tính tín chỉ tích lũy.
export function isCond(code,name){
  return /^(PES|CME)\d/.test(code)||code==="VJU1007"||/\[VJU-BT\]|thể chất|quốc phòng/i.test(name||"");
}

const SCALE=[[9,"A+",4],[8.5,"A",3.7],[8,"B+",3.5],[7,"B",3],[6.5,"C+",2.5],[5.5,"C",2],[5,"D+",1.5],[4,"D",1]];
export function letter(x){
  for(const [lo,ch,p] of SCALE)if(x>=lo-1e-9)return {ch,p};
  return {ch:"F",p:0};
}
export const PASS=4;
const r2=x=>Math.round(x*100+1e-9)/100;
export const fmt=x=>x==null?"—":x.toFixed(2);

// Xếp loại học lực theo GPA tích lũy (thang 4).
export function rank(g){
  if(g==null)return "";
  return g>=3.6?"Xuất sắc":g>=3.2?"Giỏi":g>=2.5?"Khá":g>=2?"Trung bình":g>=1?"Yếu":"Kém";
}

// ---------- đọc tệp ----------
const clean=s=>String(s||"").replace(/\u00a0/g," ").replace(/\s+/g," ").trim();
const num=s=>{s=clean(s).replace(",",".");return /^\d+(\.\d+)?$/.test(s)?parseFloat(s):null;};

// Trả về {lop, khoa, nam, ky, key, courses, students, warn}. Ném lỗi nếu không đúng định dạng.
export function parseExport(text){
  const doc=new DOMParser().parseFromString(text,"text/html");
  const all=clean(doc.body?doc.body.textContent:"");
  const tm=/BẢNG ĐIỂM LỚP\s+(\S+)\s+HỌC KỲ\s+([0-9]+|HÈ|PHỤ)\.?\s+NĂM HỌC\s+(\d{4})\s*-\s*(\d{4})/i.exec(all);
  if(!tm)throw new Error("Không thấy dòng tiêu đề “BẢNG ĐIỂM LỚP … HỌC KỲ … NĂM HỌC …”. Tệp phải là “Bảng điểm theo lớp” xuất từ hệ thống đào tạo.");
  const lop=tm[1].toUpperCase();
  const ky=/^\d+$/.test(tm[2])?parseInt(tm[2],10):3;
  const nam=`${tm[3]}-${tm[4]}`;
  const ym=/(20\d\d)$/.exec(lop);
  const khoa=ym?"K"+ym[1].slice(2):"";
  // chú thích cột: "0_SAS2002: STC(3)_Tên:Di truyền học thực vật"
  const courses=[];
  doc.querySelectorAll("td").forEach(td=>{
    const m=/^(\d+)_([A-Z]{2,5}\d{3,5}[A-Z0-9]*)\s*:\s*STC\((\d+)\)_Tên:\s*(.*)$/.exec(clean(td.textContent));
    if(m)courses[+m[1]]={code:m[2],tc:+m[3],ten:m[4].replace(/\(\*\)\s*$/,"").trim()};
  });
  if(!courses.length)throw new Error("Không thấy phần chú thích mã học phần (dạng “0_SAS2002: STC(3)_Tên:…”) ở cuối bảng.");
  // dòng tiêu đề: tìm vị trí cột
  let head=null;
  for(const tr of doc.querySelectorAll("tr")){
    const cs=[...tr.children].map(td=>clean(td.textContent));
    if(cs.includes("Mã SV")){head=cs;break;}
  }
  if(!head)throw new Error("Không thấy dòng tiêu đề có cột “Mã SV”.");
  const iM=head.indexOf("Mã SV"),iN=head.indexOf("Họ tên");
  const iT=head.findIndex(h=>/^Điểm TBC/i.test(h)),iL=head.findIndex(h=>/TC liệt/i.test(h));
  const cols=[];head.forEach((h,i)=>{if(/^\d+$/.test(h)&&courses[+h])cols.push([i,courses[+h]]);});
  const warn=[];
  courses.forEach((c,i)=>{if(c&&!cols.some(x=>x[1]===c))warn.push(`Cột ${i} (${c.code}) không có trong dòng tiêu đề.`);});
  const students=[];
  for(const tr of doc.querySelectorAll("tr")){
    const cs=[...tr.children].map(td=>clean(td.textContent));
    if(cs.length<head.length||!/^\d{6,12}$/.test(cs[iM]||""))continue;
    const mon=[];
    for(const [i,c] of cols){
      const v=cs[i];if(!v)continue;
      const d=num(v);
      mon.push(d==null?{m:c.code,t:c.ten,tc:c.tc,raw:v}:{m:c.code,t:c.ten,tc:c.tc,d});
    }
    students.push({mssv:cs[iM],hoTen:cs[iN]||"",mon,off:{tbc:iT>=0?num(cs[iT]):null,liet:iL>=0?num(cs[iL]):null}});
  }
  if(!students.length)throw new Error("Không đọc được dòng sinh viên nào.");
  return {lop,khoa,nam,ky,key:`${nam}_${ky}`,courses:courses.filter(Boolean),students,warn};
}

// ---------- tính điểm ----------
const counts=x=>x.d!=null&&!isCond(x.m,x.t);
// GPA một học kỳ: {gpa, tc (đã học, có điểm), dat (TC đạt), truot (TC trượt)}
export function semStats(mon){
  let s=0,w=0,dat=0,truot=0;
  for(const x of mon){if(!counts(x))continue;s+=letter(x.d).p*x.tc;w+=x.tc;if(x.d>=PASS)dat+=x.tc;else truot+=x.tc;}
  return {gpa:w?r2(s/w):null,tc:w,dat,truot};
}
// Tổng hợp toàn bộ: các học kỳ đã sắp xếp + tích lũy sau mỗi kỳ + học phần còn nợ.
// hk: {"2024-2025_1": {nam, ky, mon:[...]}, ...}
export function summarize(hk){
  const keys=Object.keys(hk||{}).sort();
  const best={};const sems=[];
  for(const k of keys){
    const h=hk[k];const mon=h.mon||[];
    for(const x of mon){if(!counts(x))continue;const b=best[x.m];if(!b||x.d>b.d)best[x.m]=Object.assign({hk:k},x);}
    sems.push(Object.assign({key:k,nam:h.nam,ky:h.ky,mon},semStats(mon),{cum:cumOf(best)}));
  }
  const cum=cumOf(best);
  const no=Object.values(best).filter(x=>x.d<PASS).sort((a,b)=>a.m.localeCompare(b.m));
  return {sems,cum,no,best};
}
function cumOf(best){
  let s=0,w=0;
  for(const x of Object.values(best))if(x.d>=PASS){s+=letter(x.d).p*x.tc;w+=x.tc;}
  return {gpa:w?r2(s/w):null,tc:w};
}
// Mã khung của các học phần đã đạt (để tự đánh dấu trên sơ đồ lộ trình).
export function passedIds(hk){
  const out=new Set();
  for(const h of Object.values(hk||{}))for(const x of h.mon||[])if(x.d!=null&&x.d>=PASS)out.add(frameId(x.m,x.t));
  return out;
}
export const semName=s=>`Học kỳ ${s.ky===3?"hè":s.ky} · năm học ${s.nam}`;
