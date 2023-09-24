import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AttributeValue, DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../utils/types';
import { createResponse } from '../utils/createResponse';

const dynamoDbClient = new DynamoDBClient();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('event ::', JSON.stringify(event, null, 2));

    try {
        if (!event.body) throw new Error('Missing event body');

        const body = JSON.parse(event.body);

        const employee: Record<string, AttributeValue> = {
            ...body,
            id: uuidv4(),
        }
        const putItemCommand: PutItemCommand = new PutItemCommand({ TableName: 'employees', Item: employee });

        await dynamoDbClient.send(putItemCommand);

        return createResponse(201, employee);
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
