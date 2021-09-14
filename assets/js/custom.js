

jQuery(document).ready(function () {

var base_url = $('.base_url').val();
var base_url1 = $('.base_url1').val();

//user logout update
jQuery('body').on('keyup', '#email', function(){
 $('#email-error').html('');
});
// pagination

jQuery('body').on('keyup', '.enterprice', function(){
 var qty = $(this).attr('data-qty');
 var id = $(this).attr('data-id');
 var unit = $(this).val();
 var price = parseInt(qty) * parseInt(unit);
 $('.totalamount'+id).val(price);
});

// pagination


// user status change
$('body').on('change','.companyStatuschange',function(){

  var id = $(this).attr('data-id');
  var status = $(this).val();
  $('.userId').val(id);
  $('.userstatus').val(status);
  if(status == 0)
  {
    $('.messagetext').text('Are you sure to change the status to InActive ?');
  }
  else if(status == 1)
  {
    $('.messagetext').text('Are you sure to change the status to Active ?');
  }
  if(status != '')
  {
  $('#confirm').modal('show');
  }

});

// user status change


    // **********************only number******************************
    // $(".numberonly").keydown(function (e) {
    $('body').on('keydown', '.numberonly', function(e){

		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
		// Allow: Ctrl+A, Command+A
		(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
		// Allow: home, end, left, right, down, up
		(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
    // **********************only number******************************

    // **********************only character******************************
    // $('.characteronly').keypress(function (e) {
      $('body').on('keypress', '.characteronly', function(e){

        var regex = new RegExp(/^[a-zA-Z\s]+$/);
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else {
            e.preventDefault();
            return false;
        }
    });
    // **********************only character******************************


    // ********************* Image read********************************
	$('body').on('change', '.profilechange', function()
  {
    readProfileURL(this);
  });
    // ********************* Image read********************************


    // delete vehicle from edit
    $('body').on('click','.deleterecord',function(){

      var id = $(this).attr('data-id');
      var link = $(this).attr('data-link');
      $('.deleteId').val(id);
      $('.deletelink').val(link);

      $('#exampleModal-1').modal('show');


    });

    // delete driver
    $('body').on('click','.datadelete',function(){

      var id = $('.deleteId').val();
      var link = $('.deletelink').val();

      $.ajax({
        dataType:'json',
        url :link,
        type :'post',
        data : {
          id:id
        },
        enctype : 'multipart/form-data',
       headers     : {
         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       },
       beforeSend  : function () {
         $(".loader_panel").css('display','block');
       },
       complete: function () {
         $(".loader_panel").css('display','none');
       },

        success: function(response){
        console.log(response);
          $.toast().reset('all');
        var delayTime = 3000;
        if(response.delayTime)
        delayTime = response.delayTime;
        if (response.success)
        {
           $('#exampleModal-1').modal('hide');
          $.toast({
            heading             : 'Success',
            text                : response.success_message,
            loader              : true,
            loaderBg            : '#fff',
            showHideTransition  : 'fade',
            icon                : 'success',
            hideAfter           : delayTime,
            position            : 'top-right'
          });

            setTimeout(function() { window.location.href=response.url;}, 3000);
        }
        else
        {
          //$(".button-disabled").removeAttr("disabled");
          if( response.formErrors)
          {
            $.toast({
              heading             : 'Error',
              text                : response.errors,
              loader              : true,
              loaderBg            : '#fff',
              showHideTransition  : 'fade',
              icon                : 'error',
              hideAfter           : delayTime,
              position            : 'top-right'
            });
          }
          else
          {
            jQuery('#InputEmail').val('');
            $.toast({
              heading             : 'Error',
              text                : response.error_message,
              loader              : true,
              loaderBg            : '#fff',
              showHideTransition  : 'fade',
              icon                : 'error',
              hideAfter           : delayTime,
              position            : 'top-right'
            });
          }
        }

        }
      });

    });
    // delete vehicle

    // keyupnotes
    $('body').on('click','.updateaction',function(){
           var id = $(this).attr('data-id');
           var name = $('.name'+id).val();
           var description = $('.description'+id).val();
           if(name != '' || description != '')
           {
           $.ajax({
             url :base_url +'ActionUpdate',
             type :'post',
             data : {
               id:id,name:name,description:description
             },
             enctype : 'multipart/form-data',
            headers     : {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType    : "json",
             success: function(response){
               if (response.success)
               {
               $.toast({
                 heading             : 'Success',
                 text                : response.success_message,
                 loader              : true,
                 loaderBg            : '#fff',
                 showHideTransition  : 'fade',
                 icon                : 'success',
                 hideAfter           : 3000,
                 position            : 'top-right'
                   });
                  }
                 }
              });
            }

       });
       // acton end

       //        // team

       $('body').on('click','.UpdateTeam',function(){
              var id = $(this).attr('data-id');
              var name = $('.nameupdate'+id).val();
              var email = $('.emailupdate'+id).val();
              var phone = $('.phoneupdate'+id).val();
              var role = $('.roleupdate'+id).val();
              if(name != '' || description != '' || phone != '' || role != '')
              {
              $.ajax({
                url :base_url +'teamUpdate',
                type :'post',
                data : {
                  id:id,name:name,email:email,role:role,phone:phone
                },
                enctype : 'multipart/form-data',
               headers     : {
                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               },
               dataType    : "json",
                success: function(response){
                  if (response.success)
                  {
                  $.toast({
                    heading             : 'Success',
                    text                : response.success_message,
                    loader              : true,
                    loaderBg            : '#fff',
                    showHideTransition  : 'fade',
                    icon                : 'success',
                    hideAfter           : 3000,
                    position            : 'top-right'
                      });
                     }
                    }
                 });
               }

          });
       // team

        });


 // *************** image read*************

 function debounce(func, wait, immediate) {
 	var timeout;
 	return function() {
 		var context = this, args = arguments;
 		var later = function() {
 			timeout = null;
 			if (!immediate) func.apply(context, args);
 		};
 		var callNow = immediate && !timeout;
 		clearTimeout(timeout);
 		timeout = setTimeout(later, wait);
 		if (callNow) func.apply(context, args);
 	};
 };

 function readProfileURL(input)
 {
    if (input.files && input.files[0])
     {
        var reader = new FileReader();
        reader.onload = function (e)
         {
            $('.showprofile').attr('src', e.target.result);
            $('.showprofile').attr('height','100');
            $('.showprofile').attr('width','100');
         }
        reader.readAsDataURL(input.files[0]);
     }
 }
