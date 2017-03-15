export default function loadDiscover() {
  const obj = {
    'code': 200,
    'message': 'ok',
    'payload': [{
      'publisher': null,
      'created': '2016-09-13T09:31:25.331Z',
      'updated': '2016-09-13T09:34:48.339Z',
      'title': 'tests',
      'state': 'published',
      'interactionId': '57d7c76dee5d111a06398d11',
      'userName': 'Omri Keret',
      'displayInFeed': false,
      'summaries': [{
        'height': 317,
        'style': {
          'backgroundColor': 'rgba(255, 255, 255, 0.2)',
          'color': 'white',
          'fontSize': 20,
          'fontWeight': 'light',
          'fontFamily': 'Lato'
        },
        'image': {
          'background': [{
            'image': {
              'position': {
                'top': 0.15,
                'left': 0,
                'height': 0.7,
                'width': 1
              },
              'versusImgIdx': 0,
              'path': 'user-images/dd/dd108a3b7d680f94a7b14368ea67c2c7.png',
              'type': 'cdn'
            }, 'position': [0, 1]
          }],
          'versusImgIdx': 0,
          'path': 'user-images/dd/dd108a3b7d680f94a7b14368ea67c2c7.png',
          'type': 'cdn'
        },
        'descriptions': [{'value': 'You have a voice of your own'}, {'value': 'You think outside the box'}, {'value': 'Majority Rules'}, {'value': 'Go with the flow'}],
        'cssStyle': {
          'backgroundColor': 'rgba(255, 255, 255, 0.2)',
          'fontSize': '20px',
          'fontWeight': 'light'
        }
      }],
      'teasers': [{
        'id': '57d7c76dee5d111a06398d10',
        'height': 350,
        'style': {
          'backgroundColor': 'rgba(255, 255, 255, 0.2)',
          'color': 'white',
          'fontSize': 20,
          'fontWeight': 'light',
          'fontFamily': 'Lato'
        },
        'options': [{
          'id': 'df22a548e973b2a0478335ce9b66e574',
          'index': 0,
          'value': 'tes'
        }, {
          'id': 'afc02d77da651829358e456fce25b40f',
          'index': 0,
          'value': 'ssa'
        }],
        'image': {
          'background': [{
            'image': {
              'position': {
                'top': 0.07,
                'left': 0,
                'height': 0.86,
                'width': 1
              },
              'versusImgIdx': 0,
              'path': 'user-images/dd/dd108a3b7d680f94a7b14368ea67c2c7.png',
              'type': 'cdn'
            }, 'position': [0, 1]
          }],
          'versusImgIdx': 0,
          'path': 'user-images/dd/dd108a3b7d680f94a7b14368ea67c2c7.png',
          'type': 'cdn'
        },
        'title': {
          'style': {
            'backgroundColor': 'transparent',
            'color': 'white',
            'fontSize': 28,
            'fontWeight': 'light',
            'fontFamily': 'Lato'
          },
          'value': 'tests',
          'cssStyle': {
            'backgroundColor': 'transparent',
            'fontSize': '28px',
            'fontWeight': 'light'
          }
        },
        'cssStyle': {
          'backgroundColor': 'rgba(255, 255, 255, 0.2)',
          'fontSize': '20px',
          'fontWeight': 'light'
        }
      }],
      'tags': []
    }]
  };
  return new Promise((resolve) => {
    resolve(obj);
  });
}
