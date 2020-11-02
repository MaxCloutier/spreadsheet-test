import { getLetter, isNumeric, getCellData, getFormatedCellData, formatAllData, getNewPosition } from "../utils/cell.utils"

test('return letter according to cell index', () => {
  const tests = [
    {
      input: 0,
      output: 'a'
    },
    {
      input: 25,
      output: 'z'
    },
    {
      input: 26,
      output: 'aa'
    },
    {
      input: 51,
      output: 'zz'
    },
    {
      input: 52,
      output: 'aaa'
    },
    {
      input: 555,
      output: 'jjjjjjjjjjjjjjjjjjjjjj'
    }
  ]
  tests.forEach(({input, output}) => {
    expect(getLetter(input)).toEqual(output)
  })
})

test('return if value is numeric', () => {
  const tests = [
    {
      input: 0,
      output: true
    },
    {
      input: '25',
      output: true
    },
    {
      input: 'a',
      output: false
    },
    {
      input: '51s',
      output: false
    }
  ]
  tests.forEach(({input, output}) => {
    expect(isNumeric(input)).toEqual(output)
  })
})

test('return the data of given cell', () => {
  const tests = [
    {
      data: {
        data: {'a1': 10}
      },
      position: {
        x: 'a',
        y: '1'
      },
      output: 10
    },
    {
      data: {
        data: {'a1': 10}
      },
      position: {
        x: 'a',
        y: '2'
      },
      output: ''
    }
  ]
  tests.forEach(({data, position, output}) => {
    expect(getCellData(data, position)).toEqual(output)
  })
})

test('return the formatedCellData of given cell', () => {
  const tests = [
    {
      data: {
        formatedData: {'a1': 10}
      },
      position: {
        x: 'a',
        y: '1'
      },
      output: 10
    },
    {
      data: {
        formatedData: {'a1': 10}
      },
      position: {
        x: 'a',
        y: '2'
      },
      output: ''
    },
    {
      data: {
        data: {'a1': 10},
        formatedData: {}
      },
      position: {
        x: 'a',
        y: '2'
      },
      output: ''
    }
  ]
  tests.forEach(({data, position, output}) => {
    expect(getFormatedCellData(data, position)).toEqual(output)
  })
})

test('return format all the cells data and return it', () => {
  const tests = [
    {
      input: {
        'a1': 10,
        'a2': 20,
        'a3': '=a1+a2',
        'a4': '=a3+a2',
      },
      output: {
        'a1': '10',
        'a2': '20',
        'a3': '30',
        'a4': '50',
      }
    },
    {
      input: {
        'a1': 10,
        'a2': 20,
        'a3': '=a1-a2',
      },
      output: {
        'a1': '10',
        'a2': '20',
        'a3': '-10',
      }
    },
    {
      input: {
        'a1': 10,
        'a2': 20,
        'a3': 'a1+a2',
      },
      output: {
        'a1': '10',
        'a2': '20',
        'a3': 'a1+a2',
      }
    },
    {
      input: {
        'a1': 10,
        'a2': 'test',
        'a3': '=a1+a2',
      },
      output: {
        'a1': '10',
        'a2': 'test',
        'a3': 'Not a number',
      }
    },
    {
      input: {
        'aaaaaa50': 10,
        'zzz4': 5,
        'g4': 5,
        'a3': '=aaaaaa50+zzz4-g4',
      },
      output: {
        'aaaaaa50': '10',
        'zzz4': '5',
        'g4': '5',
        'a3': '10',
      }
    },
    {
      input: {
        'a1': 10,
        'a2': 5,
        'a3': '=a1*a2',
      },
      output: {
        'a1': '10',
        'a2': '5',
        'a3': '50',
      }
    },
    {
      input: {
        'a1': 10,
        'a2': 5,
        'a3': '=a1/a2',
      },
      output: {
        'a1': '10',
        'a2': '5',
        'a3': '2',
      }
    },
    {
      input: {
        'a1': 10,
        'a2': 5,
        'a3': '=a1/a2*2',
      },
      output: {
        'a1': '10',
        'a2': '5',
        'a3': '4',
      }
    }
  ]
  tests.forEach(({input, output}) => {
    expect(formatAllData(input)).toEqual(output)
  })
})

test('return new selectedCell', () => {
  const tests = [
    {
      input: {
        selectedCell: '1-a',
        direction: 'right',
        x: 10,
        y: 10
      },
      output: '1-b'
    },
    {
      input: {
        selectedCell: '1-k',
        direction: 'right',
        x: 10,
        y: 10
      },
      output: '1-k'
    },
    {
      input: {
        selectedCell: '1-z',
        direction: 'right',
        x: 10,
        y: 26
      },
      output: '1-aa'
    },
    {
      input: {
        selectedCell: '1-aa',
        direction: 'right',
        x: 10,
        y: 27
      },
      output: '1-bb'
    },
    {
      input: {
        selectedCell: '1-zz',
        direction: 'right',
        x: 10,
        y: 100
      },
      output: '1-aaa'
    },
    {
      input: {
        selectedCell: '1-b',
        direction: 'left',
        x: 10,
        y: 100
      },
      output: '1-a'
    },
    {
      input: {
        selectedCell: '1-a',
        direction: 'left',
        x: 10,
        y: 100
      },
      output: '1-a'
    },
    {
      input: {
        selectedCell: '1-a',
        direction: 'bottom',
        x: 10,
        y: 100
      },
      output: '2-a'
    },
    {
      input: {
        selectedCell: '9-a',
        direction: 'bottom',
        x: 10,
        y: 100
      },
      output: '9-a'
    },
    {
      input: {
        selectedCell: '2-a',
        direction: 'top',
        x: 10,
        y: 100
      },
      output: '1-a'
    },
    {
      input: {
        selectedCell: '1-a',
        direction: 'top',
        x: 10,
        y: 100
      },
      output: '1-a'
    }
  ]
  tests.forEach(({input, output}) => {
    expect(getNewPosition(input)).toEqual(output)
  })
})
