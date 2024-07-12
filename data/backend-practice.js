const xhr = new XMLHttpRequest();
// to wait for the response:
// will run after the response is loaded 
// first we set up the even listener and then we send/trigger
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send(); 
