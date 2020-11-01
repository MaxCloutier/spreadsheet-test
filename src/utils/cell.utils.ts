import safeEval from "safe-eval";

export const getLetter = (index) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')
  // x - 1 because the first column will be the row number and we want the letter array to start at 0
  // adding % 26 makes sure that it starts over to 0 when it passes 26
  const letter = alpha[index % 26]

  // Starts at 2 since the join method wouldn't put anything if there's only one item in the array created from the multiplier
  // (((x - 1) / 26) >> 0) Shifting by 0 truncates the fractional part leaving only the amount of times 26 fits in x giving us the amount of letters we must add to have the proper spreadsheet headers (...z, aa, bb, cc... ...zz, aaa, bbb...)
  const multiplier = 2 + ((index / 26) >> 0)

  return letter && Array(multiplier).join(`${letter}`)
}

export const isNumeric = (number) => {
  return !isNaN(parseFloat(number)) && !isNaN(+number);
}

export const getCellData = ({data}, { y, x }) => {
  return data?.[`${x}${y}`] || ''
}

export const getFormatedCellData = ({formatedData}, { y, x }) => {
  return formatedData?.[`${x}${y}`] || ''
}

export const formatAllData = data => {
  const formatedData = Object.assign({}, data)
  Object.keys(formatedData).forEach(key => {
    formatedData[key] = formatCellData(formatedData, `${formatedData[key]}`)
  })

  return formatedData
}

const formatCellData = (data, value) => {
  if (value.startsWith('=')) {
    let equation = value.replace('=', '')

    try {
      // Get an array of all the cell positions from the value
      const cells = equation.replace('=', '').match(/[a-z]+[0-9]+/gi)

      cells.forEach(cell => {
        const cellVal = formatCellData(data, `${data[cell]}`)

        if (isNumeric(cellVal)) {
          equation = equation.replace(cell, cellVal)
        } else {
          throw new Error("Not a number")
        }
      });

      value = `${safeEval(equation)}`
    } catch (error) {
      value = error.message
    }
  }

  return value
}
