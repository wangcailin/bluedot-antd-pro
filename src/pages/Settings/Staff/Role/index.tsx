import { useState, useRef } from 'react';
import { Button, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProTable } from '@ant-design/pro-components';

import Form from './components/Form';
import { queryRoleRule, addRoleRule, updateRoleRule, removeRoleRule } from '../service';

export default () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [row, setRow] = useState<any>();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (dom, record: any, index, action: any) => [
        <a
          onClick={() => {
            setUpdateModalVisible(true);
            setRow(record);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确定删除此项?"
          onConfirm={async () => {
            await removeRoleRule(record.id);
            action?.reload();
          }}
        >
          <a href="" style={{ color: 'red' }}>
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="部门设置"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => setModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        search={false}
        params={{
          include: 'permissions',
        }}
        request={queryRoleRule}
        columns={columns}
      />
      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value: any) => {
          await addRoleRule({ ...value });
          setModalVisible(false);
          actionRef?.current?.reload();
          return true;
        }}
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        width={300}
        title="新建部门"
      >
        <Form />
      </ModalForm>
      {row ? (
        <ModalForm
          initialValues={{
            name: row.name,
            permission: row?.permissions.map((item: any) => item.name) || [],
          }}
          onFinish={async (value: any) => {
            await updateRoleRule({ ...value, id: row.id });
            setUpdateModalVisible(false);
            setRow(undefined);
            actionRef?.current?.reload();
          }}
          id={row.id}
          visible={updateModalVisible}
          onVisibleChange={(state: any) => {
            if (!state) {
              setRow(undefined);
            }
            setUpdateModalVisible(state);
          }}
          width={300}
          title="修改部门"
        >
          <Form />
        </ModalForm>
      ) : null}
    </>
  );
};
