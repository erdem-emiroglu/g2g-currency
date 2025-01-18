import {Contents} from "@/components/tables/content-table/columns";

export function priceExtractor(htmlString: string): number[] {
    // Regular expression to match prices within <span class="offer-price-amount">...</span>
    const regex = /<span class="offer-price-amount">([\d.]+)<\/span>/g;

    const prices: number[] = [];
    let match: RegExpExecArray | null;

    // Iteratively find all matches
    while ((match = regex.exec(htmlString)) !== null) {
        const price = parseFloat(match[1]); // Convert the matched string to a number
        if (!isNaN(price)) {
            prices.push(price);
        }
    }

    // first two prices only
    return prices.slice(0, 2);
}

export function copyTextFormat(data: Contents[]) {
    // En uzun isim uzunluğunu bul
    const maxNameLength = Math.max(...data.map(item => item.name.length));

    // En uzun ismin sonuna en az 10 boşluk ekleyerek tüm fiyatları hizala
    const paddedLength = maxNameLength + 10;

    const text = data.map(item => {
        // %5 fark kontrolü
        const priceDifference = Math.abs(item.priceLocalMax - item.priceLocalMin);
        const selectedPrice = priceDifference > item.priceLocalMin * 0.05
            ? item.priceLocalMax
            : item.priceLocalMin;

        // İsimleri boşluklarla hizala
        const paddedName = item.name.padEnd(paddedLength, ' ');
        return `💰${paddedName}${selectedPrice}₺`;
    }).join('\n');

    return `WTB ORDER PRICES\n\n${text}`;
}

