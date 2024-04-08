const Video = require('twilio-video');

    const identity = 'user123';

    fetch('/token?identity=' + identity)
      .then(response => response.json())
      .then(data => {
        const token = data.token;

        Video.connect(token, { name: 'roomName' }).then(room => {
          console.log(`Connected to Room: ${room.name}`);

          room.on('participantConnected', participant => {
            console.log(`Participant ${participant.identity} connected`);

            participant.tracks.forEach(track => {
              if (track.kind === 'video') {
                const remoteVideo = document.createElement('video');
                remoteVideo.setAttribute('autoplay', true);
                remoteVideo.setAttribute('playsinline', true);

                track.attach().forEach(element => {
                  remoteVideo.appendChild(element);
                });

                document.getElementById('remote-media-div').appendChild(remoteVideo);
              }
            });
          });

          room.on('participantDisconnected', participant => {
            console.log(`Participant ${participant.identity} disconnected`);

            participant.tracks.forEach(track => {
              track.detach().forEach(element => element.remove());
            });
          });
        });
      });