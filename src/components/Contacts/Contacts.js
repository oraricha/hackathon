import React from 'react';
import {Tile, TileLayer} from 'components';
const styles = require('./Contacts.scss');

const contacts = [{name: 'Moti Cohen', title: 'Founder, CEO'}, // 0
  {name: 'Daniel Zadok', title: 'Co-Founder, COO'}, // 1
  {name: 'Charles Gabriel', title: 'President'}, // 2
  {name: 'Daniel Yelin', title: 'Chief Financial Officer'}, // 3
  {name: 'Ran Peled', title: 'Chief Revenue Officer'}, // 4
  {name: 'Adir Ben-Yehuda', title: 'Chief Business Development Officer'}, // 5
  {name: 'Nitsan Peled', title: 'Chief Content Officer'}, // 6
  {name: 'Julian Soler', title: 'Head of Marketing'}, // 7
  {name: 'Moshe Peretz', title: 'VP R&D'}, // 8
  {name: 'Scott Sklar', title: 'VP, Sales US'}, // 9
  {name: 'David Rosenbloom', title: 'VP, BD US'}, // 10
  {name: 'Remy Wasyluk', title: 'VP, Sales'}, // 11
  {name: 'Shirly Kohai', title: 'HR Director'}]; // 12

const generateContacts = (list) => {
  return list.map((contact, index) => {
    return (
      <li className={styles.item} key={`${contact.name}-${index}`}>
        <h5 className={styles.header}>{contact.name}</h5>
        <h6 className={styles.link}>{contact.title}</h6>
      </li>
    );
  });
};

function getMedias(desktop) {
  const style = desktop ? {marginRight: '0'} : {marginRight: '8.5%'};
  return (
    <main>
      <h5 className={styles.title}>THE MANAGEMENT TEAM</h5>
      {desktop ?
        (<div className={styles.linksContainer}>
          <ul className={styles.column} style={{marginTop: '10px', marginRight: '0'}}>
            {generateContacts(contacts.slice(0, 4))}
          </ul>
          <ul className={styles.column} style={style}>
            {generateContacts(contacts.slice(4, 8))}
          </ul>
          <ul className={styles.column} style={style}>
            {generateContacts(contacts.slice(8, contacts.length))}
          </ul>
        </div>)
        :
        (<div className={styles.linksContainer}>
            <ul className={styles.column} style={{marginTop: '10px', marginRight: '8.5%'}}>
              {generateContacts(contacts.slice(0, 4))}
            </ul>
            <ul className={styles.column} style={style}>
              {generateContacts(contacts.slice(4, 7))}
            </ul>
            <ul className={styles.column} style={style}>
            {generateContacts(contacts.slice(7, contacts.length))}
            </ul>
            </div>)
      }
    </main>
  );
}

const Contacts = (props) => {
  const {...others} = props;
  const background = {image: {'background': [{'image': {path: 'contacts', type: 'static'}}] }};
  const frontLayer = (
    <TileLayer placeholderColor="#3D9770" {...props} background={background}>
      <div className={styles.lg}>
        {getMedias(true)}
      </div>
      <div className={styles.sm} style={{height: '100%', position: 'relative'}}>
        {getMedias(false)}
      </div>
    </TileLayer>
  );
  return (
    <Tile {...others} layers={[frontLayer]}/>
  );
};

export default Contacts;
