function deleteCustomer(customer_id){
  $.ajax({
      url: '/customers/' + customer_id,
      type: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }
  })
};

function deleteCoinWallet(coin_id, wallet_id){
$.ajax({
    url: '/coin_wallet/' + coin_id + '/' + wallet_id,
    type: 'DELETE',
    success: function(result){
        if(result.responseText != undefined){
          alert(result.responseText)
        }
        else {
          window.location.reload(true)
        } 
    }
})
};
