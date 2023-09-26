import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { createResponse } from '../utils/createResponse';
import { employeeTable } from '../utils/constants';

const dynamoDbClient = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('event ::', JSON.stringify(event, null, 2));

    try {
        const id = event.pathParameters?.id;
        if (!id) throw new Error('Missing ID path parameter from request');

        const deleteItemCommand: DeleteCommand = new DeleteCommand({ TableName: employeeTable, Key: { id } });

        await ddbDocClient.send(deleteItemCommand);

        return createResponse(204, { id });
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
