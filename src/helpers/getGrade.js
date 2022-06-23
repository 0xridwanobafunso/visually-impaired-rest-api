/**
 *
 * @param {*} score
 * @returns
 */
let getGrade = (score) => {
  switch (true) {
    case score >= 75:
      return 'A'
    case score >= 70 && score <= 74:
      return 'AB'
    case score >= 65 && score <= 69:
      return 'B'
    case score >= 60 && score <= 64:
      return 'BC'
    case score >= 55 && score <= 59:
      return 'C'
    case score >= 50 && score <= 54:
      return 'CD'
    case score >= 45 && score <= 49:
      return 'D'
    case score >= 40 && score <= 44:
      return 'E'
    case score <= 39:
      return 'F'
  }
}

module.exports = getGrade
