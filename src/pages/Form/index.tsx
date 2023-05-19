import { ProForm } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import { Editor, Upload } from '@bluedot-tech/bluedot-antd';
import { getRule, updateRule } from './service';
export default () => {
  return (
    <Card>
      <ProForm
        request={() => getRule(1)}
        onFinish={async (values: any) => {
          await updateRule(1, values);
          message.success('保存成功');
          return;
        }}
      >
        <ProForm.Item name={['data', 'editor']} label="富文本">
          <Editor.Quill />
        </ProForm.Item>
        <ProForm.Group title="上传组件">
          <ProForm.Item
            name={['data', 'file_1']}
            label="单个文件"
            help="PDF文件"
            rules={[{ required: true }]}
          >
            <Upload.File accept=".pdf" />
          </ProForm.Item>
          <ProForm.Item name={['data', 'file_2']} label="多个文件" help="视频文件">
            <Upload.File maxCount={3} accept="video/*" />
          </ProForm.Item>

          <ProForm.Item
            name={['data', 'img_1']}
            label="单张图片"
            help="图片比例: 410*410"
            rules={[{ required: true }]}
          >
            <Upload.ImgCrop aspect={410 / 410} />
          </ProForm.Item>
          <ProForm.Item name={['data', 'img_2']} label="多张图片" help="图片比例: 410*410">
            <Upload.ImgCrop aspect={410 / 410} maxCount={6} />
          </ProForm.Item>
        </ProForm.Group>
      </ProForm>
    </Card>
  );
};
