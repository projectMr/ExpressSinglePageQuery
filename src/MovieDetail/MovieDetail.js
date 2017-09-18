import React, { Component } from 'react';
import { NavBar ,WingBlank, Card,Toast,Flex} from 'antd-mobile';
import jsonp from 'jsonp';
import './MovieDetail.css'
class MovieDetail extends Component{
  constructor(props) {
    super(props);
     this.state={
      detail:'',
      title:'',
      imageUrl:'',
      directors:'',
      countries:'',
      genres:'',
      year:'',
      casts:'',
      alt:'',
     }
   }
   componentDidMount(){
     const that = this;
     let indexPag = window.location.href.lastIndexOf('/');
     let id = window.location.href.slice(indexPag+1);

      jsonp('http://api.douban.com/v2/movie/subject/'+id, null, function (err, data) {
       if (err) {
       } else {
         // 处理请求到的数据
        console.log("data",data);
        let stringCasts = [];
        data.casts.map((item)=>{
          stringCasts.push(item.name);
        })
        that.setState({
          detail:data.summary,
          title:data.title,
          imageUrl:data.images.small,
          directors:data.directors[0].name,
          countries:data.countries[0],
          genres:JSON.stringify(data.genres),
          year:data.year,
          casts:JSON.stringify(stringCasts),
          alt:data.alt
        })
       }
     });
   }

   onOpenChange(){
      window.location.href="/Movie";
   }
 render(){
   const { detail ,title,imageUrl,directors,countries,genres,year,casts,alt} =this.state;
   return(
     <div className='wrapDetail'>
       <NavBar iconName="left" onLeftClick={this.onOpenChange.bind(this)} className='my-NavBar'>{title}</NavBar>
       <div className='contant'>
         <Flex>
           <Flex.Item><img src={imageUrl}/>
           <div>
             <p>导演:{directors}</p>
             <p>国家:{countries}</p>
             <p>年份:{year}</p>
             <p>类型:{genres}</p>
             <p>主演:{casts}</p>
             <p>电影地址:{alt}</p>
           </div>
           </Flex.Item>
         </Flex>
         描述:{detail}
       </div>
     </div>
   )
 }
}
export default MovieDetail;
