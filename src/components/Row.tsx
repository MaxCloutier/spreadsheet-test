import React, { FC } from 'react'
import Cell from './Cell'
import { getLetter } from '../utils/cell.utils'

interface Props {
  y: number
  x: number
}

const Row: FC<Props> = ({ y, x }) => {
  return (
    <tr>
      <td className="cell perimeter-cell">{!!y && y}</td>
      {Array(x)
        .fill('')
        .map((cell, index) => (
          <Cell key={`${y}-${index}`} y={y} x={getLetter(index)} />
        ))}
    </tr>
  )
}
export default Row
