import {Chip} from "@mui/material";
import DollarIcon from "@/components/icons/dollar";
import {FRACTION_DIGITS} from "@/constants";

type CurrencyInformationProps = {
    rate: number;
}

const CurrencyInformation = ({rate}: CurrencyInformationProps) => {
    return (
            <Chip size="medium" variant="outlined" icon={<DollarIcon width={16} height={16} color="white" fill="white"/>} label={
                <strong>{rate.toFixed(FRACTION_DIGITS)} Türk Lirası</strong>
            }/>
    );
}

export default CurrencyInformation;
