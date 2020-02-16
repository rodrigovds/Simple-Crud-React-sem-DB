import React, { Component } from 'react';
import './App.css';

class App extends Component {
constructor(props){
  super(props);
  this.state={
    title: 'Gerenciamento Cadastro Sem DB',
    act: 0,
    index: '',
    datas: []
  }
}
   componentDidMount(){
    this.refs.name.focus();
   }
   
   fSubmit = (e) =>{
     e.preventDefault();
     console.log('try');

     let datas = this.state.datas;
     let name = this.refs.name.value;
     let address = this.refs.address.value;

      if(this.state.act === 0){ //Novo cadastro
        let data = {
        name, address
        }
        datas.push(data);
        }else{                      //Alterando um registro
          let index = this.state.index;
          datas[index].name    = name;
          datas[index].address = address;
        }

    

     this.setState({
      datas: datas,
      act: 0
     });

     this.refs.myForm.reset();
     this.refs.name.focus();
    }

    fRemove = (i) => {
      let datas = this.state.datas;
      datas.splice(i,1);
      this.setState({
        datas: datas

      });

      this.refs.myForm.reset();
      this.refs.name.focus();

    }

    fEdit = (i) => {
      let data = this.state.datas[i];
      this.refs.name.value    = data.name;
      this.refs.address.value = data.address;

      this.setState({
        act:1,
        index: i
      });
      this.refs.name.focus();
    }
   render(){
        let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
          <form ref="myForm" className="myForm">
            <input type="text" ref="name" id="name" placeholder="Primeiro Nome" className="formField" />
            <input type="text" ref="address" id="address" placeholder="Endereço Completo" className="formField" />
            <button onClick={(e)=>this.fSubmit(e)} className="myButton">Inserir </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.address}
              <button onClick={()=>this.fRemove(i)} className="myListButton">Remove </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">Editar </button>
           </li>
          )}
        </pre>
       </div>
   );
  }
}

export default App;
