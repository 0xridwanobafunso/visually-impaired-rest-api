const { database, DataTypes } = require('../database')

const Question = database.define(
  'Question',
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_a: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_b: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_c: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_d: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    added_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = Question
