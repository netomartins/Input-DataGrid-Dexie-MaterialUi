import * as React from 'react';
import { Container, Box } from '@material-ui/core';
import Home from './pages/Home';

function App() {
  return (
    <>
    <Container maxWidth="lg">
      <Box sx={{ my: 12, height: '100vh'}}>

       
        <Home />
      
        
       
        
      </Box>
    </Container>
    </>
  );
}

export default App;
