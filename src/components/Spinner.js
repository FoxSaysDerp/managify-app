import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Spinner = ({ size }) => {
   const icon = (
      <LoadingOutlined
         style={{ fontSize: size ? size : 56, color: '#ffb300' }}
         spin
      />
   );

   return <Spin indicator={icon} />;
};

export default Spinner;
