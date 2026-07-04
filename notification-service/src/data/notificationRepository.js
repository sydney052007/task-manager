const records = [];

function createRecord(record) {
  records.push(record);
  return record;
}

module.exports = { createRecord };