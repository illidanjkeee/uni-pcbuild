type Part = {
  price: number | null;
};

export default function total(parts: Part[]): number {
  // console.log(parts, "########################");
  let total = 0;
  for (let part of parts) {
    if (part.price !== null) {
      total += part.price;
    }
  }
  return parseFloat(total.toFixed(2));
}
