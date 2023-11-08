import { connect } from 'dva';
import React, { useRef, useState } from 'react';
import { useVirtualList, useMount } from 'ahooks';
import Style from './index.less'
import { Input, Space, Button, Spin } from 'antd'

const mapStateToProps = state => ({
  ...state.techModel,
});

export default connect(mapStateToProps)(props => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [logList, setLogList] = useState([])
  const [keyWord, setKeyWord] = useState('')
  const [loading, setLoading] = useState(false)

  useMount(() => {
    queryLog()
  })

  const [list] = useVirtualList(logList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 40,
    overscan: 10,
  });

  const queryLog = () => {
    setLoading(true)
    props.dispatch({
      type: 'techModel/queryLog',
    })
      .then(res => {
        filterLog(res.data)
      })
  }
  const filterLog = (data = logList) => {
    if (keyWord) {
      setLogList(data.filter(item => item.content.indexOf(keyWord) > -1))
    } else {
      setLogList(data)
    }
    setLoading(false)
  }
  return (
    <>
      <div style={{ paddingBottom: '12px' }}>
        <Space>
          <Input type="text" style={{ width: 120 }} value={keyWord} onChange={(e) => { setKeyWord(e.target.value) }} />
          <Button type="primary" onClick={queryLog}>查询</Button>
        </Space>
      </div>
      <div ref={containerRef} className={Style.logBox} >
        {
          loading && <Spin />
        }
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: 40,
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
              title={ele.data.content}
              key={ele.index}
            >
              {`${ele.data.logTime} ${ele.data.content}`}
            </div>
          ))}
        </div>
      </div>
    </>
  );
})
