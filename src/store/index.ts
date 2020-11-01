import { spreadSheetReducer } from "./spreadsheet-reducer";
import { DispatchAction, SpreadSheetReducer } from "./typings";
import { createStore } from "redux";

export const store = createStore<SpreadSheetReducer, DispatchAction, null, null>(spreadSheetReducer);
