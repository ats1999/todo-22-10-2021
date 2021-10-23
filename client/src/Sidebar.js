import React,{useContext} from 'react';
import styled from 'styled-components';
import SidebarRow from './SidebarRow';
import InboxIcon from '@material-ui/icons/Inbox';
import ListIcon from '@material-ui/icons/List';
import TodayIcon from '@material-ui/icons/Today';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from  'react-router-dom';
import {CredentialsContext} from './App';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
function Sidebar(){
  const [credentials] = useContext(CredentialsContext);
  let history = useHistory();
  return(<div>{credentials && <Container>
          <h3>Welcome {credentials && credentials.username }</h3>
          <Link style={{textDecoration:'none',color:'white'}} to="/inbox">
            <SidebarRow Icon={InboxIcon} title="Inbox"/>
          </Link>
          <Link style={{textDecoration:'none',color:'white'}} to="/today">
            <SidebarRow Icon={TodayIcon} title="Today"/>
          </Link>
          <Link style={{textDecoration:'none',color:'white'}} to="/completed">
            <SidebarRow Icon={DoneIcon} title="Completed"/>
          </Link>
          <Link style={{textDecoration:'none',color:'white'}} to="/notcompleted">
            <SidebarRow Icon={CloseIcon} title="Not Completed"/>
          </Link>
         
         
          <Link style={{textDecoration:'none',color:'white'}} to="/">
          <SidebarRow Icon={ExitToAppIcon} title="Logout"/>
          </Link>
          </Container>}
          {!credentials && history.push("/")}
          </div>
        )
}
export default Sidebar;
const Container = styled.div`
    flex: 0.2;
    position: fixed;
    width: 22%;
    height: 100vh;
    background-color: black;
    color:white;
    h3{
      padding: 10px;
      margin: 30px 12px;
      color: #eeebdd;
      padding-right: 0;
    }
`