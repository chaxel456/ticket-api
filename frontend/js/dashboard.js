const totalTicketsElement =
    document.getElementById("totalTickets");

const openTicketsElement =
    document.getElementById("openTickets");

const closedTicketsElement =
    document.getElementById("closedTickets");

const recentTicketsElement =
    document.getElementById("recentTickets");

const recentTicketsTable =
    document.getElementById("recentTicketsTable");

const loadingState =
    document.getElementById("loadingState");

const errorState =
    document.getElementById("errorState");

const errorMessage =
    document.getElementById("errorMessage");

const emptyState =
    document.getElementById("emptyState");

const ticketsTableContainer =
    document.getElementById("ticketsTableContainer");

const retryButton =
    document.getElementById("retryButton");

const refreshButton =
    document.getElementById("refreshButton");


function showLoading() {
    loadingState.classList.remove("hidden");

    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");
    ticketsTableContainer.classList.add("hidden");
}


function showError(message) {
    loadingState.classList.add("hidden");

    emptyState.classList.add("hidden");
    ticketsTableContainer.classList.add("hidden");

    errorState.classList.remove("hidden");

    errorMessage.textContent = message;
}


function showEmpty() {
    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");
    ticketsTableContainer.classList.add("hidden");

    emptyState.classList.remove("hidden");
}


function showTicketsTable() {
    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");

    ticketsTableContainer.classList.remove("hidden");
}


function getStatus(ticket) {
    if (!ticket.status) {
        return "open";
    }

    return String(ticket.status).toLowerCase();
}


function getStatusClass(status) {
    if (status === "closed") {
        return "status-closed";
    }

    if (
        status === "in_progress" ||
        status === "in-progress" ||
        status === "progress"
    ) {
        return "status-progress";
    }

    return "status-open";
}


function formatStatus(status) {
    if (!status) {
        return "Open";
    }

    return String(status)
        .replace("_", " ")
        .replace("-", " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}


function formatDate(ticket) {
    const dateValue =
        ticket.created_at ||
        ticket.created ||
        ticket.createdAt;

    if (!dateValue) {
        return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString();
}


function getCustomerName(ticket) {
    return (
        ticket.customer_name ||
        ticket.customer ||
        "Unknown"
    );
}


function renderStats(tickets) {
    const total = tickets.length;

    const open = tickets.filter(ticket => {
        return getStatus(ticket) === "open";
    }).length;

    const closed = tickets.filter(ticket => {
        return getStatus(ticket) === "closed";
    }).length;

    const recent = tickets.length > 0
        ? Math.min(tickets.length, 5)
        : 0;

    totalTicketsElement.textContent = total;
    openTicketsElement.textContent = open;
    closedTicketsElement.textContent = closed;
    recentTicketsElement.textContent = recent;
}


function renderRecentTickets(tickets) {
    recentTicketsTable.innerHTML = "";

    const recentTickets = [...tickets]
        .reverse()
        .slice(0, 5);

    recentTickets.forEach(ticket => {
        const status = getStatus(ticket);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <span class="ticket-id">
                    #${ticket.id}
                </span>
            </td>

            <td>
                <span class="ticket-title">
                    ${escapeHTML(ticket.title)}
                </span>
            </td>

            <td>
                ${escapeHTML(getCustomerName(ticket))}
            </td>

            <td>
                <span class="status-badge ${getStatusClass(status)}">
                    ${formatStatus(status)}
                </span>
            </td>

            <td>
                ${formatDate(ticket)}
            </td>

            <td>
                <a
                    href="ticket.html?id=${ticket.id}"
                    class="view-ticket"
                >
                    <i data-lucide="eye"></i>
                    View
                </a>
            </td>
        `;

        recentTicketsTable.appendChild(row);
    });

    lucide.createIcons();
}


function escapeHTML(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


async function loadDashboard() {
    showLoading();

    try {
        const tickets = await getTickets();

        if (!Array.isArray(tickets)) {
            throw new Error(
                "The server returned an unexpected response."
            );
        }

        renderStats(tickets);

        if (tickets.length === 0) {
            showEmpty();
            return;
        }

        renderRecentTickets(tickets);

        showTicketsTable();

    } catch (error) {
        showError(error.message);
    }
}


retryButton.addEventListener(
    "click",
    loadDashboard
);


refreshButton.addEventListener(
    "click",
    loadDashboard
);


loadDashboard();