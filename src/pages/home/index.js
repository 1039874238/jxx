/*
 * @Author: your name
 * @Date: 2021-03-27 21:08:09
 * @LastEditTime: 2022-06-26 14:55:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxx-app\umiApp\src\pages\home\index.js
 */
import { useState, useEffect, useCallback } from "react"
import { connect } from 'dva'
import * as dayjs from 'dayjs'
import {
    message, Button,
    Form,
    Input,
    Select,
    Empty,
    Card,
    Tag,
    Popconfirm
} from "antd"
import { UserOutlined } from '@ant-design/icons';

import Styles from './index.less'

const { TextArea } = Input;

const mapStateToProps = (state) => ({
    global: state.global,
    loginModel: state.loginModel,
})

export default connect(mapStateToProps)(({
    dispatch,
    loginModel: {
        loginUser
    }
}) => {
    const [page, setPage] = useState(1)
    const [userList, setUserList] = useState([])
    const [activeList, setActiveList] = useState([])

    useEffect(() => {
        getActive()
        getAllUser()
    }, [getActive, getAllUser])

    const onFormLayoutChange = (values) => {
        console.log(values);
    };

    const getAllUser = useCallback((params = null) => {
        dispatch({
            type: "loginModel/getAllUser",
        })
            .then(res => {
                setUserList(res.data)
            })
    })
    const getActive = useCallback((params = null) => {

        dispatch({
            type: 'global/getActive',
            payload: params
        })
            .then(res => {
                setActiveList(res.data.reverse())
            })

    })
    const deleteActive = useCallback((params = null) => {
        

        dispatch({
            type: 'global/deleteActive',
            payload: params
        })
            .then(res => {
                getActive()
            })

    })
    const startActive = useCallback((params = null) => {
        

        dispatch({
            type: 'global/startActive',
            payload: params
        })
            .then(res => {
                message.success(res.msg)
                getActive()
            })

    })

    const onFinish = (values) => {
        const params = {
            creater: JSON.parse(loginUser).userName,
            createTime: dayjs().valueOf(),
            ...values
        }
        dispatch({
            type: 'global/createActive',
            payload: params
        })
            .then(res => {
                message.success(res.msg)
                getActive()
                setPage(1)
            })

    }

    return (
        <>
            <div className={Styles.Box} style={{ textAlign: "center" }} >
                <div className={Styles.content}>
                    {page === 1 ?
                        (<div>{
                            activeList.length === 0 ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                <div style={{ textAlign: 'left' }}>{activeList.map(item => <Card title={item.activityName} extra={<Popconfirm
                                    title="确认删除该条活动?"
                                    onConfirm={()=>deleteActive({id:item._id})}
                                    okText="确认"
                                    disabled={JSON.parse(loginUser).userName!==item.creater}
                                    cancelText="取消"
                                  >
                                    <Button disabled={JSON.parse(loginUser).userName!==item.creater} type="link" >删除</Button>
                                  </Popconfirm>}>
                                    <p>活动奖品:{item.activityPrizes}</p>
                                    <p>活动人员:
                                    {item.activityStaff.map(item => <Tag icon={<UserOutlined />} color="#55acee">
                                        {item}
                                    </Tag>)}
                                    </p>
                                    <p>活动备注:{item.activityRemark}</p>
                                    <p>活动创建者:{item.creater}</p>
                                    {item.result?(
                                        <p>活动结果:
                                            {`恭喜${item.result}获得奖励！`}
                                         </p>  
                                    ):(
                                    <div>
                                        <Popconfirm
                                    title="确认开始抽签?"
                                    onConfirm={()=>startActive({id:item._id})}
                                    okText="确认"
                                    disabled={JSON.parse(loginUser).userName!==item.creater}
                                    cancelText="取消"
                                  >
                                        <Button disabled={JSON.parse(loginUser).userName!==item.creater} type="link">开始抽签</Button>
                                        </Popconfirm>
                                    </div>
                                    )}
                                </Card>)}</div>
                            )
                        }</div>)
                        : (
                            <div style={{ padding: '20px' }}>
                                <Form
                                    labelCol={{
                                        span: 4,
                                    }}
                                    wrapperCol={{
                                        span: 14,
                                    }}
                                    layout="horizontal"
                                    onValuesChange={onFormLayoutChange}
                                    onFinish={onFinish}
                                >
                                    <Form.Item label="活动名称" name="activityName" rules={[{ required: true, message: '请输入活动名称' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="活动奖品" name="activityPrizes" rules={[{ required: true, message: '请输入活动奖品' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="活动人员" name="activityStaff" rules={[{ required: true, message: '请选择活动人员' }]}>
                                        <Select mode="multiple">
                                            {userList && userList.map(item => <Select.Option value={item.userName}>{item.userName}</Select.Option>)}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="活动备注" name="activityRemark">
                                        <TextArea rows={4} />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit">提交</Button>
                                </Form>
                            </div>
                        )}
                </div>
                <div className={Styles.option_box}>
                    <Button style={{ width: '50vw' }} type="link" onClick={() => { setPage(1); getActive() }}>活动</Button>
                    <Button style={{ width: '50vw' }} type="link" onClick={() => setPage(2)}>新建</Button>
                </div>
            </div>
        </>

    )
})