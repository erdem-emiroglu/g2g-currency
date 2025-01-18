"use server";
import {neon} from "@neondatabase/serverless";
import {Data} from "@/types/content";
import {INITIAL_CURRENCY, TARGET_CURRENCY} from "@/constants";
import {revalidatePath} from "next/cache";

export async function getUrls() {
    const sql = neon(process.env.DATABASE_URL);
    return sql`SELECT *
               FROM urls.url_data` as unknown as Promise<Data[]>;
}

export async function createUrl(newUrl: string, name: string) {
    const sql = neon(process.env.DATABASE_URL);

    // Use parameterized query to prevent SQL injection
    await sql`
        INSERT INTO urls.url_data (url, name)
        VALUES (${newUrl}, ${name}) RETURNING *;
    ` as unknown as Promise<Data[]>

    revalidatePath('/');
}

export async function deleteUrl(id: number) {
    const sql = neon(process.env.DATABASE_URL);
    await sql`DELETE
               FROM urls.url_data
               WHERE id = ${id}`;

    revalidatePath('/');
}

export async function updateUrl(id: number, newUrl: string, name: string) {
    const sql = neon(process.env.DATABASE_URL);

    await sql`
        UPDATE urls.url_data
        SET url  = ${newUrl},
            name = ${name}
        WHERE id = ${id} RETURNING *;
    ` as unknown as Promise<Data[]>;

    revalidatePath('/');
}

export async function getCurrencyRate(currency = TARGET_CURRENCY) {
    const apiKey = process.env.CURRENCY_API_KEY;
    const url = process.env.CURRENCY_API_URL;

    const response = await fetch(`${url}/latest?apikey=${apiKey}&base_currency=${INITIAL_CURRENCY}&currencies=${currency}`);
    const {data} = await response.json() || {};
    return data[currency];
}

export async function refreshContents() {
    revalidatePath('/');
}
