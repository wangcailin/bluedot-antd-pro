import { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-components';

export default (props: any) => {
  return (
    <ModalForm
      width="400px"
      trigger={props?.children}
      modalProps={{
        destroyOnClose: true,
      }}
      omitNil={false}
      {...props}
    >
      <ProFormText width="md" name="title" label="标题" rules={[{ required: true }]} />
      <ProFormDigit
        width="md"
        name="sort"
        label="排序"
        fieldProps={{
          precision: 0, // 设置精度为 0，只接受整数值
        }}
      />
      <ProFormText width="md" name="detail" label="详情" rules={[{ required: true }]} />
    </ModalForm>
  );
};
