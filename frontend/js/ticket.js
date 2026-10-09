const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const retryButton = document.getElementById("retryButton");

const ticketContent = document.getElementById("ticketContent");

const refreshButton = document.getElementById("refreshButton");

const ticketIdElement = document.getElementById("ticketId");
const metadataTicketId = document.getElementById("metadataTicketId");

const ticketTitle = document.getElementById("ticketTitle");
const ticketDescription = document.getElementById("ticketDescription");
const customerName = document.getElementById("customerName");

const ticketStatusBadge = document.getElementById("ticketStatusBadge");
const ticketCreated = document.getElementById("ticketCreated");

const statusSelect = document.getElementById("statusSelect");
const updateStatusButton = document.getElementById("updateStatusButton");
const deleteButton = document.getElementById("deleteButton");

const actionMessage = document.getElementById("actionMessage");


/* -----------------------------------
   Get Ticket ID From URL
----------------------------------- */

const urlParams = new URLSearchParams(window.location.search);
const ticketId = urlParams.get("id");


/* -----------------------------------
   State Functions
----------------------------------- */

function showLoading() {
    loadingState.classList.remove("hidden");
    errorState.classList.add("hidden");
    ticketContent.classList.add("hidden");
}


function showError(message) {
    loadingState.classList.add("hidden");
    errorState.classList.remove("hidden");
    ticketContent.classList.add("hidden");

    errorMessage.textContent = message;
}


function showTicket() {
    loadingState.classList.add("hidden");
    errorState.classList.add("hidden");
    ticketContent.classList.remove("hidden");
}


/* -----------------------------------
   Helper Functions
----------------------------------- */

function getStatus(ticket) {
    return ticket.status || "open";
}


function getCustomerName(ticket) {
    return (
        ticket.customer_name ||
        ticket.customer ||
        "Unknown Customer"
    );
}


function getCreatedDate(ticket) {
    return (
        ticket.created_at ||
        ticket.created ||
        ticket.createdAt ||
        null
    );
}


function formatStatus(status) {

    if (!status) {
        return "Open";
    }

    if (status === "in_progress" || status === "in-progress") {
        return "In Progress";
    }

    if (status === "closed") {
        return "Closed";
    }

    return "Open";
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


function formatDate(dateValue) {

    if (!dateValue) {
        return "Not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleString();
}


/* -----------------------------------
   Update Status Badge
----------------------------------- */

function updateStatusBadge(status) {

    ticketStatusBadge.textContent = formatStatus(status);

    ticketStatusBadge.className =
        `status-badge ${getStatusClass(status)}`;
}


/* -----------------------------------
   Render Ticket
----------------------------------- */

function renderTicket(ticket) {

    const status = getStatus(ticket);
    const customer = getCustomerName(ticket);
    const createdDate = getCreatedDate(ticket);

    ticketIdElement.textContent = ticket.id;
    metadataTicketId.textContent = ticket.id;

    ticketTitle.textContent =
        ticket.title || "Untitled Ticket";

    ticketDescription.textContent =
        ticket.description || "No description available.";

    customerName.textContent = customer;

    ticketCreated.textContent =
        formatDate(createdDate);

    statusSelect.value = status;

    updateStatusBadge(status);
}


/* -----------------------------------
   Load Ticket
----------------------------------- */

async function loadTicket() {

    if (!ticketId) {

        showError(
            "No ticket ID was provided. Please return to the tickets page."
        );

        return;
    }

    showLoading();

    try {

        const ticket = await getTicket(ticketId);

        if (!ticket) {

            throw new Error(
                "Ticket information could not be loaded."
            );
        }

        renderTicket(ticket);

        showTicket();

        lucide.createIcons();

    } catch (error) {

        showError(
            error.message || "Unable to load ticket."
        );

    }
}


/* -----------------------------------
   Action Message
----------------------------------- */

function showActionMessage(message, type) {

    actionMessage.textContent = message;

    actionMessage.className =
        `form-message ${type}`;

    actionMessage.classList.remove("hidden");
}


function hideActionMessage() {

    actionMessage.classList.add("hidden");

}


/* -----------------------------------
   Update Ticket Status
----------------------------------- */

updateStatusButton.addEventListener(
    "click",
    async function () {

        const newStatus = statusSelect.value;

        updateStatusButton.disabled = true;

        updateStatusButton.innerHTML = `
            <span class="button-spinner"></span>
            Updating...
        `;

        hideActionMessage();

        try {

            await updateTicket(ticketId, {
                status: newStatus
            });

            updateStatusBadge(newStatus);

            showActionMessage(
                "Ticket status updated successfully.",
                "success"
            );

        } catch (error) {

            showActionMessage(
                error.message ||
                "Unable to update ticket status.",
                "error"
            );

        } finally {

            updateStatusButton.disabled = false;

            updateStatusButton.innerHTML = `
                <i data-lucide="save"></i>
                Update Status
            `;

            lucide.createIcons();

        }
    }
);


/* -----------------------------------
   Delete Ticket
----------------------------------- */

deleteButton.addEventListener(
    "click",
    async function () {

        const confirmed = confirm(
            "Are you sure you want to delete this ticket? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        deleteButton.disabled = true;

        deleteButton.innerHTML = `
            <span class="button-spinner"></span>
            Deleting...
        `;

        hideActionMessage();

        try {

            await deleteTicket(ticketId);

            showActionMessage(
                "Ticket deleted successfully. Redirecting...",
                "success"
            );

            setTimeout(function () {

                window.location.href = "tickets.html";

            }, 1000);

        } catch (error) {

            showActionMessage(
                error.message ||
                "Unable to delete ticket.",
                "error"
            );

            deleteButton.disabled = false;

            deleteButton.innerHTML = `
                <i data-lucide="trash-2"></i>
                Delete Ticket
            `;

            lucide.createIcons();

        }
    }
);


/* -----------------------------------
   Refresh
----------------------------------- */

refreshButton.addEventListener(
    "click",
    async function () {

        refreshButton.disabled = true;

        await loadTicket();

        refreshButton.disabled = false;

    }
);


/* -----------------------------------
   Retry
----------------------------------- */

retryButton.addEventListener(
    "click",
    loadTicket
);


/* -----------------------------------
   Mobile Menu
----------------------------------- */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const sidebar =
    document.getElementById("sidebar");

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle("open");

        }
    );

}


/* -----------------------------------
   Initial Load
----------------------------------- */

loadTicket();