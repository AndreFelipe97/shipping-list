interface IGetLast12Months {
  dateFormats: Array<string>;
  monthToBase: Array<string>;
}

export default function GetLast12Months(): IGetLast12Months {
  const currentDate = new Date();
  const monthsAndYears: Array<string> = [];
  const monthToBase: Array<string> = [];

  for (let i = 0; i < 12; i++) {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() - i;

    if (month < 0) {
      year -= 1;
      month += 12;
    }

    monthsAndYears.push(`${month}/${year}`);
    monthToBase.push(`${year}-${(month + 1).toString().padStart(2, '0')}`);
  }

  return {
    dateFormats: monthsAndYears.reverse(),
    monthToBase: monthToBase.reverse(),
  };
}
