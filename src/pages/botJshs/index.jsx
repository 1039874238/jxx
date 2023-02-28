import { useState } from 'react';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import { Button, Space, Upload,message,Table,Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const mapStateToProps = state => ({
  ...state.haishiModel,
});

export default connect(mapStateToProps)(props => {
  const [status, setStatus] = useState('1');
  const [loadingTable, setloadingTable] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [tableHeight, setTableHeight] = useState('100px');
  const watchStatus = {
    '0': '未开始',
    '1': '学习中',
    '2': '已完成',
    '3': '密码错误',
    '': null,
  };
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'idCard',
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
  ];
    const configProps = {
        name: 'students',
        accept:'.xlsx',
        showUploadList:false,
        action: 'api/jshs/uploadUserList',
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
      useMount(() => {
        const height = window.innerHeight - 64 - 62 - 100;
        setTableHeight(height);
        onSearch();
      });
      const onSearch = (value = status) => {
        setStatus(value);
        setloadingTable(true);
        let payload = {};
        console.log(value);
        if (value) {
          payload.status = value.trim();
        }
        props
          .dispatch({
            type: 'haishiModel/getUser',
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
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
    </>
  );
});
