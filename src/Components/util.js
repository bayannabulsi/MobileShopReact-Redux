export default function FormatCurrency(num) {
  return "$" + parseFloat(num).toFixed(3).toLocaleString() + " ";
}
