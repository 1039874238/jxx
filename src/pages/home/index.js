/*
 * @Author: your name
 * @Date: 2021-03-27 21:08:09
 * @LastEditTime: 2023-02-03 15:30:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\src\pages\home\index.js
 */
import { connect } from 'dva';
import { useMount } from 'ahooks';
import { Button, Space, Table, Select } from 'antd';
import { useState } from 'react';
import MemberModal from './memberModal';

const mapStateToProps = state => ({
  projectModel: state.projectModel,
});

export default connect(mapStateToProps)(props => {
  const [status, setStatus] = useState('1');
  const [tableList, setTableList] = useState([]);
  const [tableHeight, setTableHeight] = useState('100px');
  const [memberVisible, setmemberVisible] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
  const [modelConfig, setModelConfig] = useState({ title: '新增' });
  const watchStatus = {
    '0': '未开始',
    '1': '学习中',
    '2': '已完成',
    '3': '失败',
    '': null,
  };

  const columns = [
    {
      title: '用户',
      dataIndex: 'userInfo',
    },
    {
      title: '科目名称',
      dataIndex: 'courseName',
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

  useMount(() => {
    const height = window.innerHeight - 64 - 62 - 100;
    setTableHeight(height);
    onSearch();
  });
  const onSearch = (value = status) => {
    setStatus(value)
    setloadingTable(true);
    let payload = {};
    console.log(value);
    if (value) {
      payload.status = value.trim();
    }
    props
      .dispatch({
        type: 'projectModel/getProject',
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
  const openModal = config => {
    setModelConfig(config);
    setmemberVisible(true);
  };
  const closeModal = () => {
    setmemberVisible(false);
  };
  return (
    <>
      <div className="option_box">
        <Space>
          <Select
            value={status}
            style={{ width: 120 }}
            onSelect={onSearch}
            options={[
              { value: '1', label: '学习中' },
              { value: '2', label: '已完成' },
              { value: '0', label: '未开始' },
              { value: '3', label: '失败' },
            ]}
          />
          <Button type="primary" onClick={() => openModal({ title: '新增' })}>
            新增
          </Button>
          <Button type="primary" onClick={() => onSearch()}>
            刷新
          </Button>
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
      <>
        <MemberModal
          visible={memberVisible}
          config={modelConfig}
          closeModal={closeModal}
          onSearch={onSearch}
        />
      </>
    </>
  );
});
