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
