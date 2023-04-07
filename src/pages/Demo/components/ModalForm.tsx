import { ModalForm, ProFormText } from '@ant-design/pro-components';

export default (props) => {
  return (
    <ModalForm
      width="400px"
      trigger={props?.children}
      modalProps={{
        destroyOnClose: true,
      }}
      {...props}
    >
      <ProFormText width="md" name="title" label="标题" rules={[{ required: true }]} />
    </ModalForm>
  );
};
