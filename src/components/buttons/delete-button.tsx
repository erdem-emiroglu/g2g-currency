"use client";

import {IconButton, Tooltip} from "@mui/material";
import * as React from "react";
import ThrashIcon from "@/components/icons/thrash";
import {ModalNames, useModal} from "@/providers/modal.provider";
import {Contents} from "@/components/tables/content-table/columns";

type DeleteButtonProps = {
    data: Contents;
}

export default function DeleteButton({data}: DeleteButtonProps) {
    const {openModal} = useModal();

    return (
        <Tooltip title="Sil">
            <IconButton sx={{height: "min-content"}} onClick={() => openModal(ModalNames.DELETE_MODAL, data)}>
                <ThrashIcon width={16} height={16} fill="white"/>
            </IconButton>
        </Tooltip>
    );
}
