"use client";

import * as React from "react";
import RefreshIcon from "@/components/icons/refresh";
import {Button} from "@mui/material";
import {refreshContents} from "@/app/actions";

export default function RefreshButton() {
    const handleRefresh = async () => {
        await refreshContents();
    }
    return (
        <Button
            sx={{ "& .MuiButton-startIcon": { marginRight: "4px" }}}
            color="inherit"
            startIcon={<RefreshIcon fill="white" height={16} width={16}/>}
            onClick={handleRefresh}>
            Yenile
        </Button>
    );
}
