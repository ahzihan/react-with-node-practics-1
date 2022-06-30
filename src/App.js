import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ users, setUsers ] = useState( [] );

  useEffect( () => {
    fetch( 'http://localhost:5000/users' )
      .then( res => res.json() )
      .then( data => setUsers( data ) );
  }, [] );



  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log( name, email );

    //Post data to server

    fetch( 'http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( user ),
    } )
      .then( res => res.json() )
      .then( data => {
        const newUsers = [ ...users, data ];
        setUsers( newUsers );
        console.log( data );
      } );
  };


  return (
    <div className="App">
      <h1>My Own Data Loaded: {users.length}</h1>
      <br />
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='name' />
        <input type="email" name="email" id="" placeholder='Email' />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          users.map( user => <h6 key={user.id}>Name: {user.name} Email: {user.email}</h6> )
        }
      </div>
    </div>
  );
}

export default App;
