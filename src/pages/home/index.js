/*
 * @Author: your name
 * @Date: 2021-03-27 21:08:09
 * @LastEditTime: 2022-07-01 17:04:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\src\pages\home\index.js
 */
import { connect } from 'dva'
import { useMount } from 'ahooks'
import { Input, Button, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import MemberModal from './memberModal'
const { Search } = Input;

const mapStateToProps = (state) => ({
    memberModel: state.memberModel,
})

export default connect(mapStateToProps)((props) => {
    const [tableList, setTableList] = useState([])
    const [tableHeight, setTableHeight] = useState('100px')
    const [memberVisible, setmemberVisible] = useState(false);
    const [modelConfig, setModelConfig] = useState({ title: '新增' })
    const positionEnum = {
        0: {
            description: '成员',
            color: 'purple'
        },
        1: {
            description: '长老',
            color: 'blue'
        },
        2: {
            description: '副首领',
            color: 'cyan'
        },
        3: {
            description: '首领',
            color: 'gold'
        },
    }

    const columns = [
        {
            title: '村庄名称',
            dataIndex: 'memberName',
        },
        {
            title: '村庄标签',
            dataIndex: 'memberTag',
        },
        {
            title: '职位',
            dataIndex: 'position',
            render: (text, record, index) => <Tag color={positionEnum[text].color}>{positionEnum[text].description}</Tag>
        },
        {
            title: '操作',
            dataIndex: '_id',
            render: (text, record, index) => <Button type="link" disabled={record.position === 3} onClick={() => openModal({ title: '修改', record })}>修改</Button>
        },
    ];

    useMount(() => {
        const height = window.innerHeight - 64 - 62 - 55
        setTableHeight(height)
        onSearch()

    })
    const onSearch = (value) => {
        let payload = {}
        if (value) {
            payload.memberName = value.trim()
        }
        props.dispatch({
            type: 'memberModel/getMember',
            payload
        }).then(res => {
            if (res.state === 200) {
                setTableList(res.data)
            }
        })
    }
    const openModal = (config) => {
        // 直接插入数据库
        // { "memberName": "大不列颠", "memberTag": "#234234234", "position": 3, "status": 0 }

        setModelConfig(config)
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
                        onSearch={onSearch}
                        style={{ width: '252px' }}
                    />
                    <Button type="primary" onClick={() => openModal({ title: '新增' })}>新增</Button>
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
                    config={modelConfig}
                    closeModal={closeModal}
                    onSearch={onSearch}
                />
            </>
        </>

    )
})