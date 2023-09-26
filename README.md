# employee-be

Repository for the back end of a sample employee dashboard.

See [employee-fe](https://github.com/grims-dev/employee-fe) for the front end.

## Prerequisites

- Node Version Manager (`nvm`) - Installation details at [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

## Installation

Before installing the package dependencies of this repository, please ensure that you are running the Node version that has been configured for this repository. Using `nvm` to manage your Node environments, you can set the configured Node version from the `.nvmrc` file by running the following commands:

```bash
nvm install
nvm use
```

And install package dependencies via NPM:

```bash
npm i
```

## Endpoints

### Get All Employees

- **Description**: Retrieves all employees. Pagination coming soon!
- **Handler**: `getAllEmployees`
- **Source**: `src/handlers/getAllEmployees.ts`
- **Endpoint**: `/employees`
- **Method**: `GET`

### Create Employee

- **Description**: Creates a new employee record.
- **Handler**: `createEmployee`
- **Source**: `src/handlers/createEmployee.ts`
- **Endpoint**: `/employees`
- **Method**: `POST`
- **Request Body**: JSON object containing employee details - example in `data/createEmployee.json`

### Update Employee

- **Description**: Updates an existing employee record by ID.
- **Handler**: `updateEmployee`
- **Source**: `src/handlers/updateEmployee.ts`
- **Endpoint**: `/employees/${id}`
- **Method**: `PUT`
- **Request Body**: JSON object containing updated employee details - example in `data/updateEmployee.json`

### Delete Employee

- **Description**: Deletes an employee record by ID.
- **Handler**: `updateEmployee`
- **Source**: `src/handlers/deleteEmployee.ts`
- **Endpoint**: `/employees/${id}`
- **Method**: `DELETE`

## TODOs

- Add pagination to `getAllEmployees` endpoint
- Add authentication via tokens to endpoints
- Add unit tests
- Add error metrics to endpoints
- Add field schema validation on incoming body data
- Implement proper API documentation via Swagger
- Add CI/CD pipeline for building, testing and deploying code
- Add caching on GET requests
