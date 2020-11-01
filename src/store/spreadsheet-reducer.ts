import { Reducer } from "redux";
import { Dispatch } from "react";
import { getLetter, formatAllData } from "../utils/cell.utils";
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
    const { x, y, direction } = action.payload as MoveCellPayload
    const currentPosition = state.selectedCell.split('-')

    switch (direction) {
      case 'right':
      case 'left':
        const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')
        const letters = currentPosition[1].split('')
        // gets the alphabetical index of the letter then adds 26 times the amount of letter when there's more than 1 letter
        const currentY = alpha.indexOf(letters[0]) + (letters.length - 1) * 26
        let newY

        if (direction === 'right') {
          newY = currentY < y ? currentY + 1 : y
        } else {
          newY = currentY > 0 ? currentY - 1 : 0
        }

        currentPosition[1] = getLetter(newY)
        break
      case 'top':
        currentPosition[0] = `${parseFloat(currentPosition[0]) > 1 ? parseFloat(currentPosition[0]) - 1 : 1}`
        break
      case 'bottom':
        currentPosition[0] = `${parseFloat(currentPosition[0]) < x - 1 ? parseFloat(currentPosition[0]) + 1 : x - 1}`
        break
    }

    return {
      ...state,
      selectedCell: currentPosition.join('-')
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
