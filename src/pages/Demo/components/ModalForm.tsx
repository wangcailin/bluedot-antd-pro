import { ModalForm, ProFormText, ProForm } from '@ant-design/pro-components';
import { Upload } from '@bluedot-tech/bluedot-antd';

export default (props) => {
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
      <ProForm.Item name="file_1" label="单个文件" help="PDF文件">
        <Upload.File accept=".pdf" />
      </ProForm.Item>
      <ProForm.Item name="file_2" label="多个文件" help="视频文件">
        <Upload.File maxLength={3} accept="video/*" />
      </ProForm.Item>

      <ProForm.Item name="img_1" label="单张图片" help="图片比例: 410*410">
        <Upload.ImgCrop aspect={410 / 410} />
      </ProForm.Item>
      <ProForm.Item name="img_2" label="多张图片" help="图片比例: 410*410">
        <Upload.ImgCrop aspect={410 / 410} maxLength={3} />
      </ProForm.Item>
      <ProFormText width="md" name="title" label="标题" rules={[{ required: true }]} />
    </ModalForm>
  );
};
