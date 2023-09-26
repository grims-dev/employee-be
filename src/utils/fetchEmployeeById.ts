import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { employeeTable } from './constants';

export const fetchEmployeeById = async (id: string, currentClient: DynamoDBDocumentClient): Promise<Record<string, any>> => {
    try {
        const getCommand: GetCommand = new GetCommand({ TableName: employeeTable, Key: { id } });
        const result = await currentClient.send(getCommand);

        if (!result.Item) throw new Error('Item not found');

        return result.Item;
    } catch (error) {
        console.error(`Error retrieving item with ID: ${id}`, error);
        throw error;
    }
}
