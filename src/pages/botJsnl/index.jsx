import { useState } from 'react';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import { Button, Space, Upload,message,Table,Select,Drawer ,Input } from 'antd';
import { UploadOutlined,EyeInvisibleOutlined, EyeTwoTone,EditOutlined,CheckOutlined } from '@ant-design/icons';

const mapStateToProps = state => ({
  ...state.jsnlModel,
});

export default connect(mapStateToProps)(props => {
  const [status, setStatus] = useState('2');
  const [loadingTable, setloadingTable] = useState(false);
  const [detailVisible, setdetailVisible] = useState(false);
  const [detailList, setdetailList] = useState([]);
  const [detailLoading, setdetailLoading] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [tableHeight, setTableHeight] = useState('100px');
  const [editId, setEditId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const reImport = row => {
    props
      .dispatch({
        type: 'jsnlModel/updateUser',
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
        type: 'jsnlModel/updateUser',
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
  const watchStatus = {
    '0': '未开始',
    '1': '学习中',
    '2': '已完成',
    '3': '密码错误',
    '': null,
  };
  const columns = [
    {
      title: '用户账号',
      dataIndex: 'idCard',
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
                  setNewPassword(e.target.value);
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
                  setNewPassword(text);
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
      title: '状态',
      dataIndex: 'status',
      render: (text, record, index) => watchStatus[text],
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
    {
      title: '操作',
      dataIndex: 'idCard',
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
          {record.status !== '3' && (
            <Button
              type="link"
              onClick={() => {
                openDetail(text);
              }}
            >
              详情
            </Button>
          )}
        </>
      ),
    },
  ];
  const detailColumns = [
    {
      title: '课程名称',
      dataIndex: 'projectName',
    },
    {
      title: '学习时间',
      dataIndex: 'needTime',
      render: (text, record, index) => `${Math.ceil(Number(text))}小时`,
      width:100

    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record, index) => watchStatus[text],
      width:80
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
  ];
    const configProps = {
        name: 'students',
        accept:'.xlsx',
        showUploadList:false,
        action: 'autoLearnApi/jsnl/uploadUserList',
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            if(status==='0'){
              onSearch('0')
            }
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
          }
        },
      };
      useMount(() => {
        const height = window.innerHeight - 64 - 62 - 100;
        setTableHeight(height);
        onSearch();
      });
      const openDetail = (studentId) =>{
        setdetailVisible(true)
        setdetailLoading(true)
        props.dispatch({
          type:'jsnlModel/getProject',
          payload:{
            studentId
          }
        })
        .then(res=>{
          setdetailList(res.data)
          setdetailLoading(false)
        })
      }
      const onSearch = (value = status) => {
        setStatus(value);
        setloadingTable(true);
        let payload = {};
        if (value) {
          payload.status = value.trim();
        }
        props
          .dispatch({
            type: 'jsnlModel/getUser',
            payload,
          })
          .then(res => {
            if (res.state === 200) {
              setTableList(res.data);
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
            onSelect={(value) => onSearch(value)}
          />
          <Button type="primary" onClick={() => onSearch()}>查询</Button>
          <Upload {...configProps}>
            <Button icon={<UploadOutlined />}>导入</Button>
          </Upload>
          {/* <Button type="primary">新增</Button> */}
        </Space>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Table
          loading={loadingTable}
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
      <Drawer title="详情" open={detailVisible} onClose={()=>setdetailVisible(false)} width="900">
      <Table
          loading={detailLoading}
          bordered
          size={'small'}
          columns={detailColumns}
          dataSource={detailList}
          pagination={false}
          scroll={{
            y: tableHeight+20,
          }}
        />
      </Drawer>
    </>
  );
});
