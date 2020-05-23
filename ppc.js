
var display_lists = function(non_ppc_people, ppc_people){
    makeNames(non_ppc_people);
    makeParty(ppc_people)
} 

function makeNames(non_ppc_people){
    $("#employees").empty();
    $.each(non_ppc_people, function(index, value){
        var txt=(++index+":"+value );
        var line=$("<li/>",{            
            text: txt,
        });
        line.addClass("line");
        line.draggable({
            stack: '#ppc_label',
            revert: true
        });
        $("#employees").append(line);

    });
}

function makeParty(ppc_people){
    $("#ppc").empty();
    $.each(ppc_people, function(index, value){
        var txt=(++index+":"+value );
        var line=$("<li/>",{            
            text: txt,
        });
        line.addClass("pp");
        line.draggable({
            revert:true
        });
        $("#ppc").append(line);

    });
}

var move_to_ppc = function(name){
    console.log("inside move_to_ppc")
    $.ajax({
        type: "POST",
        url: "move_to_ppc",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(name),        
        success: function(data){
            console.log("in successs")
            var all_ppc = data["ppc_people"]
            ppc_people = all_ppc
            var all_non_ppc=data["non_ppc_people"]
            non_ppc_people=all_non_ppc
            display_lists(non_ppc_people, ppc_people);

        },
        error: function(request, status, error){
            
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
} 

var move_to_non_ppc = function(name){
    $.ajax({
        type: "POST",
        url: "move_to_non_ppc",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(name),        
        success: function(data){
            console.log("in successs")
            var all_ppc = data["ppc_people"]
            ppc_people = all_ppc
            var all_non_ppc=data["non_ppc_people"]
            non_ppc_people=all_non_ppc
            display_lists(non_ppc_people, ppc_people);

        },
        error: function(request, status, error){
            
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
} 

$(document).ready(function(){
    display_lists(non_ppc_people, ppc_people);

    console.log("back in ready");
    $("#ppc_label").droppable({
    
        classes:{
            "ui-droppable-active": "light",
            "ui-droppable-hover":"dark"
        },
        accept:".line",
        drop:function(event, ui){
            console.log("somthing was dropped")
            //get dropped name
            var item = $(ui.draggable);
            var t=item.text();
            var txt= t.split(":");
            var name=txt[1];

            //update employees array
            var ppc_present=jQuery.inArray(name, ppc_people);            
            console.log(ppc_present);
            var emp_present=jQuery.inArray(name, non_ppc_people);
            console.log(emp_present);
        if(ppc_present<0 && emp_present>=0){
            console.log("inside if");
            name={name:name};
            console.log(name);
            move_to_ppc(name);//WHY ISNT THIS GETTONG CALLED????
            console.log("after move to ppc")
       // ppc.push(name);
        //employees.splice( $.inArray(name, employees), 1 );        
    }
                   
            //update ppc array

            //update interface to display new lists
            display_lists(non_ppc_people, ppc_people);

            
        }
    });


    $("#non_ppc_label").droppable({
        classes:{
            "ui-droppable-active": "light",
            "ui-droppable-hover":"dark"
        },
        accept:".pp",
        drop:function(event, ui){
            console.log("somthing was dropped")
            //get dropped name
            var item = $(ui.draggable);
            var t=item.text();
            var txt= t.split(":");
            var name=txt[1];
            console.log(name);


            //update employees array
            var ppc_present=jQuery.inArray(name, ppc_people);
            var emp_present=jQuery.inArray(name, non_ppc_people);
        if(ppc_present>=0 && emp_present<0){
            new_name={"name":name}
            move_to_non_ppc(new_name)
        //employees.push(name);
       // ppc.splice( $.inArray(name, ppc), 1 );        
    }
        
            console.log(ppc_people);
            console.log(non_ppc_people);            
            //update ppc array

            //update interface to display new lists
            display_lists(non_ppc_people, ppc_people);

        }
    });
})

