export const REALTIME_SERVER = "ws://localhost:8080";


export const SocketEvent = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  NOTIFICATION: 'notification',
  NEWNOTIFICATION: 'newNotification',
  CHANGESTATUSBOOKING: 'changeStatusBooking',
  USERLISTNOTIFICATION: 'userListNotification',
  NEWUSERNOTIFICATION: "newUserNotification"
};
Object.freeze(SocketEvent);