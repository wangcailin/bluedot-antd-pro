import { Crypto } from '@/components/antd';
import { ModalForm } from '@ant-design/pro-components';
import { message } from 'antd';
import { bindMailRule } from '../../../service';
import BaseForm from './BaseForm';

export default ({ fetchUserInfo, ...props }: any) => {
  return (
    <ModalForm
      {...props}
      onFinish={async (value) => {
        const crypt = new Crypto();
        const crypt_key = crypt.rsa_key_encrypt();
        value.email = crypt.aes_encrypt(value.email);
        const result = await bindMailRule({ ...value, crypt_key });
        if (result.errcode == 0) {
          message.success('绑定成功');
          await fetchUserInfo();
          props?.onVisibleChange(false);
        } else {
          message.error(result.errmsg);
        }
      }}
    >
      <BaseForm action="bind" />
    </ModalForm>
  );
};
