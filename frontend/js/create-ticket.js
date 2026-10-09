const createTicketForm =
    document.getElementById("createTicketForm");

const titleInput =
    document.getElementById("title");

const customerNameInput =
    document.getElementById("customerName");

const descriptionInput =
    document.getElementById("description");

const submitButton =
    document.getElementById("submitButton");

const formMessage =
    document.getElementById("formMessage");


function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.classList.remove(
        "hidden",
        "success",
        "error"
    );

    formMessage.classList.add(type);
}


function hideMessage() {

    formMessage.classList.add("hidden");

    formMessage.classList.remove(
        "success",
        "error"
    );
}


function setLoading(isLoading) {

    if (isLoading) {

        submitButton.disabled = true;

        submitButton.classList.add("loading");

        submitButton.innerHTML = `
            <span class="button-spinner"></span>
            <span>Creating...</span>
        `;

        return;
    }


    submitButton.disabled = false;

    submitButton.classList.remove("loading");

    submitButton.innerHTML = `
        <i data-lucide="plus"></i>
        <span>Create Ticket</span>
    `;

    lucide.createIcons();
}


function validateForm() {

    const title =
        titleInput.value.trim();

    const customerName =
        customerNameInput.value.trim();

    const description =
        descriptionInput.value.trim();


    if (!title) {

        showMessage(
            "Please enter a ticket title.",
            "error"
        );

        titleInput.focus();

        return false;
    }


    if (!customerName) {

        showMessage(
            "Please enter the customer's name.",
            "error"
        );

        customerNameInput.focus();

        return false;
    }


    if (!description) {

        showMessage(
            "Please describe the customer's issue.",
            "error"
        );

        descriptionInput.focus();

        return false;
    }


    return true;
}


createTicketForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        hideMessage();


        if (!validateForm()) {
            return;
        }


        const ticketData = {

            title:
                titleInput.value.trim(),

            description:
                descriptionInput.value.trim(),

            customer_name:
                customerNameInput.value.trim()

        };


        setLoading(true);


        try {

            await createTicket(ticketData);


            showMessage(
                "Ticket created successfully.",
                "success"
            );


            createTicketForm.reset();


            setTimeout(() => {

                window.location.href =
                    "tickets.html";

            }, 1000);


        } catch (error) {

            showMessage(
                error.message ||
                "Unable to create the ticket.",
                "error"
            );

        } finally {

            setLoading(false);

        }

    }
);