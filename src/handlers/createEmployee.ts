import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AttributeValue, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { createResponse } from '../utils/createResponse';
import { employeeTable } from '../utils/constants';
import { Employee, EmployeeSchema } from '../utils/schema';

const dynamoDbClient = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('event ::', JSON.stringify(event, null, 2));

    try {
        // check body and parse object
        if (!event.body) throw new Error('Missing event body');
        const body = JSON.parse(event.body);

        // generate employee record with id
        const employee: Employee = {
            ...body,
            id: uuidv4(),
        };

        // validate employee against schema
        EmployeeSchema.parse(employee);

        // save employee record to DynamoDB
        const putItemCommand: PutCommand = new PutCommand({ TableName: employeeTable, Item: employee });
        await ddbDocClient.send(putItemCommand);

        // return employee record
        return createResponse(201, employee);
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
