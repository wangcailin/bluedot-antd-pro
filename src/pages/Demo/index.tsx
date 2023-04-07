import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { useRef } from 'react';
import { queryRule, addRule, updateRule, removeRule, getRule } from './service';
import ModalForm from './components/ModalForm';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'filter[title]',
      ellipsis: true,
      tip: '标题过长会自动收缩',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'filter[created_at]',
      valueType: 'dateTimeRange',
      hideInTable: true,
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
            actionRef?.current?.reload();
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
            message.success('删除成功');
            actionRef?.current?.reload();
          }}
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        request={queryRule}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <ModalForm
            title="新建"
            onFinish={async (values: any) => {
              await addRule(values);
              message.success('提交成功');
              actionRef?.current?.reload();
              return true;
            }}
            key="create"
          >
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </ModalForm>,
          <Button key="export" icon={<ExportOutlined />}>
            导出
          </Button>,
        ]}
      />
    </>
  );
};
