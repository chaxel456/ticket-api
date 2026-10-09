let allTickets = [];

const ticketsTable =
    document.getElementById("ticketsTable");

const loadingState =
    document.getElementById("loadingState");

const errorState =
    document.getElementById("errorState");

const errorMessage =
    document.getElementById("errorMessage");

const emptyState =
    document.getElementById("emptyState");

const noResultsState =
    document.getElementById("noResultsState");

const ticketsTableContainer =
    document.getElementById(
        "ticketsTableContainer"
    );

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const retryButton =
    document.getElementById("retryButton");

const refreshButton =
    document.getElementById("refreshButton");


/* =========================================
   UI STATES
========================================= */

function showLoading() {

    loadingState.classList.remove("hidden");

    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");
    noResultsState.classList.add("hidden");
    ticketsTableContainer.classList.add("hidden");
}


function showError(message) {

    loadingState.classList.add("hidden");

    errorState.classList.remove("hidden");

    emptyState.classList.add("hidden");
    noResultsState.classList.add("hidden");
    ticketsTableContainer.classList.add("hidden");

    errorMessage.textContent = message;
}


function showEmpty() {

    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");
    noResultsState.classList.add("hidden");
    ticketsTableContainer.classList.add("hidden");

    emptyState.classList.remove("hidden");
}


function showNoResults() {

    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");
    ticketsTableContainer.classList.add("hidden");

    noResultsState.classList.remove("hidden");
}


function showTable() {

    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");
    noResultsState.classList.add("hidden");

    ticketsTableContainer.classList.remove("hidden");
}


/* =========================================
   HELPERS
========================================= */

function getStatus(ticket) {

    return ticket.status
        ? String(ticket.status).toLowerCase()
        : "open";
}


function getCustomerName(ticket) {

    return (
        ticket.customer_name ||
        ticket.customer ||
        "Unknown"
    );
}


function getCreatedDate(ticket) {

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

    return String(status)
        .replace("_", " ")
        .replace("-", " ")
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );
}


function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================
   RENDER TICKETS
========================================= */

function renderTickets(tickets) {

    ticketsTable.innerHTML = "";

    tickets.forEach(ticket => {

        const status = getStatus(ticket);

        const row =
            document.createElement("tr");

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
                ${escapeHTML(
                    getCustomerName(ticket)
                )}
            </td>

            <td>
                <span
                    class="status-badge ${getStatusClass(status)}"
                >
                    ${formatStatus(status)}
                </span>
            </td>

            <td>
                ${getCreatedDate(ticket)}
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

        ticketsTable.appendChild(row);

    });

    lucide.createIcons();
}


/* =========================================
   FILTER
========================================= */

function filterTickets() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedStatus =
        statusFilter.value;


    const filteredTickets =
        allTickets.filter(ticket => {

            const title =
                String(
                    ticket.title || ""
                ).toLowerCase();

            const description =
                String(
                    ticket.description || ""
                ).toLowerCase();

            const customer =
                String(
                    getCustomerName(ticket)
                ).toLowerCase();

            const status =
                getStatus(ticket);


            const matchesSearch =
                title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                customer.includes(searchTerm);


            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    if (filteredTickets.length === 0) {

        showNoResults();

        return;
    }


    renderTickets(filteredTickets);

    showTable();
}


/* =========================================
   LOAD TICKETS
========================================= */

async function loadTickets() {

    showLoading();

    try {

        const tickets =
            await getTickets();


        if (!Array.isArray(tickets)) {

            throw new Error(
                "The server returned an unexpected response."
            );

        }


        allTickets = tickets;


        if (allTickets.length === 0) {

            showEmpty();

            return;
        }


        filterTickets();

    } catch (error) {

        showError(
            error.message
        );

    }
}


/* =========================================
   EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    filterTickets
);


statusFilter.addEventListener(
    "change",
    filterTickets
);


retryButton.addEventListener(
    "click",
    loadTickets
);


refreshButton.addEventListener(
    "click",
    loadTickets
);


/* =========================================
   START
========================================= */

loadTickets();