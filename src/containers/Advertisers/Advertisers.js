import React from 'react';
import {Box} from 'components'; // eslint-disable-line
import {Grid, Cell} from 'radium-grid';
import TitleBackground from '../../components/TitleBackground/TitleBackground';
import {generateStaticImage} from '../../helpers/prefixes';

const json = require('./../../../static/Advertisers.json');
const medias = json.medias;
const mediumArray = medias.filter(media => media.placementType === 'medium');
const smallArray = medias.filter(media => media.placementType === 'small');
const conversationArray = medias.filter(media => media.placementType === 'conversation');

function getDesktopMedias() {
  // desktop gap style
  const desktopGridStyle = {padding: '9px 9px 0 9px'};
  const desktopCellStyle = {margin: '0 0 9px 0'};
  // desktop box style
  const boxRightPadding = {paddingRight: '3px'};
  const boxMiddlePadding = {padding: '0 6px'};
  const boxLeftPadding = {paddingLeft: '3px'};
  const breakpoints = {
    small: '@media only screen and (max-width: 600px)',
    medium: '@media only screen and (min-width: 600px) and (max-width:'
    + ' 960px)',
    large: '@media only screen and (min-width: 960px) and (max-width:'
    + ' 1600px)',
    xlarge: '@media only screen and (min-width: 1600px)'
  };
  return (
    <Grid
      breakpoints={breakpoints}
      gutter="0px"
      cellWidth="1/1"
      style={desktopGridStyle}>
      {/* ROW - 0
       -------------
       |   |     |   |
       | C |  M  | C |
       -------------
       */}
       <Cell cellWidth="1"
            smallWidth="1/1"
            style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            style={boxRightPadding}
            cellWidth="1/4"
            smallWidth="1/1"
            type="conversation"
            ratio={1}
            click={() => {}}
            model={conversationArray[0]}
            displayDarknessOverlay={false}/>
          <Box
            style={boxMiddlePadding}
            fontStyle={{
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontWeight: '200!important'
            }}
            cellWidth="1/2"
            smallWidth="1/1"
            ratio={2}
            paddingX={6}
            paddingRatio={0.5}
            click={() => {}}
            model={mediumArray[0]}
            displayDarknessOverlay={false}/>
          <Box
            style={boxLeftPadding}
            fontStyle={{
              fontFamily: 'Lora',
            }}
            cellWidth="1/4"
            type="conversation"
            smallWidth="1/1"
            ratio={1}
            click={() => {}}
            model={conversationArray[1]}
            displayDarknessOverlay={false}/>
        </Grid>
      </Cell>
      {/* ROW - 1
       -------------
       |   |   |     |
       | S | C |  M  |
       -------------
       */}
        <Cell cellWidth="1"
            smallWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            style={boxRightPadding}
            cellWidth="1/4"
            xlargeWidth="1/4"
            smallWidth="1/1"
            type="small"
            ratio={1}
            paddingX={5}
            paddingRatio={0.5}
            click={() => {}}
            model={smallArray[0]}
            displayDarknessOverlay={false}/>
          <Box
            style={boxMiddlePadding}
            cellWidth="1/4"
            smallWidth="1/1"
            ratio={1}
            paddingX={6}
            paddingRatio={2}
            click={() => {}}
            displayDarknessOverlay={false}
            type="conversation"
            model={conversationArray[2]}/>
          <Box
            style={boxLeftPadding}
            cellWidth="1/2"
            smallWidth="1/1"
            ratio={2}
            click={() => {}}
            type="contactUsForm"
            subHeader={json.formMessage}
            displayDarknessOverlay={false}
          />
        </Grid>
      </Cell>
       </Grid>
  );
}

function getMobileMedias() {
  // mobile gap style
  const mobileGridStyle = {padding: '10px 0'};
  const mobileCellStyle = {margin: '0 0 6px 0'};
  return (
    <Grid
      gutter="6px"
      cellWidth="1/1"
      smallCellWidth="1/1"
      style={mobileGridStyle}>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            type="conversation"
            model={conversationArray[0]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            model={mediumArray[0]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            type="conversation"
            model={conversationArray[1]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            model={smallArray[0]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            type="conversation"
            model={conversationArray[2]}
            />
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1/1"
            smallWidth="1/1"
            ratio={1}
            click={() => {}}
            type="contactUsForm"
            subHeader={json.formMessage}
            displayDarknessOverlay={false}/>
        </Grid></Cell>
    </Grid>
  );
}

const Advertisers = () => {
  const styles = require('./Advertisers.scss');
  const bg = generateStaticImage('advertisers');
  return (
    <div>
      <TitleBackground title={json.title} image={bg}/>
      <div className={styles.lg} style={{
        maxWidth: '1600px',
        margin: 'auto' }}>
        <main className={styles.main}>
          {getDesktopMedias()}
        </main>
      </div>
      {/* Mobile Advertisers Layout  */}
      <div className={styles.sm}>
        <main className={styles.main}>
          {getMobileMedias()}
        </main>
      </div>
    </div>
  );
};

export default Advertisers;
