
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCNW8rUoMMW3mg11KX09B8Ew0J7jlU5LS4",
  authDomain: "alerte-magasin.firebaseapp.com",
  databaseURL: "https://alerte-magasin-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "alerte-magasin",
  storageBucket: "alerte-magasin.firebasestorage.app",
  messagingSenderId: "22011236626",
  appId: "1:22011236626:web:17b0c360cb8f1fc03c23cb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  const title = notification.title || "Alerte Magasin";

  self.registration.showNotification(title, {
    body: notification.body || "Une nouvelle alerte vous attend.",
    icon: "./favicon.ico",
    data: payload.data || {}
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow("https://ktouroude.github.io/alerte--magasin/");
    })
  );
});
