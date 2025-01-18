import {getCurrencyRate, getUrls} from "@/app/actions";
import {priceExtractor} from "@/utils/content-utils";
import ContentPage from "@/components/pages/content-page";

export default async function Page() {
    const urls = await getUrls();
    const urlList = urls.map((url) => url.url);
    const responses = await Promise.all(urlList.map((url) => fetch(url).then((response) => response.json())));
    const currencyRate = await getCurrencyRate();

    const minPrice = priceExtractor(responses[0]?.form)?.[0];
    const maxPrice = priceExtractor(responses[0]?.form)?.[1];
    const convertedMinPrice = currencyRate * (minPrice);
    const convertedMaxPrice = currencyRate * (maxPrice);

    const content = urls.map((url, index) => {
        return {
            name: url.name,
            url: url.url,
            id: url.id,
            priceMin: minPrice,
            priceMax: maxPrice,
            priceLocalMin: convertedMinPrice,
            priceLocalMax: convertedMaxPrice
        }
    });

    return (
        <ContentPage content={content} rate={currencyRate} />
    );
}
