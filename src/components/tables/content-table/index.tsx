'use client';

import * as React from 'react';
import {DataGrid, GridSlotProps, GridToolbarContainer} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {Contents, contentTableColumns} from "@/components/tables/content-table/columns";
import {Stack} from "@mui/material";
import CreateButton from "@/components/buttons/create-button";
import CopyButton from "@/components/buttons/copy-button";
import RefreshButton from "@/components/buttons/refresh-button";

type ContentTableProps = {
    rows: Contents[];
    currencyMultiplier: string;
}

export default function ContentTable({rows, currencyMultiplier}: ContentTableProps) {
    const formattedRows = rows.map(row => ({
        ...row,
        priceMin: (row.priceMin * Number(currencyMultiplier)).toFixed(2) as unknown as number,
        priceMax: (row.priceMax * Number(currencyMultiplier)).toFixed(2) as unknown as number,
        priceLocalMin: (row.priceLocalMin * Number(currencyMultiplier)).toFixed(2) as unknown as number,
        priceLocalMax: (row.priceLocalMax * Number(currencyMultiplier)).toFixed(2) as unknown as number,
    }));

    return (
        <Paper sx={{height: 400, width: '100%'}}>
            <DataGrid
                disableRowSelectionOnClick={true}
                disableColumnSelector={true}
                disableDensitySelector={true}
                rows={formattedRows}
                autoPageSize={true}
                columns={contentTableColumns}
                slots={{toolbar: (props) => <EditToolbar {...props} data={formattedRows}/>}}
            />
        </Paper>
    );
}

function EditToolbar(props: GridSlotProps['toolbar'] & { data: Contents[] }) {
    const {data} = props;
    return (
        <GridToolbarContainer sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            height: "56px"
        }}>
            <CreateButton/>
            <Stack direction="row" spacing={2}>
                <RefreshButton/>
                <CopyButton contents={data}/>
            </Stack>
        </GridToolbarContainer>
    );
}
