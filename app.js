var payments = server.payments().forAccount(accountId);
var payments_receive = server.payments().forAccount(accountId);

function getData() {
    document.querySelector("#list").innerHTML = ""
    payments_receive.order("desc")
    .call()
    .then(function (data) {
        data.records.map(function(item) {
            if(item.type === 'payment') {
                var li = document.createElement("li");
                li.innerHTML = `from: ${item.from} amount: ${item.amount}`
                document.querySelector("#list").appendChild(li);
            }
        });
    })
    .catch(function (err) {
        console.log(err);
    });
}
payments
    .cursor('now')
    .stream({
        onmessage: function(payment) {
            if (payment.to !== accountId) {
            return;
            } else {
                alert(`Deposit ${payment.amount} XLM`);
                getData();
            }
        },
        onerror: function(error) {
            console.error('Error in payment stream');
        }
});