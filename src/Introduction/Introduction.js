import React, { Component } from 'react';
import { NavBar ,WingBlank} from 'antd-mobile';
import './Introduction.css';
import {
  BrowserRouter as Router,
  Route,
  Link
}  from 'react-router-dom';
class Introduction extends Component{
  onOpenChange(){
      window.location.href="/";
  }
  render(){
    return(
      <div>
        <NavBar iconName="left" onLeftClick={this.onOpenChange.bind(this)} className='my-NavBar'>关于我</NavBar>
          <WingBlank className='titleCenter'>如果觉的不错，请动动你的小手指star下</WingBlank>
          <WingBlank className='titleCenter'>前端小菜鸟一枚</WingBlank>
          <WingBlank className='titleCenter'>想了解更多，请戳下面</WingBlank>
          <WingBlank className='titleCenter'><a href='http://www.zongliming.com' target="view_window">http://www.zongliming.com</a></WingBlank>
      </div>
    )
  }
}


export default Introduction;
