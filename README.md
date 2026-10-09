# Support Ticket API

A support ticket management system built with FastAPI and Python. The application provides an API for creating, viewing, updating, and deleting support tickets, with a frontend interface for interacting with the backend.

This is my first complete full-stack project, built as part of my journey toward becoming a software engineer.

## About the Project

The Support Ticket API is designed to help users manage support requests in one place. Instead of tracking requests manually, a support team can use a ticket management system to organize issues and monitor their status.

The project combines a frontend user interface with a Python backend that exposes REST API endpoints.

## Features

- Create support tickets.
- Retrieve a list of tickets.
- Retrieve an individual ticket by its ID.
- Update a ticket's status.
- Delete support tickets.
- Validate incoming request data.
- Provide interactive API documentation through FastAPI.
- Connect the frontend to the backend using HTTP requests.

## Technologies Used

### Backend
- **Python** — Main programming language.
- **FastAPI** — Framework for building the REST API.
- **Uvicorn** — ASGI server used to run the application.
- **PostgreSQL** — Relational database, when configured in the project.
- **SQLAlchemy** — Database ORM, when configured in the project.
- **Pydantic** — Request data validation through FastAPI.

### Frontend
- HTML
- CSS
- JavaScript
- Tailwind CSS, if enabled in the frontend
- Lucide icons, if included in the frontend

## How It Works

The application has three main parts:

1. **Frontend:** Provides the interface for creating tickets, viewing tickets, and interacting with ticket details.
2. **Backend API:** Receives HTTP requests, validates incoming data, executes the requested operation, and returns a response.
3. **Database:** Stores ticket records persistently when the PostgreSQL integration is configured and working.

### Request flow

When a user creates a ticket:

1. The user enters the ticket information in the frontend.
2. JavaScript sends an HTTP `POST` request to the backend.
3. FastAPI receives and validates the request.
4. The backend processes the ticket creation and saves the record to the configured database.
5. The API returns a response to the frontend.
6. The frontend displays the result to the user.

The same general flow applies when retrieving, updating, or deleting a ticket.

## API Endpoints

The following endpoints describe the intended ticket management interface. Confirm the actual paths and methods against the current backend implementation.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/tickets` | Create a ticket |
| GET | `/tickets` | Retrieve all tickets |
| GET | `/tickets/{ticket_id}` | Retrieve a ticket by ID |
| PATCH | `/tickets/{ticket_id}` | Update a ticket, such as its status |
| DELETE | `/tickets/{ticket_id}` | Delete a ticket |
| GET | `/` | Check that the API is running |

## Project Structure

The project is organized to separate API routes, database operations, data validation, and frontend files.

```text
support_api/
├── app/
│   ├── main.py
│   ├── database/
│   │   └── session.py
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   │   └── tickets.py
│   └── services/
├── frontend/
│   ├── index.html
│   ├── tickets.html
│   ├── create-ticket.html
│   ├── ticket.html
│   ├── css/
│   │   └── style.css
│   └── js/
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

Some files or directories may differ depending on the current state of the project.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd support_api
```

Replace the repository URL with the actual GitHub URL.

### 2. Create a virtual environment

Windows PowerShell:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```powershell
pip install -r requirements.txt
```

### 4. Configure environment variables

If the backend uses environment variables, create a local `.env` file based on `.env.example` and configure the required database connection settings.

Never commit your `.env` file or expose database passwords and secret keys.

### 5. Configure the database

If PostgreSQL is enabled, make sure the PostgreSQL service is running, the database exists, and the connection settings match your local configuration.

If the project uses Alembic migrations, apply the migrations using the project's configured migration setup.

### 6. Start the backend

From the project root, run:

```powershell
uvicorn app.main:app --reload
```

If your Python package is located under `app/` and the import path requires it, use the command appropriate to your current directory and package structure.

### 7. Open the API documentation

Visit:

http://127.0.0.1:8000/docs

FastAPI provides an interactive interface where you can inspect endpoints, submit requests, and view responses.

### 8. Run the frontend

Open the frontend entry page in a browser or serve the `frontend` directory using a local development server.

Ensure the frontend API base URL points to the running backend.

## Testing the API

Use the interactive `/docs` page to test the available endpoints.

A typical testing sequence is:

1. Create a ticket using `POST /tickets`.
2. Retrieve the ticket list using `GET /tickets`.
3. Retrieve the created ticket using `GET /tickets/{ticket_id}`.
4. Update the ticket using the supported `PATCH` request.
5. Delete the ticket using `DELETE`.

Check the HTTP status codes and response bodies to confirm each operation behaves as expected.

## What I Learned

Building this project helped me practise:

- Structuring a Python backend application.
- Building REST API endpoints with FastAPI.
- Handling HTTP requests and responses.
- Validating incoming data.
- Separating routes, models, schemas, services, and database logic.
- Connecting a frontend to a backend API.
- Using PowerShell and a Python virtual environment.
- Managing dependencies and environment variables.
- Using Git and GitHub to track and publish source code.
- Debugging integration issues across different parts of an application.

## Future Improvements

Possible future improvements include:

- User authentication and authorization.
- Role-based access for support agents and customers.
- Ticket priorities and categories.
- Ticket search, filtering, and pagination.
- Ticket comments and conversation history.
- Automated tests for API endpoints.
- Docker-based development and deployment.
- Production deployment with secure configuration.

These are potential enhancements, not claims that these features are already implemented.

## Project Status

**Milestone:** First complete full-stack project.

This project represents an important step in my software engineering journey. It demonstrates my practice with API development, frontend integration, project organization, and version control.

## Author

**Chukwuma**

Aspiring software engineer focused on backend development, system design, and building practical applications.

GitHub: https://github.com/chaxel456
