const div = document.createElement('div');
div.style.width = '100px';
div.style.height = '100px';
div.style.background = 'red';
div.style.color = 'white';
div.innerHTML = 'Watching for changes client-side-rendered my friend';

document.getElementById('main').appendChild(div);
