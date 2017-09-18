import React, { Component } from 'react';
import { SearchBar, Button, Steps,WhiteSpace,Icon,Toast,List,Picker, NavBar } from 'antd-mobile';
import './Main.css';
import jsonp from 'jsonp';
const Step = Steps.Step;
class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
        currentPage: 0,
        extraValue:'请选择',
        data:[],
        com:'',
        no:'',
        district:[
          {
          label: "顺丰",
          value: "sf"
          },
          {
          label: "申通",
          value: "sto"
          },
          {
          label: "圆通",
          value: "yt"
          },
          {
          label: "韵达",
          value: "yd"
          },
          {
          label: "天天",
          value: "tt"
          },
          {
          label: "EMS",
          value: "ems"
          },
          {
          label: "中通",
          value: "zto"
          },
          {
          label: "汇通",
          value: "ht"
          },
          {
          label: "全峰",
          value: "qf"
          },
          {
          label: "德邦",
          value: "db"
          },
          {
          label: "国通",
          value: "gt"
          },
          {
          label: "如风达",
          value: "rfd"
          },
          {
          label: "京东快递",
          value: "jd"
          },
          {
          label: "宅急送",
          value: "zjs"
          },
          {
          label: "EMS国际",
          value: "emsg"
          },
          {
          label: "Fedex国际",
          value: "fedex"
          },
          {
          label: "邮政国内（挂号信）",
          value: "yzgn"
          },
          {
          label: "UPS国际快递",
          value: "ups"
          },
          {
          label: "中铁快运",
          value: "ztky"
          }

            ],
     };
  }
  componentDidMount(){
    this.setState({
      ...this
    })
  }
  onOkCompany(val){
    this.state.district.map((item)=>{
      if(item.value==val){
        this.setState({
          extraValue:item.label,
          com:val
        })
      }
    })
  }
  querry(value){
    const { com } = this.state;
    const that = this;
    this.setState({
        currentPage:1
    })
    Toast.loading('查询中...', 2,() => {
    jsonp('http://v.juhe.cn/exp/index?key=cbfa713232406535ac73599168c0a494&com='+com+'&no='+value, null, function (err, data) {
      if (err) {
      } else {
        console.log(data);
        that.setState({
            currentPage:2,
            data:data
        })
      }
    });
  });
  }
  renderdom(){
    const { data } =this.state;
    return   data.result.list.map((item)=>{
              return <div><span>{item.datetime}</span>&nbsp;<span className='spanWrap'>{item.remark}</span></div>
        })
  // return <div><span>10:50</span>&nbsp;<span>北京</span></div>
  }
  onOpenChange(){
      window.location.href="/";
  }
  render(){
    const { currentPage,district,extraValue,data } = this.state;
    const steps = [{
      title: '待命',
      description: '',
    }, {
      title: '查询中',
      description: '',
    }, {
      title: '完成',
      description: '',
    }].map((s, i) => <Step key={i} title={s.title} description={s.description} />);
    return(
      <div className='wrapDiv'>
          <NavBar iconName="left" onLeftClick={this.onOpenChange.bind(this)} className='my-NavBar'>快递查询</NavBar>
      <div>
      <WhiteSpace size="lg" />
      <List style={{ backgroundColor: 'white' }} className="picker-list">
        <Picker data={district} cols={1}  className="forss" onOk={this.onOkCompany.bind(this)}  extra={extraValue} title='选择相应的快递公司'>
          <List.Item arrow="horizontal">请选择快递公司</List.Item>
        </Picker>
      </List>
      </div>
      <header>
      <SearchBar placeholder="请输入快递单号" maxLength={20} onSubmit={this.querry.bind(this)}/>
      </header>
        <Steps current={currentPage} direction="horizontal">{steps}</Steps>
        <div className='adress'>{data.length!=0?this.renderdom():''}</div>
      <footer  className='footerTitle'>宗小白专属</footer>
      </div>
    )
  }
}
export default Main;
