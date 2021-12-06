import './App.css';
import ClockPanel from './components/ClockPanel';

export default function App() {
  const form = {
    id: '',
    city: '',
    timezone: '',
  };
  const array = [{ ...form }];
  return (
    <div className="App">
      <ClockPanel className="ClockPanel" initArray={array} initForm={form} />
    </div>
  );
}
