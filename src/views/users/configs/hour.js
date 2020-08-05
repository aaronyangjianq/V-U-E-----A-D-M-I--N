const baseColumn = {
    align: 'center',
  
  };
  let hour = [
    Object.assign({ 
        title: '用户ID',
        dataIndex: 'uid', 
      }, baseColumn),
      Object.assign({ 
        title: '用户名称',
        dataIndex: 'user_name', 
      }, baseColumn),
      Object.assign({ 
        title: '用户手机号',
        dataIndex: 'phone', 
      }, baseColumn),
      Object.assign({ 
        title: '累计打卡时长',
        dataIndex: 'total_time', 
      }, baseColumn),
      Object.assign({ 
        title: '操作',
        dataIndex: '', 
        scopedSlots: { customRender: 'action'}
      }, baseColumn)
  ];
  
  export {
    hour
  };