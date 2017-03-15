export function generateImageUrl(imageObject) {
  function sizeConverter(size) {
    const sizeMap = {
      'panel': 'q',
      'background': 'z',
      'layer': 'n',
      'original': 'b',
      'dashboard': 'b',
      'big': 'z',
      'small': 'z',
      'filterButton': 'z'
    };

    if (!size) {
      return undefined;
    }

    return sizeMap[size] || size;
  }

  const sizeMap = {
    panel: {
      width: 122,
      height: 122
    },
    original: {
      width: 600,
      height: 475
    },
    background: {
      width: 600,
      height: 475
    },
    layer: {
      width: 258,
      height: 150
    },
    journeyThumb: {
      height: 144,
      width: 270
    },
    dashboard: {
      width: 722,
      height: 200
    },
    small: {
      height: 44
    },
    big: {
      height: 352
    },
    filterButton: {
      width: 32,
      height: 32
    }
  };

  if (!imageObject) {
    return '';
  } else if (imageObject.type === 'static') {
    if (imageObject.path) {
      return imageObject.path;
    }
    return '';
  } else if (imageObject.path) {
    return `//images.apester.com/${encodeURIComponent(imageObject.path)}`;
  } else if (imageObject.type === 'flickr') {
    const size = sizeConverter('original');
    const format = 'jpg';
    const imagesUrl = '//images.apester.com/';
    const filter = imageObject.filter || 'undefined';
    const flickrPath = 'ext_ssl/farm{farm-id}.staticflickr.com%2F{server-id}%2F{id}_{secret}_{size}.{format}'
      .replace('{farm-id}', imageObject.farm)
      .replace('{server-id}', imageObject.server)
      .replace('{id}', imageObject.id)
      .replace('{secret}', imageObject.secret)
      .replace('{size}', size)
      .replace('{format}', format);

    return '{imagesUrl}{path}/{width}/{height}/{filter}'
      .replace('{imagesUrl}', imagesUrl)
      .replace('{path}', flickrPath)
      .replace('{width}', sizeMap.original.width)
      .replace('{height}', sizeMap.original.height)
      .replace('{filter}', filter);
  }
  return imageObject;
}

export function generateYoutubePreviewUrl(videoId) {
  if (!videoId) return '';
  return `//img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function generateGradient(originColor, targetColor) {
  return `to bottom, ${originColor}, ${targetColor}`;
}

export function generateStaticImage(key) {
  // background images
  const apes = require('./../../static/images/about/apes.jpg');
  const contacts = require('./../../static/images/about/contacts.png');
  const ournetwork = require('./../../static/images/about/ournetwork.jpg');
  const conversationBubble = require('./../../static/images/about/conversationBubble.png');
  const jambo = require('./../../static/images/about/jambo.jpg');
  const giffy = require('./../../static/images/about/giffy.gif');
  const office = require('./../../static/images/about/apester_about.jpg');
  const bitmap = require('./../../static/images/about/bitmap.png');
  const space = require('./../../static/images/about/space.jpg');
  // publishers icons
  const aol = require('./../../static/publishers/aol.png');
  const cnet = require('./../../static/publishers/cnet.png');
  const fox = require('./../../static/publishers/fox.png');
  const hot = require('./../../static/publishers/hot.png');
  const hl = require('./../../static/publishers/hl.png');
  const star = require('./../../static/publishers/star.png');
  const tel = require('./../../static/publishers/tel.png');
  // advertisers page images
  const deliverMessages = require('./../../static/images/advertisersPage/deliver-messages.png');
  const increased = require('./../../static/images/advertisersPage/increased.png');
  const city = require('./../../static/images/advertisersPage/city.jpg');
  const advertisers = require('./../../static/images/advertisersPage/advertisers.png');
  const susceptible = require('./../../static/images/advertisersPage/susceptible.png');
  const discover = require('./../../static/images/advertisersPage/discover5.jpg');
  // conversation page images
  const daily = require('./../../static/images/publishersPage/daily.png');
  const consumer = require('./../../static/images/publishersPage/consumer.png');
  const fundamentally = require('./../../static/images/publishersPage/fundamentally.png');
  const devices = require('./../../static/images/publishersPage/mobile-devices.jpg');
  const crowds = require('./../../static/images/publishersPage/crowds.gif');
  const publishers = require('./../../static/images/publishersPage/cover_vid.gif');
  const demands = require('./../../static/images/publishersPage/demands.png');
  const visits = require('./../../static/images/publishersPage/visits.png');
  const brand = require('./../../static/images/publishersPage/brand.png');
  //
  const staticImages = {
    contacts: contacts,
    apes: apes,
    ournetwork: ournetwork,
    conversation: conversationBubble,
    jambo: jambo,
    giffy: giffy,
    office: office,
    bitmap: bitmap,
    space: space,
    aol: aol,
    cnet: cnet,
    fox: fox,
    hot: hot,
    hl: hl,
    star: star,
    tel: tel,
    publishers: publishers,
    discover: discover,
    deliverMessages: deliverMessages,
    increased: increased,
    city: city,
    susceptible: susceptible,
    advertisers: advertisers,
    daily: daily,
    consumer: consumer,
    fundamentally: fundamentally,
    devices: devices,
    crowds: crowds,
    demands: demands,
    visits: visits,
    brand: brand
  };
  return staticImages[key];
}
