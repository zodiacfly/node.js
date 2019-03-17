function addLoadEvent(func){
	var oldLoad = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}
addLoadEvent(f1)

function f1(){
	var deleteBtn = document.querySelectorAll('.btn-danger');
	for (var i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].onclick = function(){
			var flag = confirm('You will be fired!!')
			if(flag){
				return true;
			} else {
				return false;
			}
		}
	}

}