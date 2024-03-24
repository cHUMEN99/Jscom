import React from 'react';
import Header from './components/Header';
import Users from './components/Users';
import AddUser from './components/AddUser';
import './css/main.css'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state={
      users:[
        {
          id: 1,
          firstname: 'Bob',
          lastname: 'chelen',
          bio: 'fljdsgfjkdshfgjkhds',
          age: 40,
          isHappy: false
        },
        {
          id: 2,
          firstname: 'ARsen',
          lastname: 'chelen',
          bio: 'fljdsgfjkdshfgjkhds',
          age: 19,
          isHappy: true
        }
      ],
      showAddUserForm: false,
      error: '',
      sortBy: '', 
      sortOrder: 'asc' 
    }
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.toggleAddUserForm = this.toggleAddUserForm.bind(this); 
    this.handleSort = this.handleSort.bind(this);
  }

  render() {
    return (
      <div>
        <div className='left-content'>
          <Header title="Список покупців" />
          <Header number="+ 380 96 560 18 45"/>
          
          <div className="logo">
            
          </div>
        </div>

        <main>
          <Users 
            users={this.state.users} 
            onDelete={this.deleteUser} 
            onEdit={this.editUser}
          />
          {this.state.showAddUserForm && <AddUser onAdd={this.addUser} error={this.state.error}/>} 
          
        </main>
        <aside>
          <button className='cnopca' onClick={this.toggleAddUserForm}>Показати/приховати форму добавлення</button> 
          <button className='cnopca' onClick={() => this.handleSort('firstname')}>Сортувати за ім'ям</button>
          <button  className='cnopca' onClick={() => this.handleSort('age')}>Сортувати за віком</button>
          <img src={require('./img/завантаження.png')} alt="Список покупців" />
            
        </aside>
      </div>
    );
  }

  toggleAddUserForm() {
    this.setState(prevState => ({
      showAddUserForm: !prevState.showAddUserForm, 
      error: '' 
    }));
  }

  deleteUser(id){
    this.setState({
      users: this.state.users.filter((el) => el.id !== id)
    });
  }

  editUser(user) {
    if (user && user.id) {
      const userIndex = this.state.users.findIndex(existingUser => existingUser.id === user.id);
      if (userIndex !== -1) {
        const updatedUsers = [...this.state.users];
        updatedUsers[userIndex] = user;
        this.setState({ users: updatedUsers });
      } else {
        console.error(`User with id ${user.id} does not exist in the list.`);
      }
    } else {
      console.error('Invalid user object provided.');
    }
  }

  addUser(user){
    const { firstname } = user;
    if (firstname.length < 2){
      this.setState({ error: "Ім'я повинно містити щонайменше 2 символи" });
      return;
    }
    const id = this.state.users.length + 1;
    this.setState(prevState => ({
      users: [...prevState.users, { id, ...user, age: parseInt(user.age, 10) }],
      error: ''
    }));
  }

  handleSort(field) {
    const { sortBy, sortOrder } = this.state;
    const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedUsers = [...this.state.users].sort((a, b) => {
      if (field === 'firstname' || field === 'lastname') {
        return a[field].localeCompare(b[field]);
      } else {
        return parseInt(a[field], 10) - parseInt(b[field], 10);
      }
    });

    this.setState({
      users: sortedUsers,
      sortBy: field,
      sortOrder: newSortOrder
    });
  }
}

export default App;
