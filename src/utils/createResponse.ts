import { APIGatewayProxyResult } from 'aws-lambda';
import { headers } from './constants';

export const createResponse = (statusCode: number, body: Object): APIGatewayProxyResult => {
    return {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
}
