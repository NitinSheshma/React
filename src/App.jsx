import logo from './logo.svg';
import './App.css';
import Student from './pages/examples/Student.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React Learning App</h1>
      </header>
      <main>
        <Student />
      </main>
    </div>
  );
}

export default App;
