// services/notification.service.js
async function sendNotification(userId, title, message) {
  // TODO: Replace with Firebase/OneSignal integration
  console.log(`🔔 Notification to User ${userId}: ${title} - ${message}`);
}

module.exports = { sendNotification };
