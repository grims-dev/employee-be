export const stage = process.env?.STAGE || 'dev';

export const employeeTable = `${stage}-employee-be-employees`;

export const headers = {
    'content-type': 'application/json',
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',
    // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Credentials': true,
};

export const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
