import { connect } from 'dva';
import React, { useRef, useState } from 'react';
import { useVirtualList, useMount } from 'ahooks';
import Style from './index.less'
import { Input, Space, Button } from 'antd'

const mapStateToProps = state => ({
  ...state.techModel,
});

export default connect(mapStateToProps)(props => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [logList, setLogList] = useState([])
  const [keyWord, setKeyWord] = useState('')

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
    props.dispatch({
      type: 'techModel/queryLog',
    })
      .then(res => {
        filterLog(res.data)
      })
  }
  const filterLog = (data = logList, value = keyWord) => {
    if (value) {
      setKeyWord(value)
      setLogList(data.filter(item => item.content.indexOf(value) > -1))
    } else {
      setLogList(data)
    }
  }
  return (
    <>
      <div>
        <Space>
          <Input type="text" style={{ width: 120 }} value={keyWord} onPressEnter={() => filterLog()} />
          <Button type="primary" onClick={queryLog}>查询</Button>
        </Space>
      </div>
      <div ref={containerRef} className={Style.logBox} >
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: 40,
                display: 'flex',
                alignItems: 'center',
              }}
              key={ele.index}
            >
              {ele.data.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
})
