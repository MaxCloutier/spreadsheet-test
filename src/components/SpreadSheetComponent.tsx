import React, { FC, useEffect } from 'react'
import Row from './Row'
import { SpreadSheetDispatcher } from '../store/spreadsheet-reducer'
import { useDispatch } from 'react-redux'

interface Props {
  x: number
  y: number
}

const Table: FC<Props> = ({ x, y }) => {
  const dispatch = useDispatch()
  const { moveSelectedCell } = new SpreadSheetDispatcher(dispatch)

  const handleKeydown = ({ key }) => {
    switch (key) {
      case 'ArrowRight':
        moveSelectedCell({ direction: 'right', x, y })
        break
      case 'ArrowLeft':
        moveSelectedCell({ direction: 'left', x, y })
        break
      case 'ArrowUp':
        moveSelectedCell({ direction: 'top', x, y })
        break
      case 'ArrowDown':
        moveSelectedCell({ direction: 'bottom', x, y })
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <table>
      <tbody>
        {Array(y)
          .fill('')
          .map((row, index) => {
            return <Row key={index} y={index} x={x + 1} />
          })}
      </tbody>
    </table>
  )
}

export default Table
