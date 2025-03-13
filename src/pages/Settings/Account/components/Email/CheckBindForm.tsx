import { Crypto } from '@/components/antd';
import { StepsForm } from '@ant-design/pro-components';
import { message } from 'antd';
import { bindMailRule, unbindMailRule } from '../../../service';
import BaseForm from './BaseForm';

export default ({ fetchUserInfo, email, ...props }: any) => {
  return (
    <StepsForm
      {...props}
      onFinish={async (value) => {
        const crypt = new Crypto();
        const crypt_key = crypt.rsa_key_encrypt();
        value.email = crypt.aes_encrypt(value.email);
        const result = await bindMailRule({
          ...value,
          crypt_key,
          action: 'bind',
        });
        if (result.errcode === 0) {
          message.success('更换成功');
          fetchUserInfo();
          props?.onVisibleChange(false);
          return Promise.resolve(true);
        }
      }}
    >
      <StepsForm.StepForm
        name="base"
        title="验证邮箱"
        onFinish={async (value) => {
          try {
            const result = await unbindMailRule({ code: value.code });
            if (result.errcode != 0) {
              message.error('验证失败');
              return false;
            }
            return true;
          } catch (error) {}
        }}
      >
        <BaseForm action="unbind" email={email} />
      </StepsForm.StepForm>
      <StepsForm.StepForm name="time" title="绑定邮箱">
        <BaseForm action="bind" />
      </StepsForm.StepForm>
    </StepsForm>
  );
};
