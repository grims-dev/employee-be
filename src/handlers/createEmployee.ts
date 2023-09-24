import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AttributeValue, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { createResponse } from '../utils/createResponse';

const dynamoDbClient = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('event ::', JSON.stringify(event, null, 2));

    try {
        if (!event.body) throw new Error('Missing event body');

        const body = JSON.parse(event.body);

        const employee: Record<string, AttributeValue> = {
            ...body,
            id: uuidv4(),
        }
        const putItemCommand: PutCommand = new PutCommand({ TableName: 'dev-employee-be-employees', Item: employee });

        await ddbDocClient.send(putItemCommand);

        return createResponse(201, employee);
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
