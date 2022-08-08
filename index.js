class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    // this.account.balance += this.value;
    this.time = new Date();
  // Add the transaction to the account
    this.account.addTransaction(this);
  }
};

class Deposit extends Transaction {
  get value () {
    return this.amount;
  }
};

class Withdrawal extends Transaction {

  get value () {
    return -this.amount;
  }
  commit () {
    if (this.value + this.account._balance > 0) {
      super.commit();
    } else {
      return console.error("Transaction cannot be completed");
    }
  }
};

class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.balance = 0;
    this.transactions = [];
  }
  get _balance() {
    // Calculate the balance using the transaction objects.
    let _balance = this.balance
    for (let each of this.transactions) {
      if (this.username === each.account.username)
      _balance += each.value;
    }
    return _balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
};


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected


const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(60.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount._balance);
