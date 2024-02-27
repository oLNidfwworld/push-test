const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription) => {
    const response = await fetch('http://localhost:3000/save-subscription', {
        method : 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    });

    
    return response.json()
}

self.addEventListener("install", ( ) => {
    console.log(self);
})

self.addEventListener("activate", async (event) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey : urlBase64ToUint8Array('PUBLIC_KEY')
    })
    console.log(await saveSubscription(subscription));
    console.log(subscription);
}) 