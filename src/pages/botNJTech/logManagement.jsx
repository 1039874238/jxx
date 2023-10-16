import { connect } from 'dva';
import React, { useMemo, useRef, useState } from 'react';
import { useVirtualList, useMount } from 'ahooks';

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
    itemHeight: 60,
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
      <div ref={containerRef} style={{ height: '300px', overflow: 'auto', border: '1px solid' }}>
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: 52,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
})
