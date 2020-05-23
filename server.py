from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


current_id = 4 
 
sales = [
         {         "id": 1,
                   "salesperson": "James D. Halpert", 
                   "client": "Shake Shack",
                   "reams": 1000
         },
         {         "id": 2,
                   "salesperson": "Stanley Hudson",
                   "client": "Toast",
                   "reams": 4000
         },
         {         "id": 3,
                   "salesperson": "Michael G. Scott",
                   "client": "Computer Science Department",
                   "reams": 10000
         },
        ] 
 
 
clients = [
         "Shake Shack",
         "Toast",
         "Computer Science Department",
         "Teacher's College",
         "Starbucks",
         "Subsconsious",
         "Flat Top",
         "Joe's Coffee",
         "Max Caffe",
         "Nussbaum & Wu",
         "Taco Bell",
          ];   

non_ppc_people = [ 
        "Phyllis",
        "Dwight", 
        "Oscar", 
        "Creed", 
        "Pam", 
        "Jim", 
        "Stanley", 
        "Michael", 
        "Kevin", 
        "Kelly"
        ] 
  
ppc_people = [ "Angela" ] 

@app.route('/')
def hello_world():
   return render_template('home.html')
'''

@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name) 

@app.route('/people')
def people(name=None):
    return render_template('people.html', data=data)  
    


@app.route('/add_name', methods=['GET', 'POST'])
def add_name():
    global data 
    global current_id 

    json_data = request.get_json()   
    name = json_data["name"] 
    
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id += 1
    new_id = current_id 
    new_name_entry = {
        "name": name,
        "id":  current_id
    }
    data.append(new_name_entry)

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(data = data)
    '''
 
@app.route('/infinity')
def infinity(name=None):
    return render_template('cu-paper-infinity.html', clients=clients, sales=sales) 


@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():
    global sales 
    global clients
    
    new_sale = request.get_json()    
    salesperson=new_sale["salesperson"]
    client= new_sale["client"]
    reams=new_sale["reams"]
    # add new entry to array with 
    # a new id and the name the user sent in JSON
     
    new_sale_entry = {
        "salesperson": salesperson,
        "client": client,
        "reams": reams   
    }
    sales.append(new_sale_entry)
    print('sales')
    if(client not in clients):
        clients.append(client)

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(sales = sales, clients=clients)
 
@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():
    global sales
    id= request.get_json()
    int_id=int(id)
    to_del= sales[int_id]
    sales.remove(to_del)

    return jsonify(sales=sales)


@app.route('/ppc')
def ppc(name=None):
    return render_template('ppc.html', ppc_people=ppc_people, non_ppc_people=non_ppc_people) 



@app.route('/move_to_ppc', methods=['GET', 'POST'])
def move_to_ppc():
    global ppc_people 
    global non_ppc_people
    
    new_name = request.get_json() 
    # add new entry to array with 
    # a new id and the name the user sent in JSON
     
    name = new_name["name"]
    ppc_people.append(name)
    non_ppc_people.remove(name)

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(ppc_people = ppc_people, non_ppc_people=non_ppc_people)
 

@app.route('/move_to_non_ppc', methods=['GET', 'POST'])
def move_to_non_ppc():
    global ppc_people 
    global non_ppc_people
    
    new_name = request.get_json() 
    # add new entry to array with 
    # a new id and the name the user sent in JSON
     
    name = new_name["name"]
    non_ppc_people.append(name)
    ppc_people.remove(name)

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(ppc_people = ppc_people, non_ppc_people=non_ppc_people)
 



if __name__ == '__main__':
   app.run(debug = True)




