import { createContext } from 'react';

export const DashboardContext = createContext({
   isDashboardMode: false,
   isMenuExpanded: true,
   expandMenu: () => {},
});
