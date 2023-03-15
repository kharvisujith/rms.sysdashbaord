export const optionIds = ["A", "B", "C", "D", "E", "F"];

export const findInnerArrayElement = (outerArray: any, innerElement: any) => {
  for (let i = 0; i < outerArray.length; i++) {
    const innerArray = outerArray[i].questionAnswers;
    for (let j = 0; j < innerArray.length; j++) {
      if (innerArray[j] === innerElement) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

export const CaluclateTotalNumberOfAnswers = (arr: any) => {
  if (arr.length > 0) {
    const totalLength = arr.reduce(
      (acc: any, obj: any) => acc + obj.quizAnswers.length,
      0
    );
    return totalLength;
  }
  return 0;
};

export const randomColor = () => {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);

  return color;
};
