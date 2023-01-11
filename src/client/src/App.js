import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';

function App() {
  return (
    <div className="h-screen w-screen bg-neutral-900">
      <Header />
      <main>
        <Profile />
      </main>
      <MediaController />
    </div>
  );
}

export default App;
