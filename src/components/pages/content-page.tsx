'use client';

import {useEffect, useState} from "react";
import ContentTable from "@/components/tables/content-table";
import {Contents} from "@/components/tables/content-table/columns";
import {INITIAL_CURRENCY_MULTIPLIER, LOCAL_STORAGE_KEYS} from "@/constants";
import CurrencyInformation from "@/components/custom/currency-information";
import {getStorageItem} from "@/utils/storage-utils";
import {Alert, Box, Snackbar, Stack} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CurrencyMultiplier from "@/components/custom/currency-multiplier";
import CreateModal from "@/components/modals/create-modal";
import UpdateModal from "@/components/modals/update-modal";
import DeleteModal from "@/components/modals/delete-modal";
import {useToast} from "@/providers/toast.provider";
import {refreshContents} from "@/app/actions";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

type ContentPageProps = {
    content: Contents[];
    rate: number;
}

const ContentPage = ({content, rate}: ContentPageProps) => {
    const initialValue = getStorageItem(LOCAL_STORAGE_KEYS.CURRENCY_MULTIPLIER) || INITIAL_CURRENCY_MULTIPLIER;

    const {toast, onClose} = useToast();
    const [currencyMultiplier, setCurrencyMultiplier] = useState(() => initialValue);

    const onCurrencyMultiplierChange = (value: string) => {
        setCurrencyMultiplier(value);
    }

    useEffect(() => {
        setInterval(() => {
            refreshContents();
            // every 5 minutes
        }, 300000);
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column", // Align items vertically
                    justifyContent: "center", // Center items vertically
                    alignItems: "center", // Center items horizontally
                    height: "100vh",
                    backgroundColor: "#16181B",
                }}
            >
                <Stack direction="column" gap={2}>
                    <Stack direction="row" sx={{
                        justifyContent: "space-between",
                    }}>
                        <CurrencyInformation rate={rate}/>
                        <CurrencyMultiplier initialValue={currencyMultiplier} onChange={onCurrencyMultiplierChange}/>
                    </Stack>
                    <ContentTable rows={content} currencyMultiplier={currencyMultiplier}/>
                </Stack>
            </Box>
            <CreateModal/>
            <UpdateModal/>
            <DeleteModal/>

            <Snackbar open={!!toast} autoHideDuration={3000} onClose={onClose}>
                <Alert
                    onClose={onClose}
                    severity={toast?.variant}
                    variant="filled"
                    sx={{width: '100%', color: "white"}}
                >
                    {toast?.text}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

export default ContentPage;
