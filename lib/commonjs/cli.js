const resolveCliOption = (options) => {
  const coups = options.join(" ").split("--").map(
    (coup) => coup.split(" ").map((w) => w.trim()).filter((w) => !!w)
  ).filter((c) => c.length > 0);
  const result = {};
  for (const [k, v] of coups) {
    if (k.includes("=")) {
      if (v)
        throw new Error("\u778E\u5199\u53C2\u6570");
      const nc = k.split("=");
      if (nc.length > 2)
        throw new Error("\u778E\u5199\u53C2\u6570");
      result[nc[0]] = optionHandle(nc[1]);
      continue;
    }
    if (typeof v === "undefined") {
      result[k] = true;
      continue;
    }
    result[k] = optionHandle(v);
  }
  return result;
};
const optionHandle = (val) => {
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  if (val === "null") {
    return null;
  }
  return val;
};
export {
  optionHandle,
  resolveCliOption
};
