/*
 * @Author: your name
 * @Date: 2021-03-27 21:08:09
 * @LastEditTime: 2022-06-30 17:25:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\src\pages\home\index.js
 */
import { connect } from 'dva'
import { useMount } from 'ahooks'
import { Input, Button, Space, Table } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useState } from 'react';
import MemberModal from './memberModal'
const { Search } = Input;

const mapStateToProps = (state) => ({
    global: state.global,
    loginModel: state.loginModel,
})
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
const columns = [
    {
        title: '村庄名称',
        dataIndex: 'name',
    },
    {
        title: '村庄标签',
        dataIndex: 'age',
    },
    {
        title: '职位',
        dataIndex: 'address',
    },
    {
        title: '操作',
        dataIndex: 'address',
        render: (text, record, index) => <Button type="link">修改</Button>
    },
];

export default connect(mapStateToProps)(({
    dispatch,
    loginModel: {
        loginUser
    }
}) => {
    const [tableList, setTableList] = useState([])
    const [tableHeight, setTableHeight] = useState('100px')
    const [memberVisible, setmemberVisible] = useState(false);

    useMount(() => {
        const height = window.innerHeight - 64 - 62 - 55
        setTableHeight(height)
        const data = []
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`,
            });
        }
        setTableList(data)

    })
    const onSearch = (value) => {
        console.log(value)
    }
    const openModal = () => {
        setmemberVisible(true);
    };
    const closeModal = () => {
        setmemberVisible(false);
    };
    return (

        <>
            <div className='option_box'>
                <Space>
                    <Search
                        placeholder="请输入村庄名称"
                        enterButton="查询"
                        suffix={suffix}
                        onSearch={onSearch}
                        style={{ width: '252px' }}
                    />
                    <Button type="primary" onClick={openModal}>新增</Button>
                </Space>
            </div>
            <div style={{ paddingTop: '10px' }}>
                <Table
                    bordered
                    size={'small'}
                    columns={columns}
                    dataSource={tableList}
                    pagination={false}
                    scroll={{
                        y: tableHeight,
                    }}
                />
            </div>
            <>
                <MemberModal
                    visible={memberVisible}
                    closeModal={closeModal}
                />
            </>
        </>

    )
})