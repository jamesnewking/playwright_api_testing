// Purpose: To provide test data for the tests
const userRecords = JSON.parse(JSON.stringify(require('./userRecords.json')));
const failingUserRecords = JSON.parse(JSON.stringify(require('./failingUserRecords.json')));
const testRecord = JSON.parse(JSON.stringify(require('./oneUserRecord.json')));
const testSingleUserRecord = JSON.parse(JSON.stringify(require('./testSingleUserRecord.json')));

module.exports = {
    userRecords,
    failingUserRecords,
    testRecord,
    testSingleUserRecord
};