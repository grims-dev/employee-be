export const stage = process.env?.STAGE || 'dev';

export const employeeTable = `${stage}-employee-be-employees`;

export const headers = {
    'content-type': 'application/json',
}
