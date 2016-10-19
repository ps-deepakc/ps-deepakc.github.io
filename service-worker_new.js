'use strict';

let port;
let pushMessage;
let redirect_url;
self.addEventListener('push', function(event) {
  pushMessage = event.data ? event.data.text() : 'no payload';
  console.log('hello '+pushMessage);
  if (port) {
    port.postMessage(pushMessage);
  }
  var obj = JSON.parse(pushMessage);
  redirect_url = obj.url;
  event.waitUntil(self.registration.showNotification(obj.title, {
    body: obj.text,
    tag: obj.title,
    icon: 'https://ps-deepakc.github.io/images/logo_72.png',
    badge: 'https://ps-deepakc.github.io/images/logo_192.png',
  }));
});

self.addEventListener("notificationclick", function(event) {
    
    // close the notification
    event.notification.close();

    //To open the app after click notification
    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if ("focus" in client) {
                    return client.focus();
                }
            }

            if (clientList.length === 0) {
                if (clients.openWindow) {
                    return clients.openWindow(redirect_url);
                }
            }
        })
    );
});

self.onmessage = function(e) {
  port = e.ports[0];

  if (pushMessage) {
    // Push message arrived before the page finished loading.
    port.postMessage(pushMessage);
  }
};
