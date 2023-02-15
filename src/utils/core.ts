export const calculateCharge = (hours: number) => {
  let totalCharge = 0;
  if (hours > 2)
    totalCharge = (hours * 10) - 10;
  else
    totalCharge = hours * 5;
  return totalCharge;
};

export const validateIndianNumberPlate = (carNumber: string) => {
  const regex = new RegExp(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/);
  const cleanedCarNumber = carNumber.replace(/-/g, ' ');

  return regex.test(cleanedCarNumber);
};
