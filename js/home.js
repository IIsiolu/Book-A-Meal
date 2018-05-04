const orders= (input, sent) => {
	console.log(input)
	let dom = document.createElement('div');
	dom.id = input;
	dom.style.width = "100px";
	dom.style.height = "100px";
	dom.style.background="green"
	let img = new Image();
	img.src = './meal2.jpg'
	img.width = "100px"
	img.height= "100px"
	img.alt="new food"
	dom.appendChild(img)
	document.getElementById('bookings-orders').appendChild(dom)
}

const signIn = () => {
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	if(email.length<3 && password.length<2){
		alert('field must not be empty')
	}else{
		window.location.href='../home.html'
	}
}