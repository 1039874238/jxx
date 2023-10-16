import { connect } from 'dva';
import React, { useRef, useState } from 'react';
import { useVirtualList, useMount } from 'ahooks';
import Style from './index.less'

const mapStateToProps = state => ({
  ...state.techModel,
});

export default connect(mapStateToProps)(props => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [logList, setLogList] = useState([])

  useMount(() => {
    queryLog()
  })

  const [list] = useVirtualList(logList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 40,
    overscan: 10,
  });

  const queryLog = (keyWord = '') => {
    props.dispatch({
      type: 'techModel/queryLog',
    })
      .then(res => {
        setLogList(res.data)
      })
  }
  return (
    <>
      <div ref={containerRef} className={Style.logBox} style={{ height: '300px', overflow: 'auto', border: '1px solid' }}>
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
