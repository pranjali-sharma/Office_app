

function client_complete(clients) { 
    console.log("clients in autocomplete: "+clients)    
  $( "#client_box" ).autocomplete({
    source: clients
  }); 

}


var display_sales_list= function(sales){
    var i;
    //delete existing updates
    console.log(sales);
    $( "#updates" ).empty();
    for(i=0; i<sales.length; i++){
        //console.log(i);
        var new_sale=$("<div class='row' id='sale'>")
        var salesperson=$("<div class='col-2'>")
        $(salesperson).text(sales[i].salesperson);
        //console.log(sales[i].salesperson);
       // $("#client").text(sales[i].client);
       var client=$("<div class='col-4'>")
        $(client).text(sales[i].client);
        //console.log(sales[i].client);
       // $("#reams").text(sales[i].reams);
       var reams=$("<div class='col-2'>")
        $(reams).text(sales[i].reams);
        //console.log(sales[i].reams);
        var del=$('<button/>', {
            text: "X", //set text 1 to 10
            id: 'btn_'+i,
            class: 'btn btn-warning'
        });
       // var del=$("<button class='btn btn-warning' id='btn"+i"' click= "delete_record(i)">")
        $(del).click(function(){
            console.log("clikccccccc")
        but_id=$(this).attr('id');
        var i = but_id[but_id.length -1];
        console.log(i);
        if(i>=0){
        delete_sale(i);
        }
    });
       //$(del).click(function(){delete_record(i)});

       $(new_sale).append(salesperson)
      $(new_sale).append(client)
      $(new_sale).append(reams)
      $(new_sale).append(del);
      
        $("#updates").prepend(new_sale)

      }
      
    } 
    //get last element from array and display it


var save_sale = function(new_sale){
   
    console.log("reached save_sale")
    $.ajax({
        type: "POST",
        url: "save_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(new_sale),        
        success: function(data,clients){
            console.log("in successs")
            var all_sales = data["sales"]
            sales = all_sales
            console.log("sales: "+sales)
           
            clients=data["clients"]
            console.log("clients: "+clients)        
            $('#client_box').val('');
            $("#reams_box").val('');
            $("#client_box").focus();
            console.log("clients: "+clients)
            client_complete(clients);    
            display_sales_list(sales);

        },
        error: function(request, status, error){
            
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
} 

var delete_sale = function(id){ 
    console.log("reached delete_sale")
    $.ajax({
        type: "POST",
        url: "delete_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(id),        
        success: function(data){
            console.log("in successs")
            var all_sales = data["sales"]
            sales = all_sales
            console.log("sales: "+sales)
            display_sales_list(sales);

        },
        error: function(request, status, error){
            
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
} 

function create_record(){
    console.log("reached create record");
    $("#client_warnings").hide();
    $("#reams_warnings").hide();
   

    //append deets to sales
    new_sale={salesperson:salesperson, client:client_txt, reams:reams_txt};
    console.log(new_sale)
    save_sale(new_sale);
    //sales.push(new_sale);
    //console.log(sales[0].salesperson);
    display_sales_list(sales);
    
       
}

function reams_not_number(){
    console.log("reams not #");
    $("#reams_warnings").show(); 
    $("#reams_box").focus();
}

function client_empty(){
    console.log("cl is empty");
    //show warning
    $("#client_warnings").show();
    //reset focus
    $("#client_box").focus();
    if(reams_len<1){
        $("#reams_warnings").show();

    }
    
}

function reams_empty(){
    console.log("reams is empty");
    //show warning
    $("#reams_warnings").show();
    //reset focus
    $("#reams_box").focus();
}

function submit_pressed(){ 
    console.log("inside submit_pressed")  
    client_txt= $.trim($("#client_box").val());
    console.log(client_txt);
    client_len=client_txt.length;
    console.log(client_len);
    reams_txt=$.trim($("#reams_box").val());
    reams_len=reams_txt.length;
   // console.log(reams_txt);
   // console.log(reams_len);

    if(client_len){
       console.log("cl has len");
      $("#client_warnings").hide();
        if(reams_len){
         console.log("reams has len");
        $("#reams_warnings").hide();
            if($.isNumeric(reams_txt)){
          console.log("reams has nos");
                        $("#reams_warnings").hide();

            create_record();
            }      
            else{
           console.log("reams has no nos.");

            reams_not_number();
            }
        }    
        else{
            console.log("reams has no len");

            reams_empty();
        }
    }  
    else{
        console.log("no cl");

            client_empty();
        }
    }


$(document).ready(function(){
    $("#client_warnings").hide();
    $("#reams_warnings").hide();
    display_sales_list(sales);

    $("#client_box").focus();
    console.log("in the display")
    client_complete(clients);
    

    $("#reams_box").keyup(function(event) {
        if (event.keyCode === 13 ) {
            submit_pressed();
        }
    });

    $('#submit-btn').click(function(){submit_pressed()});
});