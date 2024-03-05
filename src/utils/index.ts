export function getTimeOfDay() {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 6) {
    return "凌晨";
  } else if (currentHour >= 6 && currentHour < 12) {
    return "上午";
  } else if (currentHour >= 12 && currentHour < 14) {
    return "中午";
  } else if (currentHour >= 14 && currentHour < 18) {
    return "下午";
  } else if (currentHour >= 18 && currentHour < 24) {
    return "晚上";
  } else {
    return "";
  }
}
/*
  为啥这么弄主要是方便数据加密处理吧，因为目前接触到的公司业务请求加密
  Query类型 和 body类型都可以在拦截器中捕获替换,但是 RESTful风格的URL参数
  这种跟随在路径中的就不明确什么是数据什么是路径了 别的暂时没考虑到。。。
  而且这种嘛在写的时候和普通get一样的写。
 */
/*
 *路径参数 遍历传入进来的data 并把路径中的key替换成值
 */
export function replacePathParams(path: string, data: { [key: string]: any }) {

  let newPath = path;
  for (const key in data) {
    if (data[key]) {
      newPath = newPath.replace(`{${key}}`, data[key]);
    }
  }
  return newPath;
}
