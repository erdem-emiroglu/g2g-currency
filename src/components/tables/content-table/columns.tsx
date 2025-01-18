"use client";

import * as React from "react";
import {TypeSafeColDef} from "@/types/table";
import {Stack} from "@mui/material";
import EditButton from "@/components/buttons/edit-button";
import DeleteButton from "@/components/buttons/delete-button";

export type Contents = {
    name: string;
    priceMin: number;
    priceMax: number;
    priceLocalMin: number;
    priceLocalMax: number;
}

export const contentTableColumns: TypeSafeColDef<Contents>[] = [
    {field: 'name', headerName: 'Adı', width: 300},
    {field: 'priceMin', headerName: 'Fiyat (USD - En az)', width: 150},
    {
        field: 'priceMax', headerName: 'Fiyat (USD - En çok)', width: 150, renderCell: (params) => (
            <strong>
                {params.value}
            </strong>
        )
    },
    {field: 'priceLocalMin', headerName: 'Fiyat (TL - En az)', width: 150},
    {
        field: 'priceLocalMax', headerName: 'Fiyat (TL - En çok)', width: 150, renderCell: (params) => (
            <strong>
                {params.value}
            </strong>
        )
    },
    {
        headerName: "",
        field: "actions" as unknown as keyof Contents,
        width: 130,
        sortable: false,
        disableColumnMenu: true,
        resizable: false,
        renderCell: (params) => {
            return (
                <Stack direction="row" gap={1}
                       sx={{
                           height: "100%",
                           justifyContent: "center",
                           alignItems: "center"
                       }}
                >
                    <EditButton data={params.row} />
                    <DeleteButton data={params.row} />
                </Stack>
            )
        },
    }
];
