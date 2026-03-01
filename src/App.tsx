                                                                                                                                    import React from 'react';
                                                                                                                                    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
                                                                                                                                    import Header from './components/Header';
                                                                                                                                    import Dashboard from './pages/Dashboard';
                                                                                                                                    import Login from './pages/Login';

                                                                                                                                    const App = () => {
                                                                                                                                      return (
                                                                                                                                        <Router>
                                                                                                                                          <Header />
                                                                                                                                          <Routes>
                                                                                                                                            <Route path="/" element={<Index />} />
                                                                                                                                            <Route path="/login" element={<Login />} />
                                                                                                                                            <Route path="/dashboard" element={<Dashboard />} />
                                                                                                                                          </Routes>
                                                                                                                                        </Router>
                                                                                                                                      );
                                                                                                                                    };

                                                                                                                                    export default App;
                                                                                                                                    ```