import React from 'react';
import {Box, TileCarusel} from 'components';
import {Grid, Cell} from 'radium-grid';
import TitleBackground from '../../components/TitleBackground/TitleBackground';
import {generateStaticImage} from '../../helpers/prefixes';

const json = require('./../../../static/Publishers.json');
const medias = json.medias;
const mediumArray = medias.filter(media => media.placementType === 'medium');
const smallArray = medias.filter(media => media.placementType === 'small');
const publishersArray = medias.filter(media => media.placementType === 'publisher');
const conversationArray = medias.filter(media => media.placementType === 'conversation');

function getDesktopMedias() {
  // desktop gap style
  const desktopGridStyle = {padding: '9px 9px 0 9px'};
  const desktopCellStyle = {margin: '0 0 9px 0'};
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
       |      |     |
       |   M  |  M  |
       -------------
       */}
      <Cell cellWidth="1"
            smallWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="9px">
          <Box
            cellWidth="1/2"
            smallWidth="1/1"
            ratio={2}
            click={() => {}}
            model={mediumArray[0]}
            displayDarknessOverlay={false}
          />
          <Box
            cellWidth="1/2"
            smallWidth="1/1"
            ratio={2}
            click={() => {}}
            model={mediumArray[1]}
            displayDarknessOverlay={false}
          />
        </Grid>
      </Cell>
      {/* ROW - 1
       -------------
       |      |     |
       |   M  |  M  |
       -------------
       */}
      <Cell cellWidth="1"
            smallWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="9px">
          <Box
            cellWidth="1/2"
            smallWidth="1/1"
            ratio={2}
            click={() => {}}
            model={mediumArray[2]}
            displayDarknessOverlay={false}
          />
          <Box
            cellWidth="1/2"
            smallWidth="1/1"
            ratio={2}
            click={() => {}}
            model={mediumArray[3]}
            displayDarknessOverlay={false}
          />
        </Grid>
      </Cell>
      {/* ROW - 3
       ----------------
       |   |   |   |   |
       | S | S | C | C |
       ----------------
       */}
      <Cell cellWidth="1"
            smallWidth="1/1"
            style={desktopCellStyle}>
        <Grid gutter="9px">
          <Box
            cellWidth="1/4"
            smallWidth="1/1"
            type="small"
            ratio={1}
            click={() => {}}
            model={smallArray[0]}
            displayDarknessOverlay={false}/>
          <Box
            cellWidth="1/4"
            smallWidth="1/1"
            type="small"
            ratio={1}
            click={() => {}}
            model={smallArray[1]}
            displayDarknessOverlay={false}/>
          <Box
            cellWidth="1/4"
            smallWidth="1/1"
            type="conversation"
            ratio={1}
            click={() => {}}
            model={conversationArray[0]}
            displayDarknessOverlay={false}/>
          <Box
            cellWidth="1/4"
            smallWidth="1/1"
            type="conversation"
            ratio={1}
            click={() => {}}
            model={conversationArray[1]}
            displayDarknessOverlay={false}/>
        </Grid>
      </Cell>
      {/* ROW - 4
       -------------
       |   |   |     |
       | C | S |  M  |
       -------------
       */}
      <Cell cellWidth="1"
            smallWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="9px">
          <Box
            cellWidth="1/4"
            xlargeWidth="1/4"
            smallWidth="1/1"
            type="conversation"
            ratio={1}
            paddingX={5}
            paddingRatio={0.5}
            click={() => {}}
            model={conversationArray[2]}
            displayDarknessOverlay={false}/>
          <Cell cellWidth="1/4" smallWidth="1/1" style={{ position: 'relative'}}>
              <TileCarusel timeToChange={3} showControls={false} style={{height: '100%'}}>
                <Box
                  style={{height: '100%'}}
                  cellWidth="1"
                  ratio={1}
                  type="publisher"
                  model={publishersArray[0]}
                />
                <Box
                  style={{height: '100%'}}
                  cellWidth="1"
                  ratio={1}
                  type="publisher"
                  model={publishersArray[1]}
                />
                <Box
                  style={{height: '100%'}}
                  cellWidth="1"
                  ratio={1}
                  type="publisher"
                  model={publishersArray[2]}
                />
                <Box
                  style={{height: '100%'}}
                  cellWidth="1"
                  ratio={1}
                  type="publisher"
                  model={publishersArray[3]}
                />
                <Box
                  style={{height: '100%'}}
                  cellWidth="1"
                  ratio={1}
                  type="publisher"
                  model={publishersArray[4]}
                />
                <Box
                  style={{height: '100%'}}
                  cellWidth="1"
                  ratio={1}
                  type="publisher"
                  model={publishersArray[5]}
                />
                <Box
                  style={{height: '100%'}}
                  cellWidth="1"
                  ratio={1}
                  type="publisher"
                  model={publishersArray[6]}
                />
              </TileCarusel>
          </Cell>
          <Box
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
      cellWidth="1/2"
      smallCellWidth="1/2"
      style={mobileGridStyle}>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
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
            model={mediumArray[2]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            cellWidth="1/1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            model={mediumArray[1]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" cellWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            type="conversation"
            cellWidth="1/1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            model={conversationArray[0]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" cellWidth="1/1" style={{margin: '0 0 6px 0', position: 'relative', paddingBottom: '100%'}}>
        <Grid gutter="0px">
          <TileCarusel timeToChange={3} showControls={false} style={{height: '100%'}}>
            <Box
              style={{height: '100%'}}
              cellWidth="1"
              ratio={1}
              type="publisher"
              model={publishersArray[0]}
            />
            <Box
              style={{height: '100%'}}
              cellWidth="1"
              ratio={1}
              type="publisher"
              model={publishersArray[1]}
            />
            <Box
              style={{height: '100%'}}
              cellWidth="1"
              ratio={1}
              type="publisher"
              model={publishersArray[2]}
            />
            <Box
              style={{height: '100%'}}
              cellWidth="1"
              ratio={1}
              type="publisher"
              model={publishersArray[3]}
            />
            <Box
              style={{height: '100%'}}
              cellWidth="1"
              ratio={1}
              type="publisher"
              model={publishersArray[4]}
            />
            <Box
              style={{height: '100%'}}
              cellWidth="1"
              ratio={1}
              type="publisher"
              model={publishersArray[5]}
            />
            <Box
              style={{height: '100%'}}
              cellWidth="1"
              ratio={1}
              type="publisher"
              model={publishersArray[6]}
            />
          </TileCarusel>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            model={mediumArray[3]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1/1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            model={smallArray[0]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            cellWidth="1/1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            model={smallArray[1]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="6px">
          <Box
            type="conversation"
            cellWidth="1/1"
            ratio={1}
            click={() => {}}
            displayDarknessOverlay={false}
            model={conversationArray[1]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            cellWidth="1/1"
            ratio={1}
            type="contactUsForm"
            subHeader={json.formMessage}
            click={() => {}}
            displayDarknessOverlay={false}
            />
        </Grid>
      </Cell>
    </Grid>
  );
}

const Publishers = () => {
  const styles = require('./Publishers.scss');
  const bg = generateStaticImage('publishers');
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
      {/* Mobile Publisher Layout  */}
      <div className={styles.sm}>
        <main className={styles.main}>
          {getMobileMedias()}
        </main>
      </div>
    </div>
  );
};

export default Publishers;
