function deleteCustomer(id){
  $.ajax({
      url: '/people/' + id,
      type: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }
  })
};
