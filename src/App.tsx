import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import InputComponent from "./Components/Input";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <InputComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;
