let balance = 500.00;

class Account {
  constructor(name) {
    this.name = name,
    this.transactions = [];
    //this.balance = 0;
  }
  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    //console.log(this.transactions)
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      //this.account.balance -= this.value;
      // Keep track of the time of the transaction
      this.time = new Date(),
      // Add the transaction to the account
      this.account.addTransaction(this);
    } else {
      console.log("no way");
      return "No way";
    }

  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
// const myAccount = new Account('billybob');

// console.log('Starting Balance:', myAccount.balance);

// const t1 = new Deposit(120.00, myAccount);
// t1.commit();
// myAccount.addTransaction(t1);
// console.log(t1.value)

// const t2 = new Withdrawal(50.00, myAccount);
// t2.commit();
// console.log(t2.value)

// console.log('Ending Balance:', myAccount.balance);

const myAccount = new Account("poil");

// console.log('Starting Account Balance: ', myAccount.balance);

// console.log('Attempting to withdraw even $1 should fail...');
// const t1 = new Deposit(25.00, myAccount);
// console.log('Commit result:', t1.commit());
// console.log('Account Balance: ', myAccount.balance);

// const t2 = new Withdrawal(2.00, myAccount)
// console.log(t2.isAllowed());
// t2.commit()
// console.log(myAccount.balance)

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
