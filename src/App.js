import './App.css';
import Addemployee from './components/Addemployee';
import AddOwner from './components/Addowner';
import Employee from './components/Employee';
import Ownerpayment from './components/Ownerpayment';
import Visitors from './components/Visitors';

function App() {
  return (
    <div className="App">
      <Employee />
      <Ownerpayment />
      <Visitors />
      <Addemployee />
      <AddOwner />
    </div>
  );
}

export default App;

//  npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
// nodemon
// npm start