import XLSX from "xlsx";

function s2ab(s) {
  if (typeof ArrayBuffer !== "undefined") {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    let buf = new Array(s.length);
    for (let j = 0; j != s.length; ++j) buf[j] = s.charCodeAt(j) & 0xff;
    return buf;
  }
}

export default function exportExcel(data, fileName) {
  const defaultCellStyle = {
    font: { name: "Verdana", sz: 11, color: "FF00FF88" },
    fill: { fgColor: { rgb: "FFFFAA00" } }
  };
  const wopts = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
    defaultCellStyle: defaultCellStyle,
    showGridLines: false
  };
  const wb = { SheetNames: ["Sheet1"], Sheets: {}, Props: {} };
  wb.Sheets["Sheet1"] = XLSX.utils.json_to_sheet(data);

  //创建二进制对象写入转换好的字节流
  let blob = new Blob([s2ab(XLSX.write(wb, wopts))], {
    type: "application/octet-stream"
  });

  // 保存文件
  let aLink = document.createElement("a");
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = `${fileName}.xlsx`;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, view: window })
  ); // 兼容火狐
}
