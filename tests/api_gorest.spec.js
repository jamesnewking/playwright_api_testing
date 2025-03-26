import {test, expect} from '@playwright/test';
const userRecords = JSON.parse(JSON.stringify(require('../test-data/userRecords.json')));
const failingUserRecords = JSON.parse(JSON.stringify(require('../test-data/failingUserRecords.json')));
const testRecord = JSON.parse(JSON.stringify(require('../test-data/oneUserRecord.json')));
const {baseURL, token, contentType} = require('../constants/config.js');

// Testing API endpoints from https://gorest.co.in/

test(`API - GET one record id: ${testRecord.id} `, async ({ request }) => {
    const response = await request.get(`${baseURL}public/v2/users/${testRecord.id}`);
    console.log(`Test record: users/${testRecord.id}`);
    console.log(testRecord);
    console.log(`API Response from GET users/${testRecord.id}:`);
    console.log(await response.json());
    expect(JSON.stringify(await response.json())).toBe(JSON.stringify(testRecord));
    // console.log(await response.text());
    // console.log(await response.body());
})

for (let record of userRecords) {
    test(`API - Multiple GET one record, testing id: ${record.id}`, 
        async ({ request }) => {
        const response = await request.get(`${baseURL}public/v2/users/${record.id}`);
        const responseObj = await response.json();
        console.log(`Test record: users/${record.id}`);
        console.log(record);
        console.log(`API Response from GET users/${record.id}:`);
        console.log(await response.json());
        expect(response.status()).toBe(200);
        // expect(JSON.stringify(responseObj)).toBe(JSON.stringify(record));
        expect(responseObj).toMatchObject(record);
        expect(responseObj.gender).toMatch(/male|female/);
        expect(responseObj.status).toMatch(/active|inactive/);
        expect(responseObj.id).toBeGreaterThan(0);
        expect(responseObj.name.length).toBeGreaterThan(3);
        expect(responseObj.email.length).toBeGreaterThan(3);
        expect(responseObj.email).toMatch(/.+@.+\..+/);
    })
}

for (let failingRecord of failingUserRecords) {
test(`API - GET Invalid user record ${failingRecord}`, async ({ request }) => {
    const response = await request.get(`${baseURL}public/v2/users/${failingRecord}`);
    console.log(`API Response from GET users/${failingRecord}:`);
    console.log(await response.json());
    expect(response.status()).toBe(404);
    const responseObj = await response.json();
    expect(responseObj.message).toEqual("Resource not found");
    console.table(responseObj);
})
}

test(`API - POST create user record and then delete it`, async ({ request }) => {
    const bearerToken = `Bearer ${token}`;
    const userRecord = {
        name: "JustaTest5 UserLastName5",
        email: "test_user5@emyxample.com",
        gender: "female",
        status: "active"
    }
    const response = await request.post(`${baseURL}public/v2/users`, {
        headers: {
            'Authorization': bearerToken,
            'Content-Type': contentType,
        },
        data: userRecord
    });
    console.log(`API Response from POST users:`);
    console.log(await response.json());
    expect(response.status()).toBe(201);
    const responseObj = await response.json();
    console.table(responseObj);
    expect(responseObj.name).toEqual(userRecord.name);
    expect(responseObj.email).toEqual(userRecord.email);
    expect(responseObj.gender).toEqual(userRecord.gender);
    expect(responseObj.status).toEqual(userRecord.status);
    expect(responseObj.id).toBeGreaterThan(0);

    //need to delete the record so it can run again
    const deleteResponse = await request.delete(`${baseURL}public/v2/users/${responseObj.id}`, {
        headers: {
            'Authorization': bearerToken,
            'Content-Type': contentType,
        }
    });
    expect(deleteResponse.status()).toBe(204);
})
