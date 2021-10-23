import React,{useState} from 'react';
import styled from 'styled-components';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Bacmenu from './Bacmenu';

function Add(){
  const [openbacmenu,setopenbacmenu] = useState(false);
  const [backgroundimage,setbackgroundimage]=useState('#03256c');
  const open1 = ()=>{
    setopenbacmenu(true);
  }
  return(<Container style={{backgroundColor:backgroundimage,backgroundImage:`url(${backgroundimage})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
    <Content>
      <h3> Add TODO </h3>
      <ImageOutlinedIcon className="icon1" onClick={open1}/>
    </Content>
    <Bacmenu openbacmenu={openbacmenu} setopenbacmenu={setopenbacmenu} setbackgroundimage={setbackgroundimage}/>
    
    </Container>)
}


const Container = styled.div`
    flex:1;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
`
const Content = styled.div`
  flex: 0.8;
  justify-content:flex-end;
  padding: 40px 20px;
  padding-bottom: 0;
  margin-left:50px;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  height:96vh;
  h3{
    color: white;
    display: inline-block;
  }
  .icon1{
    color: white;
    cursor:pointer;
    &:hover{
      background:#000;
    }
  }
`

export default Add;