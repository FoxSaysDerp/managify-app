import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import ConstructionIcon from '@mui/icons-material/Construction';

const Devtools = () => {
   const history = useHistory();

   return (
      <Button
         variant="contained"
         color="error"
         startIcon={<ConstructionIcon />}
         size="large"
         sx={{
            borderRadius: 36,
            position: 'fixed',
            left: '30px',
            bottom: '30px',
            zIndex: 99999,
         }}
         onClick={() => history.push('/dev')}
      >
         DevTools
      </Button>
   );
};

export default Devtools;
