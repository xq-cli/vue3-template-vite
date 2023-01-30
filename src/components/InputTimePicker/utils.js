export const getTimeArr = (time, length = 2) => {
  return formatNumber(time, length).split("");
};
export const getTimeNumber = (time) => {
  return Number(time.join(""));
};
export const formatNumber = (num, length) => {
  return String(num).padStart(length, "0");
};
export const getTimePadString = (time, length = 2) => {
  return time.join("").padStart(length, 0);
};
