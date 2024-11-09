import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventListing from './Layout/EventListing';
import EventCreate from './Layout/EventCreate';
import EventDetail from './Layout/EventDetail';
import RegisteredEvents from "./Layout/RegisteredEvents";
import MyEvents from "./Layout/MyEvents";
import FormSing from "./Auther/FormSing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormSing />} />
        <Route path="/events" element={<EventListing />} />
        <Route path="/event/detail/:eventId" element={<EventDetail />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/event/create" element={<EventCreate />} />
        <Route path="/registered-events" element={<RegisteredEvents />} />
      </Routes>
    </Router>
  );
};

export default App;