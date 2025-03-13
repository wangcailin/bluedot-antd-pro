// import DragSort from '@/components/DragSortTable/DragSort';
import { DragSort } from '@/components/antd';
import { MenuOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import ModalForm from './components/ModalForm';

import { Popconfirm, message } from 'antd';
import { useState } from 'react';
import { addRule, getRule, queryRule, removeRule, updateRule, updateRules } from './service';

export default () => {
  //更新子组件的数据
  const [reloadDataTime, setReloadDataTime] = useState<any>();

  //定义拖动的颜色和形状
  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'blue' }} />
    </>
  );

  //表单的columns
  const columns: ProColumns[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      className: 'drag-visible',
    },
    {
      title: '详情',
      dataIndex: 'detail',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <ModalForm
          title="编辑"
          onFinish={async (values: any) => {
            await updateRule(record.id, values);
            message.success('更新成功');
            setReloadDataTime(Date.now());
            return true;
          }}
          request={() => getRule(record.id)}
          key="edit"
        >
          <a>编辑</a>
        </ModalForm>,
        <Popconfirm
          key="delete"
          title="删除数据"
          description="您确定要删除这行数据吗?"
          onConfirm={async () => {
            await removeRule(record.id);
            setReloadDataTime(Date.now());
            message.success('删除成功');
          }}
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <DragSort
        reloadDataTime={reloadDataTime}
        ModalForm={ModalForm}
        queryRule={queryRule}
        search={true}
        addRule={addRule}
        headerTitle="demo-dragger"
        pagination={false}
        rowKey="sort"
        columns={columns}
        updateRule={updateRules}
        dragHandleRender={dragHandleRender}
      />
    </>
  );
};
