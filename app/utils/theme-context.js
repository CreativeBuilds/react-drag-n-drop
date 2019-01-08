import React from 'react';

export const themes = {
  light: {
    main: '#5AA596',
    secondary: '#f1f1f1',
    secondaryText: '#333333',
    secondaryOff: '#d1d1d1',
    error: 'rgb(195, 40, 40)',
    errorText: '#f1f1f1'
  },
  dark: {
    main: '#5AA596',
    secondary: '#333333',
    secondaryText: '#f1f1f1',
    secondary: '#434343',
    error: 'rgb(195, 40, 40)',
    errorText: '#f1f1f1'
  }
};

export const ThemeContext = React.createContext(themes.light);
