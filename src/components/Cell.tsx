import React, { FC, useState, useEffect } from 'react'
import { SpreadSheetDispatcher } from '../store/spreadsheet-reducer'
import { SpreadSheetReducer } from '../store/typings'
import { connect, useDispatch } from 'react-redux'
import { getCellData, getFormatedCellData } from '../utils/cell.utils'

interface OwnProps {
  x: number
  y: number
}

type StateProps = ReturnType<typeof mapStateToProps>
type Props = StateProps & OwnProps

const Cell: FC<Props> = ({ cellValue, formatedValue, x, y, selectedCell }) => {
  const dispatch = useDispatch()
  const { updateSelectedCell, updateCellValue } = new SpreadSheetDispatcher(dispatch)
  const [localValue, setLocalValue] = useState(cellValue)

  const isSelected = selectedCell === `${y}-${x}`

  useEffect(() => {
    if (!isSelected && localValue !== cellValue) {
      updateCellValue({
        x,
        y,
        value: localValue
      })
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected])

  const handleChange = (e) => {
    setLocalValue(e.target.value)
  }

  const clicked = () => {
    updateSelectedCell(`${y}-${x}`)
  }

  let classes = 'cell'

  // row 0
  if (y === 0) {
    classes += ' perimeter-cell'
    return (
      <th className={classes} role="presentation">
        {x}
      </th>
    )
  }

  if (isSelected) {
    classes += ' selected'
  }

  const moveCursor = (e) => {
    const val = e.target.value
    e.target.value = ''
    e.target.value = val
  }

  const renderCellContent = () => {
    if (isSelected) {
      return (
        <input
          type="text"
          className="cell-input"
          onChange={handleChange}
          value={localValue}
          autoFocus
          onFocus={moveCursor}
        />
      )
    }
    return <span role="presentation">{formatedValue}</span>
  }

  return (
    <td onClick={(e) => clicked()} className={classes}>
      {renderCellContent()}
    </td>
  )
}

const mapStateToProps = (state: SpreadSheetReducer, props) => ({
  selectedCell: state.selectedCell,
  cellValue: getCellData(state, props),
  formatedValue: getFormatedCellData(state, props)
})

export default connect(mapStateToProps)(Cell)
