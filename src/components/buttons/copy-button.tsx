"use client";

import CopyIcon from "@/components/icons/copy";
import {Button} from "@mui/material";
import * as React from "react";
import {copyTextFormat} from "@/utils/content-utils";
import {Contents} from "@/components/tables/content-table/columns";
import {useToast} from "@/providers/toast.provider";

type CopyButtonProps = {
    contents: Contents[]
}

export default function CopyButton({contents}: CopyButtonProps) {
    const {openToast} = useToast()
    const handleCopy = async (data: Contents[]) => {

        const newText = copyTextFormat(data);
        await navigator.clipboard.writeText(newText);
        openToast({
            text: "İçerik kopyalandı",
            variant: "success"
        });
    }
    const isDisabled = contents.length === 0;
    return (
        <Button disabled={isDisabled} sx={{ "& .MuiButton-startIcon": { marginRight: "4px" }}} color="inherit" startIcon={<CopyIcon fill="white" height={16} width={16}/>} onClick={() => handleCopy(contents)}>
            Kopyala
        </Button>
    );
}
