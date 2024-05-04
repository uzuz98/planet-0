// @ts-expect-error
import bigDecimal = require("js-big-decimal");
import numeral from "numbro";

// Converter
export const convertBalanceToWei = (
  strValue: string,
  iDecimal: number = 18,
  options?: {
    isFormat?: boolean;
  }
) => {
  strValue = "" + strValue;

  if (Number(strValue) === 0) return 0;

  try {
    // @ts-ignore
    const multiplyNum = new bigDecimal(Math.pow(10, iDecimal));
    // @ts-ignore
    const convertValue = new bigDecimal(String(strValue));
    const result = multiplyNum.multiply(convertValue);
    if (options?.isFormat) {
      return formatMoney(result.getValue()) as any;
    }

    return result.getValue() as any;
  } catch (error) {
    return 0;
  }
};

export const formatMoney = (price = "", decimals = 2): string => {
  let mantissa = decimals;
  const strPrice = price.toString();

  const beforeDot = strPrice.split(".")[0];
  const afterDot = strPrice.split(".")[1]
    ? strPrice.split(".")[1].split("")
    : null;
  const fBefore = beforeDot?.length;
  if (fBefore > 1 && fBefore < 3) {
    mantissa = 2;
  }

  if (fBefore <= 1) {
    mantissa = 4;

    const countZero = afterDot
      ? afterDot.filter((it) => it.toString() === "0")?.length
      : 0;
    if (afterDot && countZero > 2) {
      mantissa = 6;
    }
  }

  return formatNumberBro(price, mantissa);
};

export const formatNumberBro = (
  number: string | number,
  mantissa: number = 4,
  isReturnNaN?: boolean,
  textNa?: string,
  trimMantissa: boolean = true
) => {
  if (
    number !== "null" &&
    !(number === null) &&
    !isNaN(number as number) &&
    !(number === undefined) &&
    number !== "NaN" &&
    number !== Infinity
  ) {
    if (number.toString().length > 0) {
      return numeral(number.toString().replace(/,/g, "")).format({
        trimMantissa,
        thousandSeparated: true,
        mantissa,
        roundingFunction: Math.floor,
      });
    }
  }
  return isReturnNaN ? textNa || "N/A" : "0";
};

export const convertWeiToBalance = (
  strValue: string,
  iDecimal: string | number = 18,
  options?: {
    isFormat?: boolean;
  }
) => {
  strValue = "" + strValue;

  if (Number(strValue) === 0) return 0;

  try {
    const decimalFormat = parseFloat(iDecimal.toString());
    // @ts-expect-error
    const multiplyNum = new bigDecimal(Math.pow(10, decimalFormat));
    // @ts-expect-error
    const convertValue = new bigDecimal(String(strValue));
    const result = convertValue.divide(multiplyNum, decimalFormat);
    // @ts-expect-error
    const res = result.round(iDecimal, bigDecimal.RoundingModes.DOWN);

    if (options?.isFormat) {
      return formatMoney(res.getValue());
    }

    return res.getValue() as any;
  } catch (error) {
    return 0;
  }
};

export const calculateBigNumber = (
  arrValue: string[],
  method: "add" | "subtract"
): string => {
  try {
    if (arrValue) {
      const sumAmount = arrValue.reduce(
        // @ts-expect-error
        (preResult: bigDecimal, currentValue, currentIndex) =>
          currentIndex
            ? // @ts-expect-error
              preResult[method](new bigDecimal(currentValue))
            : // @ts-expect-error
              new bigDecimal(currentValue),
        // @ts-expect-error
        new bigDecimal(0)
      );
      return sumAmount.getValue();
    }
    return "0";
  } catch (error) {
    return "0";
  }
};
