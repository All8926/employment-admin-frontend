

// 文件下载
export function download(item, name = 'name') {
  console.log("🚀 ~ download ~ item:", item)
  let url = process.env.VUE_APP_IMG_URL + item.url
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    if (xhr.status === 200) {
      const res = xhr.response;
      const link = document.createElement('a');
      link.style.display = 'none';
      const url = window.URL.createObjectURL(res);
      link.href = url;
      link.setAttribute('download', item[name]);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    }
  }
  xhr.send()
}

// 是否移动设备
export const isMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 匹配常见移动设备的 User-Agent 字符串
  const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /iPad|Android.*(?:\bHD\b|\d{3}x\d{3})|Windows\sPhone\s(?=\d+\.)/i;

  if (tabletRegex.test(userAgent)) {
    return false; // 排除平板设备
  }
  console.log(window.innerWidth, 'window.innerWidth');

  return mobileRegex.test(userAgent) && window.innerWidth <= 768;
};



