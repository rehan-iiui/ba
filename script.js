// ==========================================
// MYBANK
// FEATURE 2 — TRANSFER SYSTEM
// ==========================================


let balance = 10000;

let transactions = [];


// ==========================================
// ELEMENTS
// ==========================================

const balanceElement =
    document.getElementById("balance");

const transferBalance =
    document.getElementById("transferBalance");

const dashboardPage =
    document.getElementById("dashboardPage");

const transferPage =
    document.getElementById("transferPage");

const transferButton =
    document.getElementById("transferButton");

const transferNav =
    document.getElementById("transferNav");

const depositButton =
    document.getElementById("depositButton");

const withdrawButton =
    document.getElementById("withdrawButton");

const transferAmount =
    document.getElementById("transferAmount");

const recipientName =
    document.getElementById("recipientName");

const transferAccount =
    document.getElementById("transferAccount");

const reviewTransfer =
    document.getElementById("reviewTransfer");

const confirmationModal =
    document.getElementById(
        "confirmationModal"
    );

const successModal =
    document.getElementById(
        "successModal"
    );


// Confirmation elements

const confirmName =
    document.getElementById("confirmName");

const confirmAccount =
    document.getElementById(
        "confirmAccount"
    );

const confirmAmount =
    document.getElementById(
        "confirmAmount"
    );


// Receipt elements

const receiptName =
    document.getElementById(
        "receiptName"
    );

const receiptAccount =
    document.getElementById(
        "receiptAccount"
    );

const receiptAmount =
    document.getElementById(
        "receiptAmount"
    );


// ==========================================
// FORMAT MONEY
// ==========================================

function formatMoney(amount) {

    return "Rs " +
        amount.toLocaleString(
            "en-PK",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


// ==========================================
// UPDATE BALANCE
// ==========================================

function updateBalance() {

    const formatted =
        formatMoney(balance);

    balanceElement.textContent =
        formatted;

    transferBalance.textContent =
        formatted;
}


// ==========================================
// OPEN TRANSFER PAGE
// ==========================================

function openTransferPage() {

    dashboardPage.classList.add(
        "hidden"
    );

    transferPage.classList.remove(
        "hidden"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    recipientName.focus();
}


// ==========================================
// OPEN DASHBOARD
// ==========================================

function openDashboard() {

    transferPage.classList.add(
        "hidden"
    );

    dashboardPage.classList.remove(
        "hidden"
    );
}


// ==========================================
// REVIEW TRANSFER
// ==========================================

function reviewTransferDetails() {

    const name =
        recipientName.value.trim();

    const account =
        transferAccount.value.trim();

    const amount =
        Number(
            transferAmount.value
        );


    // Validate recipient

    if (!name) {

        alert(
            "Please enter the recipient name."
        );

        recipientName.focus();

        return;
    }


    // Validate account

    if (!account) {

        alert(
            "Please enter the recipient account number."
        );

        transferAccount.focus();

        return;
    }


    // Validate amount

    if (
        !amount ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid transfer amount."
        );

        transferAmount.focus();

        return;
    }


    // Check balance

    if (amount > balance) {

        alert(
            "Insufficient balance."
        );

        return;
    }


    // Show confirmation details

    confirmName.textContent =
        name;

    confirmAccount.textContent =
        account;

    confirmAmount.textContent =
        formatMoney(amount);


    confirmationModal.classList.remove(
        "hidden"
    );
}


// ==========================================
// CLOSE CONFIRMATION
// ==========================================

function closeConfirmationModal() {

    confirmationModal.classList.add(
        "hidden"
    );
}


// ==========================================
// COMPLETE TRANSFER
// ==========================================

function completeTransfer() {

    const name =
        recipientName.value.trim();

    const account =
        transferAccount.value.trim();

    const amount =
        Number(
            transferAmount.value
        );


    if (
        !amount ||
        amount > balance
    ) {

        closeConfirmationModal();

        alert(
            "The transfer could not be completed."
        );

        return;
    }


    // Deduct money

    balance -= amount;


    // Add transaction

    transactions.unshift({

        name:
            "Transfer to " + name,

        account:
            account,

        amount:
            amount,

        type:
            "transfer",

        date:
            new Date().toLocaleString()
    });


    updateBalance();

    renderTransactions();


    // Close confirmation

    closeConfirmationModal();


    // Fill receipt

    receiptName.textContent =
        name;

    receiptAccount.textContent =
        account;

    receiptAmount.textContent =
        formatMoney(amount);


    // Show receipt

    successModal.classList.remove(
        "hidden"
    );


    // Clear form

    recipientName.value = "";
    transferAccount.value = "";
    transferAmount.value = "";
}


// ==========================================
// CLOSE SUCCESS
// ==========================================

function closeSuccess() {

    successModal.classList.add(
        "hidden"
    );

    openDashboard();
}


// ==========================================
// TRANSACTIONS
// ==========================================

function renderTransactions() {

    const container =
        document.getElementById(
            "transactions"
        );


    if (
        transactions.length === 0
    ) {

        container.innerHTML = `
            <div class="emptyState">
                No transactions yet
            </div>
        `;

        return;
    }


    container.innerHTML =
        transactions
            .slice(0, 8)
            .map(transaction => {

                return `

                    <div class="transactionRow">

                        <div class="transactionInfo">

                            <div
                                class="transactionIcon"
                                style="
                                    background:#fff0e7;
                                ">

                                💸

                            </div>

                            <div>

                                <div
                                    class="transactionName">

                                    ${transaction.name}

                                </div>

                                <div
                                    class="transactionDate">

                                    ${transaction.date}

                                </div>

                            </div>

                        </div>


                        <div
                            class="amountNegative">

                            -
                            ${formatMoney(
                                transaction.amount
                            )}

                        </div>

                    </div>

                `;

            })
            .join("");
}


// ==========================================
// BUTTONS
// ==========================================

transferButton.addEventListener(
    "click",
    openTransferPage
);


transferNav.addEventListener(
    "click",
    openTransferPage
);


reviewTransfer.addEventListener(
    "click",
    reviewTransferDetails
);


document
    .getElementById(
        "closeConfirmation"
    )
    .addEventListener(
        "click",
        closeConfirmationModal
    );


document
    .getElementById(
        "confirmTransfer"
    )
    .addEventListener(
        "click",
        completeTransfer
    );


document
    .getElementById(
        "doneButton"
    )
    .addEventListener(
        "click",
        closeSuccess
    );


// ==========================================
// ESC KEY
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            confirmationModal.classList.add(
                "hidden"
            );

            successModal.classList.add(
                "hidden"
            );

        }

    }
);


// ==========================================
// START
// ==========================================

updateBalance();

renderTransactions();
