import { nanoid } from "nanoid";

const getNanoid = (number: number = 10) => {
  return nanoid(number);
};

export default getNanoid;
