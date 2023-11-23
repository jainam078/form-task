import { UserForm } from "./components/UserForm";
import UserTable from "./components/UserTable";
import { FormProvider } from "./contexts/FormContext";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";

function App() {
  return (
    <FormProvider>
      <UserProvider>
        <div className="max-w-7xl mx-auto py-4 px-3">
          <UserForm />
          <UserTable />
        </div>
      </UserProvider>
    </FormProvider>
  );
}

export default App;
