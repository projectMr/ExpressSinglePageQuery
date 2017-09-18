import React, { Component } from 'react';
import { Toast ,Drawer, List, NavBar,Grid,Carousel,Icon} from 'antd-mobile';
import './Exclusive.css';
import {
  BrowserRouter as Router,
  Route,
  Link
}  from 'react-router-dom';
class Exclusive extends Component{

  state = {
      open: false,
      data: ['', '', ''],
      initialHeight: 200,
    }
    onOpenChange = (...args) => {
      this.setState({ open: !this.state.open });
    }
    render() {
      const sidebar = (<List>
           <List.Item><Link to='/Introduction' className='linkJump'>关于我</Link></List.Item>
    </List>);
      const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
      const data = [{
                   text:<Link to='/Main' className='linkJump'>快递速查</Link>,
                   icon:<Icon type="koubei"></Icon>
                    },
                    {
                     text:<Link to='/Movie' className='linkJump'>电影头条</Link>,
                     icon:<Icon type="koubei"></Icon>
                     },
                    {
                    text:'每日一笑',
                    icon:<Icon type="koubei"></Icon>
                    },
                    {
                    text:'自助服务',
                    icon:<Icon type="koubei"></Icon>
                    },
                ]
      return (
        <div>
        <NavBar iconName="ellipsis" onLeftClick={this.onOpenChange} className='my-NavBar'>欢迎</NavBar>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight - 200 }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
        <Carousel
         className="my-carousel"
         autoplay={true}
         infinite
         selectedIndex={1}
         swipeSpeed={35}    
       >
         {this.state.data.map(ii => (
           <a href="http://www.baidu.com" key={ii} style={hProp}>
             <img
               src={`https://zos.alipayobjects.com/rmsportal/${ii || 'QcWDkUhvYIVEcvtosxMF'}.png`}
               alt="icon"
               onLoad={() => {
                 window.dispatchEvent(new Event('resize'));
                 this.setState({
                   initialHeight: null,
                 });
               }}
             />
           </a>
         ))}
       </Carousel>
        <Grid data={data} isCarousel onClick={_el => console.log(_el)} />
        </Drawer>
      </div>);
    }
}
export default Exclusive;
