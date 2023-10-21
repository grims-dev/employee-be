import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { createResponse } from '../utils/createResponse';
import { employeeTable } from '../utils/constants';

const dynamoDbClient = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('event ::', JSON.stringify(event, null, 2));

    try {
        // send scan command
        // TODO: add pagination
        const scanCommand: ScanCommand = new ScanCommand({ TableName: employeeTable });
        const output = await ddbDocClient.send(scanCommand);

        return createResponse(200, output.Items ?? {});
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
