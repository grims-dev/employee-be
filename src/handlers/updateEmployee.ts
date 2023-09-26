import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AttributeValue, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { createResponse } from '../utils/createResponse';
import { employeeTable } from '../utils/constants';

const dynamoDbClient = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('event ::', JSON.stringify(event, null, 2));

    try {
        const id = event.pathParameters?.id;
        if (!id) throw new Error('Missing ID path parameter from request');

        if (!event.body) throw new Error('Missing event body');
        const body = JSON.parse(event.body);

        const employee: Record<string, AttributeValue> = {
            ...body,
            id,
        }
        const putItemCommand: PutCommand = new PutCommand({ TableName: employeeTable, Item: employee });

        await ddbDocClient.send(putItemCommand);

        return createResponse(200, employee);
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
