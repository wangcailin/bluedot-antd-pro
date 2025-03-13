import { Category, Upload } from '@/components/antd';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { queryTree } from './service';

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
      <ProForm.Item name="file_1" label="单个文件" help="PDF文件">
        <Upload.File accept=".pdf" />
      </ProForm.Item>
      <ProForm.Item name="file_2" label="多个文件" help="视频文件" rules={[{ required: true }]}>
        <Upload.File maxCount={3} accept="video/*" />
      </ProForm.Item>

      <ProForm.Item name="img_1" label="单张图片" help="图片比例: 410*410">
        <Upload.ImgCrop aspect={410 / 410} />
      </ProForm.Item>
      <ProForm.Item name="img_2" label="多张图片" help="图片比例: 410*410">
        <Upload.ImgCrop aspect={410 / 410} maxCount={6} />
      </ProForm.Item>
      <ProFormText width="md" name="title" label="标题" rules={[{ required: true }]} />
      <ProForm.Item name="tag_id" label="标签" rules={[{ required: true }]}>
        <Category queryTree={queryTree} num={1} />
      </ProForm.Item>
    </ModalForm>
  );
};
