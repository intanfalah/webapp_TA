import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import theme from './utils/theme';
import createEmotionCache from './utils/createEmotionCache';

import Header from './Page/Home/Header';
import Features from './Page/Home/Features';
import Footer from './Page/Home/Footer';
import WebMap from './Page/WebMap/Map';
import './App.css';

const clientSideEmotionCache = createEmotionCache();

function App() {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Features />
                </>
              }
            />
            <Route path="/webmap" element={<WebMap />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
