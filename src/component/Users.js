import React , {useState , useEffect} from 'react'
import AppBar from './AppBarNav';

const Users = () => {
    const [data, setData] = useState([])
    const [online, setOnline] = useState(true)


useEffect(() => {
    let url = 'https://jsonplaceholder.typicode.com/users';

    fetch(url).then(resp => {
        resp.json().then(res => {
            console.log(res)
            setData(res);
            localStorage.setItem('users' , JSON.stringify(res))
        })
    })
    .catch(err => {
        setOnline(false);
        let users = localStorage.getItem('users')
        setData(JSON.parse(users))
    })


}, [])


    return (
        <div>
            <AppBar/>
            
            { online ?  null :  <div className="alert alert-warning" role="alert">You are in offline mode or connection problem...</div>  }

            <h1>Users</h1>

            <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Username</th>
    </tr>
  </thead>
  <tbody>

      {
          
         data && data.length > 0 ?  
         data.map((v ,i) => (
            <tr key={i}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.email}</td>
            <td>{v.username}</td>
          </tr>
          ))

          :

          "No user available"
      }


  </tbody>
</table>

        </div>
    )
}

export default Users
