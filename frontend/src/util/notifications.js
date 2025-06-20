// src/util/notifications.js
export const showPlantNotification = (plantName, careInstructions) => {
  if (window.Notification && Notification.permission === "granted") {
    new Notification(`🌱 Time to care for ${plantName}!`, {
      body: careInstructions,
      icon: '/plant-icon.png' // Add a plant icon to your public folder
    });
  }
};
