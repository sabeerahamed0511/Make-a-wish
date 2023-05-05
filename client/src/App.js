import WishContext from './contexts/WishContext';
import AppRouter from './routers/AppRouter';
import './styles/App.css';
import "./styles/loginForm.css";
import "./styles/landingPage.css";
import "./styles/userLandingPage.css";
import "./styles/newEventForm.css";
import "./styles/eventCard.css";

function App() {
  return (
    <div className="App">
      <WishContext >
        <AppRouter />
      </WishContext>
    </div>
  );
}

export default App;
