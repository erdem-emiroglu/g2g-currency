"use client";

import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {LOCAL_STORAGE_KEYS} from "@/constants";

type CurrencyMultiplierProps = {
    onChange: (value: string) => void;
    initialValue: string;
}

const CurrencyMultiplier = ({onChange, initialValue}: CurrencyMultiplierProps) => {
    const [text, setText] = useState(() => initialValue);

    const onSave = () => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENCY_MULTIPLIER, text);
        onChange(text);
    }

    const onTextChange = (value: string) => {
        // regex it only allows numbers
        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }
        setText(value);
    }

    return (
        <Box>
            <TextField size="small" id="outlined-basic" label="Fiyat Çarpanı" variant="outlined" value={text}
                       onChange={(e) => onTextChange(e.target.value)}/>
            <Button onClick={onSave} variant="contained" color="inherit" sx={{height: "40px"}}>Onayla</Button>
        </Box>
    );
}

export default CurrencyMultiplier;
