import { useModel } from 'umi';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Upload } from '@bluedot-tech/bluedot-antd';
import { message } from 'antd';
import style from './index.less';
import { updatePersonalRule } from '../service';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const onFinish = async (values: any) => {
    await updatePersonalRule(values);

    await fetchUserInfo();
    message.success('修改成功', 3);
  };

  return (
    <ProCard title="基本设置" className={style.basic}>
      <div style={{ maxWidth: 440 }}>
        <ProForm
          onFinish={onFinish}
          initialValues={{
            nickname: initialState?.currentUser?.nickname,
            avatar: initialState?.currentUser?.avatar,
          }}
        >
          <ProForm.Item name="avatar" label="头像">
            <Upload.ImgCrop
              uploadProps={{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
                },
                action: `${API_URL_PREFIX}/backend/system/resource`,
              }}
              imgCropProps={{
                shape: 'round',
                aspect: 1,
              }}
            >
              上传头像
            </Upload.ImgCrop>
          </ProForm.Item>

          <ProFormText name="nickname" label="昵称" rules={[{ required: true }]} />
        </ProForm>
      </div>
    </ProCard>
  );
};
