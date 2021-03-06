import React from 'react';
import {Box, TileCarusel} from 'components'; // eslint-disable-line
import {Grid, Cell} from 'radium-grid';

const json = require('./../../../static/About.json');
const medias = json.medias;
const featuredArray = medias.filter(media => media.placementType === 'jambo');
const mediumArray = medias.filter(media => media.placementType === 'medium');
const smallArray = medias.filter(media => media.placementType === 'small');
const publishersArray = medias.filter(media => media.placementType === 'publisher');
const conversationArray = medias.filter(media => media.placementType === 'conversation');

function getDesktopMedias() {
  // desktop gap style
  const desktopGridStyle = {padding: '9px 9px 0 9px'};
  const desktopCellStyle = {margin: '0 0 9px 0'};
  // desktop box style
  const boxRightPadding = {paddingRight: '4px'};
  const boxLeftPadding = {paddingLeft: '4px'};
  const breakpoints = {
    small: '@media only screen and (max-width: 600px)',
    medium: '@media only screen and (min-width: 600px) and (max-width:'
    + ' 960px)',
    large: '@media only screen and (min-width: 960px) and (max-width:'
    + ' 1600px)',
    xlarge: '@media only screen and (min-width: 1600px)'
  };
  //
  return (
    <Grid
      breakpoints={breakpoints}
      gutter="0px"
      cellWidth="1/1"
      style={desktopGridStyle}>
      {/* ROW - 0
       ---------------
       |       |   M   |
       |   L   |_______|
       |       |   |   |
       |       | S | C |
       ---------------
       */}
      <Cell style={desktopCellStyle}>
        <Grid
          gutter="8px"
          cellWidth="1/2">
          <Cell style={{ position: 'relative', overflow: 'hidden'}}
                smallWidth="1/1">
            <Grid gutter="0px" style={{height: '100%'}}>
              <Box
                style={{height: '100%'}}
                cellWidth="1"
                ratio={1}
                type="featured"
                click={() => {}}
                model={featuredArray[0]}
                displayDarknessOverlay={false}
              />
            </Grid>
          </Cell>
          <Cell smallWidth="1/1" style={{paddingLeft: '1px'}}>
            <Grid gutter="0px">
              <Cell cellWidth="1"
                    smallWidth="1/1">
                <Grid gutter="0px">
                  <Box
                    fontStyle={{fontFamily: 'Lora'}}
                    cellWidth="1"
                    smallWidth="1/1"
                    ratio={2}
                    click={() => {}}
                    model={mediumArray[0]}
                    displayDarknessOverlay={false}
                  />
                </Grid>
              </Cell>
              <Cell cellWidth="1"
                    smallWidth="1/1" style={{margin: '9px 0 0 0'}}>
                <Grid gutter="9px">
                  <Box
                    cellWidth="1/2"
                    smallWidth="1/1"
                    ratio={1}
                    type="small"
                    click={() => {}}
                    model={smallArray[0]}
                    displayDarknessOverlay={false}/>
                  <Box
                    cellWidth="1/2"
                    smallWidth="1/1"
                    ratio={1}
                    type="conversation"
                    click={() => {}}
                    model={conversationArray[0]}
                    displayDarknessOverlay={false}
                  />
                </Grid>
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </Cell>
      {/* ROW - 1
       ---------------
       | S | T |       |
       |___|___|   L   |
       |       |       |
       |   M   |       |
       ---------------
       */}
      <Cell style={desktopCellStyle}>
        <Grid
          gutter="8px"
          cellWidth="1/2">
          <Cell smallWidth="1/1" style={{paddingLeft: '1px'}}>
            <Grid gutter="0px">
              <Cell cellWidth="1"
                    smallWidth="1/1">
                <Grid gutter="9px">
                  <Cell cellWidth="1/2" smallWidth="1/1">
                    <Grid gutter="0px">
                      <Box
                        cellWidth="1/1"
                        smallWidth="1/1"
                        ratio={1}
                        type="small"
                        click={() => {}}
                        model={smallArray[1]}
                        displayDarknessOverlay={false}
                      />
                    </Grid>
                  </Cell>
                  <Cell cellWidth="1/2" smallWidth="1/1" style={{position: 'relative'}}>
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
                </Grid>
              </Cell>
              <Cell cellWidth="1"
                    smallWidth="1/1" style={{margin: '9px 0 0 0'}}>
                <Grid gutter="0px" style={{height: '100%'}}>
                  <Box
                    fontStyle={{fontFamily: 'Lora'}}
                    cellWidth="1"
                    smallWidth="1/1"
                    ratio={2}
                    click={() => {}}
                    type="contacts"
                    displayDarknessOverlay={false}
                  />
                </Grid>
              </Cell>
            </Grid>
          </Cell>
          <Cell style={{ position: 'relative', overflow: 'hidden'}}
                smallWidth="1/1">
            <Grid gutter="0px" style={{height: '100%'}}>
              <Box
                style={{height: '100%'}}
                cellWidth="1"
                ratio={1}
                type="featured"
                click={() => {}}
                model={featuredArray[1]}
                displayDarknessOverlay={false}
              />
            </Grid>
          </Cell>
        </Grid>
      </Cell>
      {/* ROW - 2
       -------------
       |      |     |
       |   M  |  M  |
       -------------
       */}
      <Cell cellWidth="1"
            smallWidth="1/1" style={desktopCellStyle}>
        <Grid gutter="0px">
          <Box
            style={boxRightPadding}
            cellWidth="1/2"
            smallWidth="1/1"
            ratio={2}
            click={() => {}}
            model={mediumArray[1]}
            displayDarknessOverlay={false}
          />
          <Box
            style={boxLeftPadding}
            cellWidth="1/2"
            smallWidth="1/1"
            ratio={2}
            click={() => {}}
            type="contactUsForm"
            header="Share With Us!"
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
  return (<Grid
    gutter="6px"
    cellWidth="1/2"
    smallCellWidth="1/2"
    style={mobileGridStyle}>
    <Cell smallWidth="1/1" style={mobileCellStyle}>
      <Grid gutter="0px">
        <Box
          cellWidth="1"
          ratio={1}type="featured"
          click={() => {}}
          model={featuredArray[0]}
          displayDarknessOverlay={false}/>
      </Grid>
    </Cell>
    <Cell smallWidth="1/1" style={mobileCellStyle}>
      <Grid gutter="0px">
        <Box
          cellWidth="1"
          click={() => {}}
          model={mediumArray[0]}
          displayDarknessOverlay={false}/>
      </Grid>
    </Cell>
    <Cell smallWidth="1/1" style={mobileCellStyle}>
      <Grid gutter="0px">
        <Box
          cellWidth="1"
          click={() => {}}
          model={smallArray[0]}
          displayDarknessOverlay={false}/>
      </Grid>
    </Cell>
    <Cell smallWidth="1/1" style={mobileCellStyle}>
      <Grid gutter="0px">
        <Box
          cellWidth="1"
          ratio={1}
          click={() => {}}
          model={smallArray[1]}
          displayDarknessOverlay={false}/>
      </Grid>
    </Cell>
    <Cell smallWidth="1/1" style={{margin: '0 0 6px 0', position: 'relative', top: '0', bottom: '0'}}>
      <Grid gutter="0px">
        <Box
          cellWidth="1"
          ratio={1}
          type="conversation"
          click={() => {}}
          model={conversationArray[0]}
          displayDarknessOverlay={false}/>
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
          style={{height: '100%'}}
          cellWidth="1"
          ratio={1}
          type="featured"
          click={() => {}}
          model={featuredArray[1]}
          displayDarknessOverlay={false}
        />
      </Grid>
    </Cell>
    <Cell smallWidth="1/1" style={mobileCellStyle}>
      <Grid gutter="0px">
        <Box
          style={{height: '100%'}}
          cellWidth="1"
          ratio={0.6}
          type="contacts"
          click={() => {}}
          displayDarknessOverlay={false}
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
          model={mediumArray[1]}
          displayDarknessOverlay={false}
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
          header="Share With Us!"
          subHeader={json.formMessage}
          displayDarknessOverlay={false}
        />
      </Grid>
    </Cell>
  </Grid>);
}
const About = () => {
  const styles = require('./About.scss');
  return (
    <div>
      <div className={styles.lg} style={{
        maxWidth: '1600px',
        margin: 'auto' }}>
        <main className={styles.main}>
          {getDesktopMedias()}
        </main>
      </div>
      {/* Mobile About Layout  */}
      <div className={styles.sm}>
        <main className={styles.main}>
          {getMobileMedias()}
        </main>
      </div>
    </div>
  );
};

export default About;
