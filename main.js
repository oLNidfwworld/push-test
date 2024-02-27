import './style.css'  
 

const checkSupports = ( ) => {
  if( !'serviceWorker' in navigator ) {
    console.warn('no service worker available');
  }

  if( !('Notification' in window) ){
    console.warn('no notification api')
  }
}

const registerSW = async ( ) => {
  const registration  =  await navigator.serviceWorker.register('/sw.js');
  return registration; 
}

const requestNotificationPermission = async ( ) => {
  const permission = await Notification.requestPermission();

  if ( permission !== 'granted' ) {
    console.warn('you revoked permission')
  } else {
    new Notification("test");
  }
} 

const main = async ( ) => {
  checkSupports();
  await requestNotificationPermission();
  const serviceWorkerHandler = await registerSW(); 
}
 
document.addEventListener('DOMContentLoaded', ( ) => {
  document.querySelector('#turnPushes').addEventListener('click', main )
});