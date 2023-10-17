import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AttributeValue, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { createResponse } from '../utils/createResponse';
import { employeeTable } from '../utils/constants';
import { fetchEmployeeById } from '../utils/fetchEmployeeById';
import { Employee, EmployeeSchema } from '../utils/schema';

const dynamoDbClient = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('event ::', JSON.stringify(event, null, 2));

    try {
        // check ID path parameter
        const id = event.pathParameters?.id;
        if (!id) throw new Error('Missing ID path parameter from request');

        // check body and parse object
        if (!event.body) throw new Error('Missing event body');
        const body = JSON.parse(event.body);

        // generate employee record with existing employee
        const existingEmployee = await fetchEmployeeById(id, ddbDocClient);
        const employee: Employee = {
            ...existingEmployee,
            ...body,
            id,
        };

        // validate employee against schema
        EmployeeSchema.parse(employee);

        // update employee record in DynamoDB
        const putItemCommand: PutCommand = new PutCommand({ TableName: employeeTable, Item: employee });
        await ddbDocClient.send(putItemCommand);

        return createResponse(200, employee);
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
