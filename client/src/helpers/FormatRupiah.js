export default function FormatCurrency(number) {
    const result = new Intl.NumberFormat('id-Id', {style: 'currency', currency: 'IDR'}).format(number)
    return result
}
