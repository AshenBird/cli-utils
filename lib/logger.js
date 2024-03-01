import chalk from "chalk";
const getTimeText = () => {
  const { green } = chalk;
  const date = /* @__PURE__ */ new Date();
  const timeString = date.toLocaleTimeString();
  const time = ` ${green(timeString)} `;
  return time;
};
const log = (info2) => {
  const { white } = chalk;
  console.log(getTimeText(), white(info2));
};
const info = (info2) => {
  const { gray } = chalk;
  console.log(getTimeText(), gray(info2));
};
export {
  info,
  log
};
