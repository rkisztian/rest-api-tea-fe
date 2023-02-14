import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  teak: Tea[];
  newTeaTipus: string;
  newTeaIze: string;
  newTeaAra: number;
}

interface Tea {
  id: number;
  tipus: string;
  iz: string;
  ar: number;
}

class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      teak: [],
      newTeaTipus: '',
      newTeaIze: '',
      newTeaAra: 0,
    }
  }

  async loadTea() {
    let response = await fetch('http://localhost:3000/tea')
    let data = await response.json() as Tea[];
    this.setState({
      teak: data,
    })
  }

  componentDidMount() {
    this.loadTea();
  }

  teaDelete = async (id:number) => {
    await fetch('http://localhost:3000/tea/'+id, {method: 'DELETE'})
    this.loadTea();
  }

  newTea = async () => {
    const { newTeaTipus, newTeaIze, newTeaAra} = this.state;

    const adat = {
      tipus: newTeaTipus,
      iz: newTeaIze,
      ar: newTeaAra,
    }

    let response = await fetch('http://localhost:3000/tea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat)
    });

    this.setState({
      newTeaTipus: '',
      newTeaIze: '',
      newTeaAra: 0,
    })

    await this.loadTea();
  }


  
  render(){
    const { newTeaTipus, newTeaIze, newTeaAra} = this.state;
    return <div className='container'>
      <div className='row'>
          <div className='col-lg-4'>
            Tea Tipusa:<input type='text' value={newTeaTipus} onChange={e => this.setState({ newTeaTipus: e.currentTarget.value})}/><br/>
          </div>
          <div className='col-lg-4'>
            Tea íze:<input type='text' value={newTeaIze} onChange={e => this.setState({ newTeaIze: e.currentTarget.value})}/><br/>
          </div>
          <div className='col-lg-4'>
            Tea ára:<input type='number' value={newTeaAra} onChange={e =>  this.setState({newTeaAra: parseInt(e.currentTarget.value)})}/><br/>
          </div>
      </div>
      <button onClick={this.newTea} className='btn btn-primary'>Tea felvétele</button>

      <br/>
      <div className='container'>
        <h2>Teák listája</h2>
        <table>
        <div>{this.state.teak.map(teak =><tbody><tr><td><th>Típus</th> {teak.tipus}</td> <td><th>Íz</th> {teak.iz}</td> <td><th>Ár</th> {teak.ar}</td></tr> 
        <button onClick={(event) => this.teaDelete(teak.id)} className='btn btn-danger'>Törlés</button> <hr /> </tbody>)}</div>
        </table>
      </div>
    </div>
    
  
      
    
    
  }
}

export default App;
