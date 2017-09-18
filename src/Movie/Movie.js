import React, { Component } from 'react';
import { NavBar ,WingBlank, Card,Toast,NoticeBar} from 'antd-mobile';
import jsonp from 'jsonp';
import BScroll from 'better-scroll';
import './Movie.css';
import {
  BrowserRouter as Router,
  Route,
  Link
}  from 'react-router-dom';
class Movie extends Component{
  constructor(props) {
    super(props);
     this.state={
       showFlag:false,
       data:{},
     }
   }
    componentDidMount(){
      const that = this;
      jsonp('http://api.douban.com/v2/movie/in_theaters', null, function (err, data) {
        if (err) {
        } else {
          // 处理请求到的数据
          that.setState({
            data:data,
            showFlag:true
          })
        }
      });
      Toast.loading('查询中...', 2,()=>{
          let wrapper = document.querySelector('.cotainMovie');
          let scroll = new BScroll(wrapper,{
             click: true,
          });
          document.addEventListener('touchend',(pos)=>{
              console.log("scroll",scroll.y);
              if(scroll.y>=0&&scroll.y<300){
                Toast.success('上拉刷新...',1)
              }
             if(scroll.y<scroll.maxScrollY){
                 Toast.success('小笨喵，努力加载中...',3)
             }
          }, false);


      })
    }

  onOpenChange(){
      window.location.href="/";
  }

 onClick(value){
     const that = this;
       window.location.href="/MovieDetail/"+value.id;
 }
   render(){
     let {data } = this.state;
      let rendeDom;
      if(Object.keys(data).length!=0){
        rendeDom = data.subjects.map((item,index)=>{
            return <div key={index} onClick={this.onClick.bind(this,item)}>
              <Card>
                <Card.Header
                  title={item.title}
                  thumb={item.images.medium}
                  extra={<span>{item.year}</span>}
                />
         </Card>
            </div>
          })
     }
  return(
         <div className='wrapMovie'>
           <NavBar iconName="left" onLeftClick={this.onOpenChange.bind(this)} className='my-NavBar'>电影头条</NavBar>
             <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }} className='noticeBar'>
              注意:列表中的信息，为目前最热的20部影片，接口有次数限制，如果请求不到数据，请耐心等待一会 .
              </NoticeBar>
                        <div className='cotainMovie'>
                        <div className="content">
                         {this.state.showFlag?rendeDom:''}
                          <div className='heightfooter'></div>
                        </div>
                       </div>

         </div>
       )

   }
 }
export default Movie
