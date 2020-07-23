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
      "username": `${this.state.username}`,
      "password": `${this.state.password}`
    }
    console.log(info);
    fetch('http://127.0.0.1:8000/api/login/',{

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
    fetch('http://127.0.0.1:8000/hello/',{

        method: "GET",

        headers: { 
        "Content-type": "application/json",
        "Authorization": token
          }

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
