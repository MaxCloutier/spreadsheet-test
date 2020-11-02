import { Reducer } from "redux";
import { Dispatch } from "react";
import { getLetter, formatAllData, getNewPosition } from "../utils/cell.utils";
import { SpreadSheetReducer, CellValueUpdateState, MoveCellPayload, DispatchAction, ActionType } from './typings'

let localStorageData

try {
  localStorageData = JSON.parse(localStorage.spreadsheetData)
} catch (error) {
  localStorageData = {}
}

let localStorageFormatedData

try {
  localStorageFormatedData = JSON.parse(localStorage.spreadsheetFormatedData)
} catch (error) {
  localStorageFormatedData = {}
}

const initialState: SpreadSheetReducer = {
  selectedCell: '1-a',
  data: localStorageData || {},
  formatedData: localStorageFormatedData || {}
};

export const spreadSheetReducer: Reducer<SpreadSheetReducer, DispatchAction> = (state = initialState, action) => {
  if (action.type === ActionType.UPDATE_SELECTED_CELL) {
    const {selectedCell} = action.payload as Partial<SpreadSheetReducer>

    return {
      ...state,
      selectedCell: selectedCell || ''
    };
  } else if (action.type === ActionType.UPDATE_CELL_VALUE) {
    const { x, y, value } = action.payload as CellValueUpdateState
    const modifiedData = Object.assign({}, state.data)

    modifiedData[`${x}${y}`] = value
    // TODO create indexes to know what cells to update instead of recalculating all of the data each time something changes for performance
    const newFormatedData = formatAllData(modifiedData)

    localStorage.spreadsheetData = JSON.stringify(modifiedData)
    localStorage.spreadsheetFormatedData = JSON.stringify(newFormatedData)

    return {
      ...state,
      data: modifiedData,
      formatedData: newFormatedData
    };
  } else if (action.type === ActionType.MOVE_SELECTED_CELL) {
    return {
      ...state,
      selectedCell: getNewPosition({ selectedCell: state.selectedCell, ...(action.payload as MoveCellPayload) })
    }
  }

  return state;
};

export class SpreadSheetDispatcher {
  private readonly dispatch: Dispatch<DispatchAction>;

  constructor(dispatch: Dispatch<DispatchAction>){
    this.dispatch = dispatch;
  }

  updateSelectedCell = (selectedCell: string) => this.dispatch({type: ActionType.UPDATE_SELECTED_CELL, payload: {selectedCell}});
  moveSelectedCell = (payload: { direction, y, x }) => this.dispatch({type: ActionType.MOVE_SELECTED_CELL, payload});
  updateCellValue = (payload: CellValueUpdateState) => this.dispatch({type: ActionType.UPDATE_CELL_VALUE, payload});
}
