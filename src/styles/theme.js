/* eslint-disable quotes */
const theme = {
   color: {
      main: '#ebb941',
      black: '#1b1b1b',
      white: '#f8fbfa',
   },
   shadow: {
      normal: '8px 8px 12px -12px rgba(97, 97, 97, 0.5)',
      left: '-6px 0px 10px -2px rgba(97, 97, 97, 0.3)',
   },
   mixins: {
      xs: '@media (max-width: 400px)',
      sm: '@media (max-width: 576px)',
      md: '@media (max-width: 768px)',
      lg: '@media (max-width: 992px)',
      xl: '@media (max-width: 1200px)',
      xxl: '@media (max-width: 1400px)',
   },
   fonts: {
      poppins: "'Poppins', sans-serif",
      nunito: "'Nunito', sans-serif",
   },
};

export default theme;
