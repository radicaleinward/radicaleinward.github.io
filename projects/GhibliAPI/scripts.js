const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      // create a div with the class 'card'
		const card = document.createElement('div');
		card.setAttribute('class', 'card');

	  // create an h1 and set the text content with the film's title
	  	const h1 = document.createElement('h1');
	  	h1.textContent = movie.title;

	  // create a p and set the text content to the film's description
	  	const p = document.createElement('p');
	  	movie.description = movie.description.substring(0, 300); //limit of 300 chars
	  	p.textContent = '${movie.description}...'; //ends each with an elipsis

	  // Append the cards to the container element
	  	container.appendchild(card);

	  // Each card has an h1 and a p
	  	card.appendChild(h1);
	  	card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textConent = "Crap, it's broken."
    app.appendChild(errorMessage);
  }
}

request.send();

