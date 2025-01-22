import {getCurrencyRate, getUrls} from "@/app/actions";
import {priceExtractor} from "@/utils/content-utils";
import ContentPage from "@/components/pages/content-page";

export default async function Page() {
    const urls = await getUrls();
    const urlList = urls.map((url) => url.url);
    const responses = await Promise.all(urlList.map((url) => fetch(url).then((response) => response.json())));
    const currencyRate = await getCurrencyRate();

    const minPrice = (index: number) => priceExtractor(responses[index]?.form)?.[0];
    const maxPrice = (index: number) => priceExtractor(responses[index]?.form)?.[1];
    const convertedMinPrice = (index: number) => currencyRate * (minPrice(index))
    const convertedMaxPrice = (index: number) => currencyRate * (maxPrice(index))

    const content = urls.map((url, index) => {
        return {
            name: url.name,
            url: url.url,
            id: url.id,
            priceMin: minPrice(index),
            priceMax: maxPrice(index),
            priceLocalMin: convertedMinPrice(index),
            priceLocalMax: convertedMaxPrice(index)
        }
    });

    return (
        <ContentPage content={content} rate={currencyRate} />
    );
}
