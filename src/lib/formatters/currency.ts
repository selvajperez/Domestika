export function formatCurrency(value: number, currency = "USD") {
  return `${currency} ${new Intl.NumberFormat("es-AR").format(value)}`;
}
