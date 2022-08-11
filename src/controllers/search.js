const Account = require('../models/Account')
const Score = require('../models/Score')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.searchResult = async (req, res, next) => {
  // [search][by]=username&[search][value]=ade
  let { by, value } = req.query.search

  let search = await Account.findOne({
    where: {
      [by]: {
        [Op.like]: `%${value}%`,
      },
    },
  })

  let _search = await Score.findAll({
    where: {
      account_id: search.id,
    },
  })

  if (!_search) {
    return res.status(404).json({
      success: false,
      data: {},
      error: { message: 'there is no search result' },
      code: 404,
    })
  }

  return res.status(200).json({
    success: true,
    data: {
      message: 'search retrieved successfully',
      account: search,
      search: _search,
    },
    error: {},
    code: 200,
  })
}
