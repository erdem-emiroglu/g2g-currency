"use client";

import {Button} from "@mui/material";
import * as React from "react";
import {ModalNames, useModal} from "@/providers/modal.provider";
import PlusIcon from "@/components/icons/plus";

export default function CreateButton() {
    const {openModal} = useModal();

    return (
        <Button sx={{ "& .MuiButton-startIcon": { marginRight: "4px" }}} color="inherit" startIcon={<PlusIcon fill="white" height={16} width={16}/>} onClick={() => openModal(ModalNames.CREATE_MODAL)}>
            Kayıt ekle
        </Button>
    );
}
