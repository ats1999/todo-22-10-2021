
import React,{useState} from 'react';
import styled from 'styled-components';
import {Drawer,Divider,Grow} from '@material-ui/core'
import './Bacmenu.css';
import colors from './color';
import images1 from './Imageapi';
function Bacmenu({openbacmenu,setopenbacmenu,setbackgroundimage}){
  const [color,setcolor]=useState(false);
  const [image,setimage]=useState(false);
  return(<Container>
      <Drawer open={openbacmenu} anchor='right' onClose={()=>setopenbacmenu(false)}>
        <div className="drawer1">
          <div className="menu1">
            <div onClick={()=>{setimage(!image);setcolor(false)}} className="box1" style={{backgroundImage: 'url(https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'cover',}}>
            </div>
            <div onClick={()=>{setcolor(!color);setimage(false)}} className="box1" style={{backgroundImage: 'url(https://eskipaper.com/images/line-wallpaper-1.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'cover',}}>
            </div>
          </div>
          {image? <Grow in={image}>
          <div className="optioncontainer">
            {images1.map((image,index)=>{
              return <div onClick={()=>setbackgroundimage(image)} key={index} className="box1" style={{backgroundImage: 'url('+image+')',backgroundRepeat:'no-repeat',backgroundSize:'cover',}}>
              </div>
            })}
          </div>
          </Grow> : <Grow in={color}>
          <div className="optioncontainer">
            {colors.map((color,index)=>{
              return <div onClick={()=>setbackgroundimage(color)} key={index} className="box1" style={{backgroundColor: color}}>
              </div>
            })}
          </div>
          </Grow>}





        </div>
      </Drawer>
    </Container>)
}

export default Bacmenu;

const Container = styled.div`
`