import type {Metadata} from "next";
import "./globals.css";
import {ModalProvider} from "@/providers/modal.provider";
import {ToastProvider} from "@/providers/toast.provider";

export const metadata: Metadata = {
    title: "G2G Currency Actions",
    description: "G2G Currency Actions",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
        <body>
        <ToastProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </ToastProvider>
        </body>
        </html>
    );
}
