import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserLayout from 'src/layouts/UserLayout';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import {SettingsConsumer, SettingsProvider} from 'src/@core/context/settingsContext';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/globals.css';
import navItems from 'src/navigation/vertical';
import React from 'react';

const App = () => {
  return (
    <Router>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            // @ts-ignore
            return (
              <ThemeComponent settings={settings}>
                <Routes>
                  {navItems().map((item, index) => {
                    if ('component' in item && item.component) {
                      const Component = item.component;

                      return (
                        <Route
                          key={index}
                          path={item.path}
                          element={
                            <UserLayout>
                              <Component />
                            </UserLayout>
                          }
                        />
                      )
                    }

                    return null;
                  })}
                </Routes>
              </ThemeComponent>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </Router>
  );
}

export default App;

