import React, {useState} from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";

import { updateList2 } from "./redux/midarea/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  commonBlack: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  }
}));

function App({ complist, updateList2 }) {
  const classes = useStyles();

  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const [placeholderProps, setPlaceholderProps] = useState({});
  //drag start
  const onDragStart = (update)=>{
    console.log("hhhhh",update);
    //update.mode = 'SNAP';
    if (!update.destination) {
      //return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination ? update.destination.index : 0;
    const initialIndex = update.source.index;
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    	const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) * 10 + [...draggedDOM.parentNode.children] 
			.slice(0, destinationIndex)
			.reduce((total, curr) => {
				const style = curr.currentStyle || window.getComputedStyle(curr);
				const marginBottom = parseFloat(style.marginBottom);
				return total + curr.clientHeight + marginBottom;
			}, 0);
    
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft),
        initialIndex
      });
  }


  // Update Lists of Mid Area
  const onDragEnd = (result) => {
    console.log("found finally");
    setPlaceholderProps({});
    // let parentNode = document.getElementById('li-motion')
    // parentNode ? parentNode.style.display='none' : console.log('no elem');
    if (result.destination === null){
      return;
    }
    let element = result.draggableId.split("-")[0];

    const old_list = complist.midAreaLists;
    let source_index = old_list.findIndex(
      (x) => x.id === result.source.droppableId
    );
    if (source_index > -1) {
      let comp_list = old_list[source_index].comps;
      comp_list.splice(result.source.index, 1);
      old_list[source_index].comps = comp_list;
    }

    let dest_index = old_list.findIndex(
      (x) => x.id === result.destination.droppableId
    );

    if (dest_index > -1) {
      let dest_comp_list = old_list[dest_index].comps;
      dest_comp_list.splice(result.destination.index, 0, `${element}`);

      old_list[dest_index].comps = dest_comp_list;
    }
    for(let i =0; i<old_list.length;i++){
      updateList2(old_list[i].id, old_list)
    }
    
  };
  return (
    <div className="bg-gray-300 font-sans">
      <div className={classes.root}>
        <AppBar position="static" className={classes.commonBlack}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              JUSPAY MIT CHALLENGE
            </Typography>
            <Button color="inherit">
              <GitHubIcon
                onClick={() =>
                  (window.location.href =
                    "https://github.com/emmyari/juspay_challenge_mit")
                }
              />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="h-screen overflow-hidden flex flex-row pt-6">
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragStart} onDragStart={onDragStart}>
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            < Sidebar placeholderProps = {placeholderProps} / >

            <MidArea />
          </div>
          <div className="w-1/3 relative h-screen overflow-scroll flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    complist: state.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateList2: (id,list) => dispatch(updateList2(id,list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
