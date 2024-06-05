const roundArabicText = (round: number) => {
  let result = "";
  switch (round) {
    case 0:
      result = "الاولي";
      break;
    case 1:
      result = "الثانية";
      break;
    case 2:
      result = "الثالثة";
      break;
    case 3:
      result = "الرابعة";
      break;
    default:
      result = "الخامسة";
      break;
  }
  return result;
};
export default roundArabicText;