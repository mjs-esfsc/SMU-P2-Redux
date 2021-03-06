$(document).ready(() => {


    const currentCarts;

    // Get logged in user's data
    const  user = $.get("/api/user_data").then(function (data) {
        console.log('user.email: ', data.email);
        console.log('user.id: ', data.id);
        return data;
    });

    $(document).on('click', (event) => {

        // Continue browsing button clicked
        if ($(event.target).attr('id') === 'continueBrowsing') {
            window.location.href = "/browse"
        }

        // Purchases history button clicked
        if ($(event.target).attr('id') === 'purchasesHistory') {
            $('#purchasesDiv').toggle();
        }

        // Confirm purchse button clicked
        if ($(event.target).attr('id') === 'confirmPurchase') {

            $.get("/api/user_data").then(function (data) {
                console.log('user.email: ', data.email);
                console.log('user.id: ', data.id);

                // Add the shoppingcart to the purchases
                currentCarts.forEach((cart) => {
                    Object.values(cart).forEach((cartElement) => {
                        if (typeof cartElement === 'object' && cartElement != null && cartElement[0] != undefined) {
                            $.post("/api/purchases", {
                                UserId: data.id,
                                BookId: cartElement[0].id
                            });
                        }
                    });
                });

                // Delete the shoppingcart
                $.ajax({
                    method: "DELETE",
                    url: `/api/shoppingcart/${data.id}`
                }).then((cart_answer) => {
                    console.log('Cart deleted: ', cart_answer);
                });


                // Display the modal
                $('#purchaeConfirmationModal').modal();

                // Refresh shoppingcart table and Show purchase history
                $('#purchaeConfirmationModal').on('hidden.bs.modal', function (e) {
                    loadShoppingcart();
                    loadPurchases();
                    $('#purchasesDiv').show();
                    $('#confirmPurchase').hide();
                })
            });


        }
    });


    const loadShoppingcart = () => {
        console.log('loadShoppingcart()');

        // Clean the shoppingcart table
        $('#cartTableBody').empty();

        // Load the shoppingcart
        $.ajax({
            method: "GET",
            url: "/api/shoppingcart/"
        }).then((shoppingcart) => {
            let total = 0;

            if (shoppingcart.length > 0) {
                // Clean the data
                cleanedCarts = shoppingcart.map((shoppingcart) => {
                    return {
                        id: shoppingcart.id,
                        UserId: shoppingcart.UserId,
                        Books: shoppingcart.Books
                    }
                });

                // Create the table
                currentCarts.forEach((cart) => {
                    const tr = $('<tr>');
                    const td0 = $('<td>');
                    const td1 = $('<td>');
                    const td2 = $('<td>');
                    const  td3 = $('<td>');
                    const td4 = $('<td>');
                    td0.text(cart.id);
                    td1.text(cart.UserId);
                    Object.values(cart).forEach((cartElement) => {
                        if (typeof cartElement === 'object' && cartElement != null && cartElement[0] != undefined) {
                            td2.text(cartElement[0].id);
                            td3.text(cartElement[0].title);
                            td4.text(cartElement[0].price);
                            total += parseFloat(cartElement[0].price);
                        }
                        tr.append(td0);
                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);
                    });
                    $('#cartTableBody').append(tr);
                });
                total = total.toFixed(2);
                const tr = $('<tr>');
                const td0 = $('<td>');
                const td1 = $('<td>');
                const td2 = $('<td>');
                const td3 = $('<td>');
                const  td4 = $('<td>');
                td3.text('Total');
                td4.text(`${total}`);
                tr.append(td0);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                $('#cartTableBody').append(tr);
            } else {
                $('#confirmPurchase').hide();
            }
        });
    }


    const loadPurchases = () => {
        // loads purchase table
        $('#purchasesTableBody').empty();

        // Load the purchases
        $.get("/api/user_data").then(function (data) {
            console.log('user.email: ', data.email);
            console.log('user.id: ', data.id);

            $.ajax({
                method: "GET",
                url: `/api/purchase/${data.id}` // Missing 
            }).then((purchases) => {

                // update the purchase data
                const updatePurchases = purchases.map((purchase) => {
                    return {
                        id: purchase.id,
                        date: moment(purchase.date).format("MMM Do YY"),
                        UserId: purchase.UserId,
                        Books: purchase.Books
                    }
                });
                console.log('updatePurchases: ', updatePurchases);

                // Created a purchase table
                // Source https://www.valentinog.com/blog/html-table/
                updatePurchases.forEach((purchase) => {
                    const  tr = $('<tr>');
                    const  td0 = $('<td>');
                    const  td1 = $('<td>');
                    const  td2 = $('<td>');
                    const td3 = $('<td>');
                    const td4 = $('<td>');
                    const td5 = $('<td>');
                    td0.text(purchase.id);
                    td1.text(purchase.UserId);
                    td5.text(purchase.date);
                    Object.values(purchase).forEach((purchaseElement) => {
                        if (typeof purchaseElement === 'object' && purchaseElement != null && purchaseElement[0] != undefined) {
                            td2.text(purchaseElement[0].id);
                            td3.text(purchaseElement[0].title);
                            td4.text(purchaseElement[0].price);
                        }
                    });
                    tr.append(td0);
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    tr.append(td4);
                    tr.append(td5);
                    $('#purchasesTableBody').append(tr);
                });
            });
        });

    }

    const init = () => {
        loadShoppingcart();
        loadPurchases()
        $('#purchasesDiv').hide();
    }

    init();
});