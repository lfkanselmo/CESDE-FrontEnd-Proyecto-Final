
// Texto que se autoescribe
let app = document.querySelector('#typewriter');
let typewriter = new Typerwriter(app, {
  loop: true,
  delay: 75,
});


typewriter
  .pauseFor(2500) 
  .typeString('ARKHAM PROPERTIES') 
  .pauseFor(200) 
  .deleteChars(10) 
  .pauseFor(1000) 
  .start();


