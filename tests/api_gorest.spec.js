import {test, expect, request} from '@playwright/test';
const {userRecords, failingUserRecords, testRecord, testSingleUserRecord} = require('../test-data/testData.js');
const {baseURL, token, contentType} = require('../constants/config.js');
// Testing API endpoints from https://gorest.co.in/

test.describe(`API - testing RESTful API from ${baseURL} using Playwright`, async () => {
    test.describe.configure({mode:`serial`});
    const bearerToken = `Bearer ${token}`;
    let newRequest;

    test.beforeAll(async () => {
        //creating a new apiRequestContext
        //but it's not necessary
        //can just pass {request} in the test
        //test(`My test`, async ({request}) => {

        newRequest = await request.newContext({
            baseURL: baseURL,
            headers: {
                'Authorization': bearerToken,
                'Content-Type': contentType,
                'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=0',
                'Pragma': 'no-cache'
            },
        });
    })
    
    test.beforeEach(() => {
        test.info().annotations.push({
            type: "Start",
            description: new Date().toISOString(),
        });
    });

    test.afterEach(() => {
        test.info().annotations.push({
            type: "Start",
            description: new Date().toISOString(),
        });
    });

    test(`API - GET one record id: ${testRecord.id} `, async () => {
        const response = await newRequest.get(`/public/v2/users/${testRecord.id}`);
        console.log(`Test record: users/${testRecord.id}`);
        console.log(testRecord);
        console.log(`API Response from GET users/${testRecord.id}:`);
        console.log(await response.json());
        console.log(`Response status: ${response.status()}`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        // expect(JSON.stringify(await response.json())).toBe(JSON.stringify(testRecord));
        expect(await response.json()).toMatchObject(testRecord);
    })

    for (let record of userRecords) {
        test(`API - Multiple GET one record, testing id: ${record.id}`, async () => {
            const response = await newRequest.get(`/public/v2/users/${record.id}`);
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
            const response = await newRequest.get(`/public/v2/users/${failingRecord}`);
            console.log(`API Response from GET users/${failingRecord}:`);
            console.log(await response.json());
            expect(response.status()).toBe(404);
            const responseObj = await response.json();
            expect(responseObj.message).toEqual("Resource not found");
            console.table(responseObj);
        })
    }

    test.describe(`API - create a new test user record and then delete it`, async () => {
        let idToDelete = 0;
        
        test.beforeAll(async () => {
            //create the new test user record
            const response = await newRequest.post(`/public/v2/users`, {
                headers: {
                    'Authorization': bearerToken,
                    'Content-Type': contentType,
                },
                data: testSingleUserRecord
            });
            expect(response.status()).toBe(201);
            const responseObj = await response.json();
            console.log(`API Response from POST user email: ${testSingleUserRecord.email}`);
            console.table(responseObj);
            console.table(testSingleUserRecord);
            expect(responseObj).toMatchObject(testSingleUserRecord);
            expect(responseObj.name).toEqual(testSingleUserRecord.name);
            expect(responseObj.email).toEqual(testSingleUserRecord.email);
            expect(responseObj.gender).toEqual(testSingleUserRecord.gender);
            expect(responseObj.status).toEqual(testSingleUserRecord.status);
            expect(responseObj.id).toBeGreaterThan(0);
            idToDelete = responseObj.id;
        });
        
        test(`API - GET many user record to find the new record`, async () => {
            const manyRecordResponse = await newRequest.get(`/public/v2/users/`,  {
                        headers: {
                            'Authorization': bearerToken,
                            'Content-Type': contentType,
                        }
                    });
            const manyRecordResponseObj = await manyRecordResponse.json();
            console.log(`Many records response:`);
            console.table(manyRecordResponseObj);
            const foundRecordResponseArr = manyRecordResponseObj.filter((singleRecord) => singleRecord.email === testSingleUserRecord.email )
            console.table(foundRecordResponseArr);
            expect(foundRecordResponseArr).toHaveLength(1);
            expect(foundRecordResponseArr[0]).toMatchObject(testSingleUserRecord);
            // await new Promise(resolve => setTimeout(resolve, 500))
        });
        
        test(`API - DELETE the new user record`, async () => {
            // need to delete the record so it can run again
            const deleteResponse = await newRequest.delete(`/public/v2/users/${idToDelete}`, {
                headers: {
                    'Authorization': bearerToken,
                    'Content-Type': contentType,
                }
            });
            console.log(`API Response from DELETE users/${idToDelete}: ${deleteResponse.status()}`);
            expect(deleteResponse.status()).toBe(204);
        });
    })
});