const API_BASE_URL = "http://127.0.0.1:8000";

async function handleResponse(response) {
    if (response.ok) {
        // DELETE may return no JSON body
        if (response.status === 204) {
            return null;
        }

        return await response.json();
    }

    let message = "Something went wrong.";

    try {
        const errorData = await response.json();

        if (errorData.detail) {
            message = errorData.detail;
        }
    } catch (error) {
        // Keep default error message
    }

    if (response.status === 404) {
        message = "Ticket not found.";
    }

    if (response.status === 500) {
        message = "The server encountered an error.";
    }

    throw new Error(message);
}


async function getTickets() {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets`);

        return await handleResponse(response);

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                "Unable to connect to the support server."
            );
        }

        throw error;
    }
}


async function getTicket(id) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/tickets/${id}`
        );

        return await handleResponse(response);

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                "Unable to connect to the support server."
            );
        }

        throw error;
    }
}


async function createTicket(data) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/tickets`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        return await handleResponse(response);

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                "Unable to connect to the support server."
            );
        }

        throw error;
    }
}


async function updateTicket(id, data) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/tickets/${id}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        return await handleResponse(response);

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                "Unable to connect to the support server."
            );
        }

        throw error;
    }
}


async function deleteTicket(id) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/tickets/${id}`,
            {
                method: "DELETE"
            }
        );

        return await handleResponse(response);

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                "Unable to connect to the support server."
            );
        }

        throw error;
    }
}