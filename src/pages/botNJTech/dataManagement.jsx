import { useEffect, useState } from 'react';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import { Button, Space, message, Table, Select, Input } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const mapStateToProps = state => ({
  ...state.techModel,
});
let newPassword = ''

export default connect(mapStateToProps)(props => {
  const [status, setStatus] = useState('2');
  const [loadingTable, setloadingTable] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [tableHeight, setTableHeight] = useState('100px');
  const [editId, setEditId] = useState('');
  const [columns, setColumns] = useState([]);

  const watchStatus = {
    '0': '未开始',
    '1': '学习中',
    '2': '已完成',
    '3': '密码错误',
    '': null,
  };
  const allColumns = [
    {
      title: '用户账号',
      dataIndex: 'account',
    },
    {
      title: '用户密码',
      dataIndex: 'password',
      render: (text, record, index) => (
        <>
          {record.status === '3' ? (
            editId !== record._id ? (
              <Input.Password
                value={text}
                bordered={false}
                style={{ width: '80%' }}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            ) : (
              <Input
                defaultValue={text}
                bordered={false}
                allowClear
                onChange={e => {
                  newPassword = e.target.value;
                }}
                style={{ width: '80%' }}
                onPressEnter={() => {
                  editPassword(record);
                }}
              />
            )
          ) : (
            <Input.Password
              value={text}
              bordered={false}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          )}
          {record.status === '3' &&
            (editId !== record._id ? (
              <Button
                type="link"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  setEditId(record._id);
                  newPassword = text
                }}
              />
            ) : (
              <Button
                type="link"
                shape="circle"
                icon={<CheckOutlined />}
                onClick={() => {
                  editPassword(record);
                }}
              />
            ))}
        </>
      ),
    },
    {
      title: '设备名称',
      dataIndex: 'botName',
    },
    {
      title: '浏览器名称',
      dataIndex: 'browserKey',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record, index) => (
        <span>{watchStatus[text]}</span>
      )
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
    },
    {
      title: '操作',
      dataIndex: 'account',
      render: (text, record, index) => (
        <>
          {record.status === '3' && (
            <>
              <Button
                type="link"
                onClick={() => {
                  reImport(record);
                }}
              >
                重新导入
              </Button>
            </>
          )}
        </>
      ),
    },
  ];
  useEffect(() => {
    let newColumns = []
    switch (status) {
      case '0':
      case '2':
        newColumns = allColumns.filter(item => item.title !== '开始时间' && item.title !== '操作');
        break;
      case '3':
        newColumns = allColumns.filter(item => item.title !== '开始时间');
        break;

      default:
        newColumns = allColumns.filter(item => item.title !== '操作');
        break;
    }
    setColumns(newColumns)
  }, [status,editId])
  useMount(() => {
    const height = window.innerHeight - 64 - 62 - 100;
    setTableHeight(height);
    onSearch();
  });

  const reImport = row => {
    props
      .dispatch({
        type: 'techModel/updateStudents',
        payload: {
          status: '0',
          id: row._id,
          msg: '重新导入',
        },
      })
      .then(res => {
        message.success('导入成功');
        onSearch();
      });
  };
  const editPassword = row => {
    console.log(newPassword);
    props
      .dispatch({
        type: 'techModel/updateStudents',
        payload: {
          status: '3',
          id: row._id,
          password: newPassword,
        },
      })
      .then(res => {
        message.success('修改成功');
        onSearch();
      });
  };

  const onSearch = (value = status) => {
    setStatus(value);
    setloadingTable(true);
    let payload = {};
    if (value) {
      payload.status = value.trim();
    }
    props
      .dispatch({
        type: 'techModel/getStudents',
        payload,
      })
      .then(res => {
        if (res.state === 200) {
          setTableList(res.data);
          setEditId('');
          newPassword = ''
        }
      })
      .finally(_ => {
        setloadingTable(false);
      });
  };
  return (
    <>
      <div className="option_box">
        <Space>
          <Select
            defaultValue={status}
            style={{ width: 120 }}
            options={[
              { value: '1', label: '学习中' },
              { value: '2', label: '已完成' },
              { value: '0', label: '未开始' },
              { value: '3', label: '失败' },
            ]}
            onSelect={value => onSearch(value)}
          />
          <Button type="primary" onClick={() => onSearch()}>
            查询
          </Button>
          {/* <Button type="primary">新增</Button> */}
        </Space>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Table
          loading={loadingTable}
          rowKey="_id"
          bordered
          size={'small'}
          columns={columns}
          dataSource={tableList}
          pagination={{
            total: tableList.length,
            defaultPageSize: 50,
            showTotal: total => `共 ${total} 条`,
            showSizeChanger: true,
          }}
          scroll={{
            y: tableHeight,
          }}
        />
      </div>
    </>
  );
});
