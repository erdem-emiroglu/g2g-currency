import {GridColDef} from "@mui/x-data-grid";
import {ReactNode} from "react";

export type TypeSafeColDef<T> = GridColDef & { field: keyof T, renderCell?: (params: { value: T[keyof T], row: T }) => ReactNode };
