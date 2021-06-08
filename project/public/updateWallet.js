// clicking update redirects to this url that has its own HTML page

function updateWallet(wallet_id){
    $.ajax({
        url: '/wallets/' + wallet_id,
        type: 'PUT',
        data: $('#updateWallet').serialize(),
        success: function(result){
            window.location.replace("/wallets");
        }
    })
};
