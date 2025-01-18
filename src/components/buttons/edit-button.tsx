"use client";

import {IconButton, Tooltip} from "@mui/material";
import * as React from "react";
import PenIcon from "@/components/icons/pen";
import {ModalNames, useModal} from "@/providers/modal.provider";
import {Contents} from "@/components/tables/content-table/columns";

type EditButtonProps = {
    data: Contents;
}

export default function EditButton({data}: EditButtonProps) {
    const {openModal} = useModal();
    return (
        <Tooltip title="Düzelt">
            <IconButton sx={{height: "min-content"}} onClick={() => openModal(ModalNames.UPDATE_MODAL, data)}>
                <PenIcon width={16} height={16} fill="white"/>
            </IconButton>
        </Tooltip>
    );
}
