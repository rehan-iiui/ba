// ==========================================
// BANK APP
// FEATURE 1
// ==========================================


// Starting fictional balance
let balance = 10000;


// Transaction storage
let transactions = [];


// Current action
let currentAction = null;


// ==========================================
// ELEMENTS
// ==========================================

const balanceElement =
    document.getElementById("balance");

const transferButton =
    document.getElementById("transferButton");

const depositButton =
    document.getElementById("depositButton");

const withdrawButton =
    document.getElementById("withdrawButton");

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalIcon =
    document.getElementById("modalIcon");

const amountInput =
    document.getElementById("amountInput");

const recipientInput =
    document.getElementById("recipientInput");

const recipientContainer =
    document.getElementById("recipientContainer");

const confirmButton =
    document.getElementById("confirmButton");

const transactionsElement =
    document.getElementById("transactions");


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

    balanceElement.textContent =
        formatMoney(balance);
}


// ==========================================
// OPEN MODAL
// ==========================================

function openModal(action) {

    currentAction = action;

    amountInput.value = "";
    recipientInput.value = "";


    if (action === "transfer") {

        modalIcon.textContent = "💸";

        modalTitle.textContent =
            "Transfer Money";

        modalDescription.textContent =
            "Enter the amount and recipient account.";

        recipientContainer.style.display =
            "block";

        confirmButton.textContent =
            "Transfer Money";
    }


    if (action === "deposit") {

        modalIcon.textContent = "➕";

        modalTitle.textContent =
            "Deposit Money";

        modalDescription.textContent =
            "Enter the amount you want to deposit.";

        recipientContainer.style.display =
            "none";

        confirmButton.textContent =
            "Deposit Money";
    }


    if (action === "withdraw") {

        modalIcon.textContent = "➖";

        modalTitle.textContent =
            "Withdraw Money";

        modalDescription.textContent =
            "Enter the amount you want to withdraw.";

        recipientContainer.style.display =
            "none";

        confirmButton.textContent =
            "Withdraw Money";
    }


    modal.classList.remove("hidden");

    amountInput.focus();
}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeActionModal() {

    modal.classList.add("hidden");

    currentAction = null;
}


// ==========================================
// ADD TRANSACTION
// ==========================================

function addTransaction(
    name,
    amount,
    type
) {

    transactions.unshift({

        name: name,

        amount: amount,

        type: type,

        date: new Date()
            .toLocaleString()
    });


    renderTransactions();
}


// ==========================================
// RENDER TRANSACTIONS
// ==========================================

function renderTransactions() {

    if (transactions.length === 0) {

        transactionsElement.innerHTML = `
            <div class="emptyState">
                No transactions yet
            </div>
        `;

        return;
    }


    transactionsElement.innerHTML =
        transactions
            .slice(0, 8)
            .map(transaction => {

                const positive =
                    transaction.type === "deposit";

                const sign =
                    positive ? "+" : "-";

                const icon =
                    positive ? "➕" : "💸";

                const iconBackground =
                    positive
                        ? "#e5f8ee"
                        : "#fff0e7";

                return `

                    <div class="transactionRow">

                        <div class="transactionInfo">

                            <div
                                class="transactionIcon"
                                style="background:${iconBackground}">
                                ${icon}
                            </div>

                            <div>

                                <div class="transactionName">
                                    ${transaction.name}
                                </div>

                                <div class="transactionDate">
                                    ${transaction.date}
                                </div>

                            </div>

                        </div>

                        <div
                            class="${
                                positive
                                    ? "amountPositive"
                                    : "amountNegative"
                            }">

                            ${sign}
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
// PROCESS ACTION
// ==========================================

function processAction() {

    const amount =
        Number(
            amountInput.value
        );


    // Basic validation

    if (
        !amount ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid amount."
        );

        return;
    }


    // ======================================
    // DEPOSIT
    // ======================================

    if (
        currentAction === "deposit"
    ) {

        balance += amount;

        addTransaction(
            "Cash Deposit",
            amount,
            "deposit"
        );

        updateBalance();

        closeActionModal();

        return;
    }


    // ======================================
    // WITHDRAW
    // ======================================

    if (
        currentAction === "withdraw"
    ) {

        if (amount > balance) {

            alert(
                "Insufficient balance."
            );

            return;
        }


        balance -= amount;

        addTransaction(
            "Cash Withdrawal",
            amount,
            "withdraw"
        );

        updateBalance();

        closeActionModal();

        return;
    }


    // ======================================
    // TRANSFER
    // ======================================

    if (
        currentAction === "transfer"
    ) {

        const recipient =
            recipientInput.value.trim();


        if (!recipient) {

            alert(
                "Please enter a recipient account number."
            );

            recipientInput.focus();

            return;
        }


        if (amount > balance) {

            alert(
                "Insufficient balance."
            );

            return;
        }


        balance -= amount;


        addTransaction(
            "Transfer to " + recipient,
            amount,
            "transfer"
        );


        updateBalance();

        closeActionModal();
    }
}


// ==========================================
// BUTTON EVENTS
// ==========================================

transferButton.addEventListener(
    "click",
    () => {

        openModal("transfer");

    }
);


depositButton.addEventListener(
    "click",
    () => {

        openModal("deposit");

    }
);


withdrawButton.addEventListener(
    "click",
    () => {

        openModal("withdraw");

    }
);


closeModal.addEventListener(
    "click",
    closeActionModal
);


confirmButton.addEventListener(
    "click",
    processAction
);


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeActionModal();

        }

    }
);


// ==========================================
// ENTER KEY
// ==========================================

amountInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            processAction();

        }

    }
);


recipientInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            processAction();

        }

    }
);


// ==========================================
// START
// ==========================================

updateBalance();

renderTransactions();
