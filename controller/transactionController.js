const transactionModel = require('../models/transactionModel');

const create = async (req, res) => {
  let newTransaction = req.body;

  try {
    const transaction = new transactionModel(newTransaction);
    await transaction.save((err) => {
      if (err) {
        throw err
      };
    });

    res.send(transaction);
  } catch (err) {
    res.status(500).send("Algum erro aconteceu ao salvar");
  }
}

const findAll = async (req, res) => {
  var query = {};
  if(req.query.period) query.period = req.query.period;

  try {
    const transaction = await transactionModel.find(query).exec();
    if (transaction) {
      res.send(transaction);
    } else {
      res.status(400)
    }

  } catch (err) {
    res.status(500).send("Não foi possível completar a busca");
  }
}

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await transactionModel.findById(id);
    res.send(transaction);
  } catch (err) {
    res.status(500).send("Não foi possível completar sua busca");
  }
}

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Nenhum dado foi definido para atualização");
  }
  const id = req.params.id;
  const transaction = req.body;

  try {
    await transactionModel.findByIdAndUpdate(id, {
      $set: {
        description: transaction.description,
        value: transaction.value,
        category: transaction.category,
        year: transaction.year,
        month: transaction.month,
        day: transaction.day,
        yearMonth: transaction.yearMonth,
        yearMonthDay: transaction.yearMonthDay
      }
    }, {
      runValidators: true
    });

    res.send("A transação foi atualizada");
  } catch (err) {
    res.status(500).send("Não foi possível atualizar a transação")
  }
}

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await transactionModel.findByIdAndDelete(id);
    res.send("Transação foi excluída com sucesso");
  } catch (err) {
    res.status(500).send("Não foi possível excluir a transação");
  }
}

module.exports = {findAll, findOne, create, update, remove}