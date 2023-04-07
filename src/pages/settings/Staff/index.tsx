import { ProCard } from '@ant-design/pro-components';

import User from './User';
import Role from './Role';

export default () => {
  return (
    <>
      <ProCard
        tabs={{
          type: 'line',
        }}
      >
        <ProCard.TabPane key="user" tab="员工">
          <User />
        </ProCard.TabPane>
        <ProCard.TabPane key="rule" tab="部门">
          <Role />
        </ProCard.TabPane>
      </ProCard>
    </>
  );
};
