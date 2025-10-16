(function (ng, window) {
    ng.element(document).ready(function () {
        // Do some interesting thing when the DOM is ready
    });
    ng.module("effectiv_accounting_ui", ["ui.bootstrap", "ui.select"])
        .controller("uiController", ["$scope", uiController])
        .controller("MultiPaymentController", ["$scope", MultiPaymentController])
        .controller("SalesItemPickerDialogController", ["$scope", SalesItemPickerDialogController])
        .controller("AccountLedgerController", ["$scope", AccountLedgerController])
        .controller("SalesReturnListController", ["$scope", SalesReturnListController])
    ;

    function uiController(scope) {
        scope.data = {
            title: "Pi Network",
            author: "Enewa Itodo",
            version: "crypto",
            dashboard: {
                balance: 126.00,
                miningBal: 0,
            }
        };

        function startFakeMining(durationInMillis) {
            var trackTime = 0; //  when = 60,000
            window.setInterval(function () {
                trackTime += durationInMillis;
                scope.$apply(function () {
                    scope.data.dashboard.miningBal += 0.045;
                    if (trackTime >= 60000) {
                        scope.data.dashboard.balance += scope.data.dashboard.miningBal;
                        scope.data.dashboard.miningBal = 0.00;
                        trackTime = 0;
                    }
                })
                //cents
            }, durationInMillis)
        }

        startFakeMining(3000);

        // ==================  ACCOUNT LEDGER  ========================
        var accLedger = {
            title: "Account Ledger",
            summary: [{}]
        };
        scope.accountData = accLedger;

    }

    function MultiPaymentController(scope) {
        scope.data = {
            title: "Multi Payment",
            subTitle: "effectiv accounting UI"
        };

        scope.paymentEntry = {
            account: {},
            amount: 0,
            method: "Cash"
        }
        scope.payments = [];  // array of paymentEntry
        scope.totalAmount = 0.00;


        // Define Payment Accounts
        scope.accounts = [
            {
                id: "1000",
                title: "Cash"
            },
            {
                id: "1001-cheque",
                title: "Bank Cheque"
            },
            {
                id: "1001-access-bank",
                title: "Access Bank",
            },
            {
                id: "1001-opay",
                title: "Opay Digital",
            },
            {
                id: "1001-moniepoint",
                title: "Moniepoint Micro-finance",
            }

        ];
        scope.paymentMethod = ["Cash", "Bank Transfer", "Bank Deposit", "Cheque", "Credit Card"];
        scope.paymentEntry.account = scope.accounts[0];
        scope.paymentEntryLimit = 3;
        scope.addPayment = addPayment;


        /*
        *  make it possible for addPayment to occur after the Payment limit
        * is reached When: 
        * 1) the new Payment Entry already exist and we need to increment the amt
        *       so if we already have 3 entries and the next entry is not in
        *       the list, Ignore the requested entry.
        *       - but if we have a similar payment entry with the same account.id 
        *       - then allow the entry and update as usual
        * */

        function canAddPayment(paymentEntry) {
            // if we are still below the limit return true
            if (scope.payments.length < scope.paymentEntryLimit) {
                return true;
            }

            // check if we have payment : Note: this check occurs if we have Exceeded the limit of scope.paymentEntryLimit 
            if (scope.payments.length > 0) {
                var result = scope.payments.find(function (x) {
                    return (x.account.id === paymentEntry.account.id);
                });

                if (result !== undefined) {
                    // entry  found, so update entry
                    return true;
                }
            }
            return false
        }

        function addPayment(paymentEntry, sumAll) {
            if (sumAll === undefined) {
                sumAll = true;
            }
            if (canAddPayment(paymentEntry) && paymentEntry.amount >= 0) {
                // Check if a payment with the same account id is already added
                if (scope.payments.length > 0) {
                    var result = scope.payments.find(function (x) {
                        return (x.account.id === paymentEntry.account.id);
                    });

                    if (result === undefined) {
                        // we assume is not added yet, so add it
                        scope.payments.push({...paymentEntry});
                    } else {
                        // we found an existing entry, so update
                        sumAll ? result.amount += paymentEntry.amount :
                            result.amount = paymentEntry.amount;
                        result.method = paymentEntry.method;

                    }
                } else {
                    scope.payments.push({...paymentEntry});

                }


            }

            // recalculate total 
            calculateTotalCashPayment();

        }

        scope.removePayment = removePayment;

        function removePayment(index) {
            scope.payments.splice(index, 1);
            calculateTotalCashPayment()
        }

        scope.addDefaultCashPayment = addDefaultCashPayment;

        function addDefaultCashPayment(cashPayment) {
            if (scope.paymentEntry.account.id === "1000") {
                var newEntry = {
                    account: scope.accounts[0],
                    amount: cashPayment,
                    method: "Cash",
                };

                addPayment(newEntry, false);
            }
        }

        function calculateTotalCashPayment() {
            var sum = 0;
            scope.payments.forEach(function (x) {
                sum += x.amount;
            });
            scope.totalAmount = sum;
        }
    }

    function SalesItemPickerDialogController(scope) {
        scope.data = [{
            id: "item01",
            name: "Item ABC"
        }];
        scope.so = {
            id: "INV-0001",
            customer: {
                id: "customer",
                name: "John Okafor",
                phone: "09320932832"
            },
            salesPerson: {
                name: "Chi I.",
                id: "chi-i"
            },
            status: "INVOICED",
            isCancelled: false,
            date: new Date()
        }
        scope.items = [
            {
                id: "item01",
                name: "Item ABC",
                amount: 500,
                qty: 3,
                deliveredQty: 3,
                uom: "psc"
            },
            {
                id: "item02",
                name: "2002 Item ABC",
                amount: 300,
                qty: 1,
                deliveredQty: 1,
                uom: "psc"
            },
            {
                id: "item03",
                name: "XBY-002 Item Youri 0091",
                amount: 1300,
                qty: 2,
                deliveredQty: 1,
                uom: "psc"
            },

        ];
    }

    function AccountLedgerController(scope) {
        var json = `
        {
  "id": "alf-loan",
  "name": "Alfred's Loan Receivable",
  "accountType": "Asset",
  "isReal": true,
  "isContra": false,
  "isParent": false,
  "isChild": true,
  "isActive": true,
  "objCode": null,
  "objType": null,
  "currentBalance": {
    "currency": "₦",
    "value": 8800
  },
  "isSingleAccountInOrg": false,
  "journalEntries": {
    "usePagination": true,
    "pageSize": 50,
    "currentPage": 1,
    "totalRecord": 0,
    "totalPages": 0,
    "data": [
      {
        "journalId": 10063,
        "isBeginBal": false,
        "memo": "Expense made on 'abacha' preparation for all",
        "transType": "MANUAL_ENTRY",
        "transTypeId": null,
        "currency": "NGN",
        "channelId": "ORG_CODE_0001",
        "postedBy": "alfredobialo",
        "postedDate": "2025-06-27T22:28:11.94Z",
        "debitAmount": 8800,
        "creditAmount": null
      }
    ],
    "success": true,
    "message": "Journal Entries loaded successfully",
    "hasErrors": false,
    "errors": [],
    "code": 200
  }
}
        `;
        scope.ledger = ng.fromJson(json);
        scope.journalEntries = ng.fromJson(`
            {
    "totalDebit": 51500.0000,
    "totalCredit": 51500.0000,
    "data": [
        {
            "id": "18962a49-7332-491f-9a7e-e42e0544c174",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Spice-Expense",
                "accountName": "Spices Expense",
                "memo": null,
                "amount": 3900.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "22f33fa7-fa55-4427-a090-c0fde7df2345",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Table Salt Expen",
                "accountName": "Table Salt Expense",
                "memo": null,
                "amount": 600.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "43b6743f-7852-4eb6-a5dd-88d9c515f1cf",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Mayonnaise_EXPEN",
                "accountName": "Mayonnaise Expenses",
                "memo": null,
                "amount": 2200.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "4c03a46e-45dd-4255-8bc8-8090a6a70f67",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Red-Ververt-Expe",
                "accountName": "Red Verviers (Colourizer) Expense",
                "memo": null,
                "amount": 1000.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "5269e6a5-4528-4d03-b07f-60cb7b048085",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Grounding-EXP",
                "accountName": "Grounding Expense",
                "memo": null,
                "amount": 1000.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "54ebe79d-fd1c-4b12-aacd-154536e2488a",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Carrot Expenses",
                "accountName": "Carrot Expenses",
                "memo": null,
                "amount": 1000.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "5d6de3a5-07a3-4793-b29f-a7bf8a6c55ea",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Eggs Expense",
                "accountName": "Eggs Expense",
                "memo": null,
                "amount": 2800.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "717aa315-2108-49af-8802-2333325d5316",
            "journalId": 257,
            "debitAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "creditAccount": {
                "accountId": "1001-bnk-0032923884",
                "accountName": "Access Bank Plc",
                "memo": null,
                "amount": 51500.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "7a9eaefc-1fa3-404f-a635-62e90401c195",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Fresh pepper-Exp",
                "accountName": "Fresh pepper Expense",
                "memo": null,
                "amount": 4500.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "7c90f5ae-ef0f-4671-8b41-6d11495c19bf",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Cucumber Expense",
                "accountName": "Cucumber Expenses",
                "memo": null,
                "amount": 2000.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "9e48760f-c411-49ab-a6f2-03a76833054f",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Cabbage Expenses",
                "accountName": "Cabbage Expenses",
                "memo": null,
                "amount": 2000.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "a4756235-0971-4e46-9885-9257f3550c49",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Tomatoes_EXPENSE",
                "accountName": "Tomatoes EXPENSE",
                "memo": null,
                "amount": 6000.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "cae7bd4f-94a0-4d01-a7ec-311e4babcbf2",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Ginger/Gallic",
                "accountName": "Ginger and Gallic Expenses",
                "memo": null,
                "amount": 1000.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        },
        {
            "id": "cd3ac247-d835-41cb-b095-296aa8383423",
            "journalId": 257,
            "debitAccount": {
                "accountId": "Chicken-Expense",
                "accountName": "Chicken-Expenses",
                "memo": null,
                "amount": 23500.0000
            },
            "creditAccount": {
                "accountId": null,
                "accountName": null,
                "memo": null,
                "amount": 0.0000
            },
            "date": "2024-10-22T14:10:00.36Z",
            "objCode": null,
            "objType": null,
            "objCodeIsAccount": null
        }
    ],
    "success": true,
    "message": "Journal Entry Account loaded successfully",
    "hasErrors": false,
    "errors": [],
    "code": 200
}
        `);
    }

    function SalesReturnListController(scope) {

        scope.response = {
            data: []
        }
        scope.summary = {
            totalReturns: 0,
            totalApproved: 0,
            totalRejected: 0,
            totalOpen: 0
        };
        scope.criteria = {
            pageSize: 20,
            currentPage: 1,
            query: null,
            getByStatus: false,
            status: null
        }

        function init() {
            getSalesReturnDocuments();
            getSalesReturnSummary();
        }

        init();
       
        function getSalesReturnDocuments() {
            const data = `
                               {
  "usePagination": true,
  "pageSize": 20,
  "currentPage": 1,
  "totalRecord": 1,
  "totalPages": 1,
  "data": [
    {
      "salesInvoiceId": "INV-5438809",
      "customerId": "NEW-TEST-SALES-RETURN-CUSTOMER",
      "customerAddress": null,
      "invoiceDate": "0001-01-01T00:00:00Z",
      "status": "DRAFT",
      "invoiceSalesPersonId": null,
      "customerName": "New Test Sales Return Customer",
      "replacementOrderId": null,
      "isApproved": false,
      "note": null,
      "items": [],
      "createdBy": "alfredobialo",
      "approvedBy": null,
      "dateApproved": "2025-10-03T16:21:51.4965839Z",
      "channelId": "ORG_CODE_0001",
      "id": "SR-1959520",
      "key": "SR-1959520",
      "dateCreated": "2025-10-03T16:19:59.52Z",
      "isActive": true
    }
  ],
  "success": true,
  "message": "Sales Return document list",
  "hasErrors": false,
  "errors": [],
  "code": 200
} 
  
            `;
            scope.response = ng.fromJson(data);
            console.log(scope.response);
        }

        function getSalesReturnSummary() {

        }
    }

})(angular, window);
