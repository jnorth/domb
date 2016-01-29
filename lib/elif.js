export default function elif(value, el) {
  return value
    ? el
    : () => undefined;
}
