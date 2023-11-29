// https://juejin.cn/post/6844903933320790024#heading-8

export function setCookie(name: string, value: string) {
  document.cookie = name + "=" + value;
}

export function getCookie(name: string) {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const arr = document.cookie.match(reg);
  if (arr) {
    return arr[2];
  } else {
    return null;
  }
}

export function delCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
