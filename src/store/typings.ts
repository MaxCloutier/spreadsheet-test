import { Action } from "redux";

export interface SpreadSheetData {
  [key: string]: string | number
}

export interface SpreadSheetReducer {
  selectedCell: string;
  data: SpreadSheetData
  formatedData: SpreadSheetData
}

export interface CellValueUpdateState {
  y: number
  x: number
  value: string | number
}

export interface MoveCellPayload {
  direction: string
  x: number
  y: number
}

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<SpreadSheetReducer> | CellValueUpdateState | MoveCellPayload;
}

export enum ActionType {
  MOVE_SELECTED_CELL,
  UPDATE_SELECTED_CELL,
  UPDATE_CELL_VALUE
}
