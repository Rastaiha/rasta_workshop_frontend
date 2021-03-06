import {
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  SvgIcon,
} from '@material-ui/core';
import {
  Clear,
  Delete as DeleteIcon,
  Fullscreen,
  FullscreenExit,
  Gesture as GestureIcon,
  PanTool as PanToolIcon,
  Redo as RedoIcon,
  Save as SaveIcon,
  TextFields as TextFieldsIcon,
  Undo as UndoIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  addNewTextNode,
  changeMode,
  deselectNodes,
  redo,
  removeAllNodes,
  removeSelectedNodes,
  undo,
} from '../../redux/actions/whiteboard';
import downloadFromURL from '../../utils/downloadFromURL';
import DrawingModes from '../Konva/Drawing/DrawingModes';
import CircleMenu from './Components/CircleMenu';
import RectangleMenu from './Components/RectangleMenu';
import RemoveAllNodesDialog from './Components/RemoveAllNodesDialog';

const useStyles = makeStyles((theme) => ({
  whiteboardNavbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing(1),
    zIndex: 3,
    '& .MuiIconButton-root': {
      position: 'relative',
      pointerEvents: 'auto',
    },
  },
}));

function WhiteboardNavbar({
  drawingMode,
  addNewTextNode,
  changeMode,
  removeSelectedNodes,
  deselectNodes,
  removeAllNodes,
  undo,
  redo,
  getDataURL,
  handleClose,
  isFullScreen,
  setIsFullScreen,
}) {
  const classes = useStyles();
  const [openRemoveNodes, setOpenRemoveNodes] = useState(false);

  return (
    <Grid
      container
      justify="space-between"
      className={classes.whiteboardNavbar}>
      <Grid item>
        <IconButton onClick={handleClose}>
          <Clear />
        </IconButton>
        <Hidden smDown>
          <IconButton onClick={() => setIsFullScreen(!isFullScreen)}>
            {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </Hidden>
        <IconButton
          onClick={() => {
            downloadFromURL(getDataURL(), 'stage.png');
          }}>
          <SaveIcon />
        </IconButton>
        <IconButton onClick={() => setOpenRemoveNodes(true)}>
          <DeleteIcon />
        </IconButton>
        <RemoveAllNodesDialog
          open={openRemoveNodes}
          handleClose={() => setOpenRemoveNodes(false)}
          removeAllNodes={removeAllNodes}
        />
      </Grid>
      <Grid item>
        <IconButton
          color={drawingMode === DrawingModes.DELETE ? 'primary' : 'default'}
          onClick={() => {
            changeMode(DrawingModes.DELETE);
            removeSelectedNodes();
          }}>
          <SvgIcon>
            <path d="M 23.425781 6.695312 L 18.863281 2.132812 C 18.113281 1.40625 16.921875 1.40625 16.171875 2.132812 L 6.648438 11.652344 L 13.90625 18.90625 L 23.425781 9.386719 C 23.789062 9.027344 23.996094 8.535156 24 8.023438 C 23.996094 7.523438 23.789062 7.042969 23.425781 6.695312 Z M 23.425781 6.695312 " />
            <path d="M 17.710938 21.507812 L 11.367188 21.507812 L 13.269531 19.570312 L 6.015625 12.289062 L 3.171875 15.128906 C 2.445312 15.886719 2.445312 17.089844 3.171875 17.847656 L 6.800781 21.507812 L 0.453125 21.507812 C 0.203125 21.507812 0 21.710938 0 21.960938 C 0 22.210938 0.203125 22.414062 0.453125 22.414062 L 17.710938 22.414062 C 17.964844 22.414062 18.167969 22.210938 18.167969 21.960938 C 18.167969 21.710938 17.964844 21.507812 17.710938 21.507812 Z M 17.710938 21.507812 " />
          </SvgIcon>
        </IconButton>
        <IconButton onClick={redo}>
          <RedoIcon />
        </IconButton>
        <IconButton onClick={undo}>
          <UndoIcon />
        </IconButton>
        <IconButton
          color={drawingMode === DrawingModes.PAINTING ? 'primary' : 'default'}
          onClick={() => {
            deselectNodes();
            changeMode(DrawingModes.PAINTING);
          }}>
          <GestureIcon />
        </IconButton>
        <CircleMenu />
        <RectangleMenu />
        <IconButton
          onClick={() => {
            changeMode(DrawingModes.MOVE);
            addNewTextNode();
          }}>
          <TextFieldsIcon />
        </IconButton>
        <IconButton
          color={drawingMode === DrawingModes.MOVE ? 'primary' : 'default'}
          onClick={() => changeMode(DrawingModes.MOVE)}>
          <PanToolIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  drawingMode: state.whiteboard.present.mode,
  canUndo: state.whiteboard.past.length > 0,
  canRedo: state.whiteboard.future.length > 0,
});

export default connect(mapStateToProps, {
  addNewTextNode,
  changeMode,
  removeSelectedNodes,
  deselectNodes,
  removeAllNodes,
  undo,
  redo,
})(WhiteboardNavbar);
