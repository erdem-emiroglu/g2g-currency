"use client";

import CopyIcon from "@/components/icons/copy";
import {Button} from "@mui/material";
import * as React from "react";
import {copyTextFormat} from "@/utils/content-utils";
import {Contents} from "@/components/tables/content-table/columns";

type CopyButtonProps = {
    contents: Contents[]
}

export default function CopyButton({contents}: CopyButtonProps) {
    const handleCopy = (data: Contents[]) => {
        const newText = copyTextFormat(data);
        navigator.clipboard.writeText(newText);
    }
    return (
        <Button sx={{ "& .MuiButton-startIcon": { marginRight: "4px" }}} color="inherit" startIcon={<CopyIcon fill="white" height={16} width={16}/>} onClick={() => handleCopy(contents)}>
            Kayıt ekle
        </Button>
    );
}
