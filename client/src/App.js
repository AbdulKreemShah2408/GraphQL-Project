import { useQuery, gql } from "@apollo/client";

const GET_TODES_WITH_USER = gql`
  query GetTodesWithUser {
    getTodes {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_TODES_WITH_USER);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  if (!data || !data.getTodes || data.getTodes.length === 0)
    return <h1>No data found</h1>;

  return (
    <div className="App">
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodes.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user ? todo.user.name : "No user"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
