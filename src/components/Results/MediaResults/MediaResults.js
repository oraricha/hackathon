import React, {PropTypes} from 'react';
import {Box} from 'components';
import {Grid, Cell} from 'radium-grid';
import {Text} from 'rebass';

function getMobileMediaResults(tilesArray) {
  const mobileCellStyle = {margin: '0 0 6px 0', minWidth: '100%'};
  return (
    <Grid>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[0]}/>
          <Box
            cellWidth="2/3"
            ratio={1}
            fontStyle={{
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontWeight: '200!important',
              lineHeight: 1.2
            }}
            model={tilesArray[1]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            cellWidth="2/3"
            ratio={1}
            model={tilesArray[2]}/>
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              fontFamily: 'Lora',
            }}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[3]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[4]}/>
          <Box
            cellWidth="2/3"
            ratio={1}
            fontStyle={{
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontWeight: '200!important',
              lineHeight: 1.2
            }}
            model={tilesArray[5]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              fontFamily: 'Lora',
            }}
            model={tilesArray[6]}/>
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            model={tilesArray[7]}/>
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              fontFamily: 'Lora',
            }}
            model={tilesArray[8]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            cellWidth="2/3"
            ratio={1}
            model={tilesArray[9]}/>
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontWeight: '200!important',
              lineHeight: 1.2
            }}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[10]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              fontFamily: 'Lora',
            }}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[11]}/>
          <Box
            cellWidth="2/3"
            ratio={1}
            model={tilesArray[12]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            cellWidth="2/3"
            ratio={1}
            fontStyle={{
              fontFamily: 'Lora',
            }}
            model={tilesArray[13]}/>
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              fontFamily: 'Lora',
            }}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[14]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[15]}/>
          <Box
            cellWidth="2/3"
            ratio={1}
            model={tilesArray[16]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontWeight: '200!important',
              lineHeight: 1.2
            }}
            model={tilesArray[17]}/>
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            model={tilesArray[18]}/>
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              ontFamily: 'Lora',
            }}
            model={tilesArray[19]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            cellWidth="2/3"
            ratio={1}
            model={tilesArray[20]}/>
          <Box
            type="small"
            cellWidth="1/3"
            ratio={0.5}
            fontStyle={{
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontWeight: '200!important',
              lineHeight: 1.2
            }}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[21]}/>
        </Grid>
      </Cell>
    </Grid>
  );
}

function getDesktopMediaResults(tilesArray) {
  const desktopCellStyle = {margin: '5px 0 10px 0'};
  // desktop box style
  const boxRightPadding = {padding: '0 5px 0 0'};
  const boxMiddlePadding = {padding: '0 5px'};
  const boxLeftPadding = {padding: '0 0 0 5px'};
  return (
    <Grid gutter="0px">
      <Cell cellWidth="1/1">
        <Text style={{
          fontFamily: 'Lato',
          fontWeight: '800',
          fontSize: '18px',
          margin: '5px 5px'
        }} bold>{`Medias`}</Text>
        <Text style={{display: 'inline', opacity: 0.8, fontWeight: '100', fontSize: '15px', margin: '7px 3px'}}>{`(${tilesArray.length})`}</Text>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[0]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="2/3"
            smallWidth="1/1"
            ratio={2}
            model={tilesArray[1]}/>
        </Grid>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[2]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="2/3"
            smallWidth="1/1"
            ratio={2}
            model={tilesArray[3]}/>
        </Grid>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[4]}/>
          <Box
            style={boxMiddlePadding}
            cellWidth="1/3"
            smallWidth="1/1"
            ratio={1}
            paddingX={5}
            paddingRatio={1}
            model={tilesArray[5]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            ratio={1}
            model={tilesArray[6]}/>
        </Grid></Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="2/3"
            smallWidth="1/1"
            ratio={2}
            model={tilesArray[7]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[8]}/>
        </Grid>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[9]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="2/3"
            smallWidth="1/1"
            ratio={2}
            model={tilesArray[10]}/>
        </Grid>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[11]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="2/3"
            smallWidth="1/1"
            ratio={2}
            model={tilesArray[12]}/>
        </Grid>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[13]}/>
          <Box
            style={boxMiddlePadding}
            cellWidth="1/3"
            smallWidth="1/1"
            ratio={1}
            paddingX={5}
            paddingRatio={1}
            model={tilesArray[14]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            ratio={1}
            model={tilesArray[15]}/>
        </Grid>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            style={boxRightPadding}
            fontStyle={{
              fontFamily: 'Lora',
            }}
            cellWidth="2/3"
            smallWidth="1/1"
            type="small"
            ratio={2}
            model={tilesArray[16]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            ratio={1}
            model={tilesArray[17]}/>
        </Grid>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[18]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="2/3"
            smallWidth="1/1"
            ratio={2}
            model={tilesArray[19]}/>
        </Grid>
      </Cell>
      <Cell cellWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            style={boxRightPadding}
            cellWidth="1/3"
            smallWidth="1/1"
            type="small"
            ratio={1}
            model={tilesArray[20]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="2/3"
            smallWidth="1/1"
            ratio={2}
            model={tilesArray[21]}/>
        </Grid>
      </Cell>
    </Grid>
  );
}

const MediaResults = (props) => {
  const {tilesArray, forMobile} = props;
  const content = (forMobile) ? getMobileMediaResults(tilesArray) : getDesktopMediaResults(tilesArray);
  return content;
};

MediaResults.propTypes = {
  tilesArray: PropTypes.array.isRequired,
  forMobile: PropTypes.bool,
};

MediaResults.defaultProps = {
  tilesArray: [],
  forMobile: false,
};

export default MediaResults;
