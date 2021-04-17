import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{

  constructor(){
    super();
    this.state={
      username : null,
      password : null,
      login :false,
      store: null,
      token:null
    }
  }

componentDidMount(){

  this.storeCollector();
}

storeCollector(){

    let store = JSON.parse(localStorage.getItem('login'));
    console.log(store);

    if( store && store.login){
       this.setState({
            login:true,
            store: store
          });
    }
  }


login(){
    
    let info = {
      "email": `${this.state.username}`,
      "password": `${this.state.password}`
    }
    console.log(info);
    fetch('http://api.http://api.farmz2u.co/v1/users/token/',{

        method: "POST",

        headers: { 
        "Content-type": "application/json"
          },

        body: JSON.stringify(info)

      }).then((res)=>{
        res.json().then((result)=>{
          
          alert(result.token);
          localStorage.setItem('login',JSON.stringify({
            login: true,
            token: result.token
            
          }))
         this.storeCollector(); 
        })
      })
  }

  hello(){
     console.log(this.state.store.token);
     
    let token = "Token " + this.state.store.token;
    console.log(token);
    let payload = {
        "name": "new34",
        "description": "sss",
        "status": 1,
        "qty": 234,
        "price": 4567,
        "category": 1,
        "store":2,
    }

    fetch('http://api.http://api.farmz2u.co/v1/products/',{

        method: "POST",

        headers: { 
        "Content-type": "application/json",
        "Authorization": token
          },
        body: JSON.stringify(payload)

      }).then((res)=>{
        res.json().then((result)=>{
          
          alert(result.message);
          console.log(result);
        })
      })
  }

  render(){
    if(this.state.login){
           return(

                  <div>
                  <h4> Authorization Required</h4>
                        <button onClick={() => {this.hello()}}>Hello</button>
                  </div>
            );
    }
    else{
       return (
          <div>
              <h3>JWT TOKEN</h3>
              <div>
                <input type='text' onChange={(event)=> {this.setState({username:event.target.value})}} />

                <br/>

                 <input type='password' onChange={(event)=> {this.setState({password:event.target.value})}} />

                 <button onClick={() => {this.login()}} >Login</button>
              </div>
          </div>
        );

    }
  
}
}

export default App;
