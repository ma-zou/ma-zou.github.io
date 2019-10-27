window.onload = () => {
    let inputs = document.querySelectorAll('input'),
        navToggler = document.getElementById('navToggle');

    navToggler.addEventListener('click', () => {document.body.classList.toggle('navOpen')});

    inputs.forEach((item) => {
        item.addEventListener('change', validate_form);
    })

    window.addEventListener('mousemove', fancy_cursor);

}

function fancy_cursor(e) {
    let cursorElm = document.getElementById('fancyCursor');
    if(cursorElm) {   
        if (e.target.classList.contains('navLink') || e.target.tagName == "BUTTON" || (e.target.tagName == "A" && e.target.classList.contains('button')) || (e.target.tagName == "INPUT" && e.target.type == "checkbox")) {
            cursorElm.classList.add('hovering');
            let rect = e.target.getBoundingClientRect(),
            top = window.scrollY + rect.top + (rect.height / 2),
            left = window.scrollX + rect.left + (rect.width / 2);
            
            cursorElm.style.top = top+ 'px';
            cursorElm.style.left = left + 'px';
        } else if(e.target.tagName == "INPUT" || e.target.classList.contains('input') && (!e.target.classList.contains('valid') && !e.target.classList.contains('invalid'))) {
            cursorElm.classList.add('input');
            let rect = e.target.getBoundingClientRect();

            cursorElm.style.top = window.scrollY + rect.top+ 'px';
            cursorElm.style.left = window.scrollX + rect.left + 'px';
        } else {
            cursorElm.classList.remove('hovering');
            cursorElm.classList.remove('input');
            cursorElm.style.top = e.pageY+ 'px';
            cursorElm.style.left = e.pageX + 'px';
        }
    } else {
        cursorElm = document.createElement('div');
        cursorElm.id = 'fancyCursor';
        document.body.appendChild(cursorElm);
    }
}

function validate_form(e) {
    let type = e.target.type,
        value = e.target.value;

    if(e.target.value.length > 0) {
        switch(type) {
            case 'email':
                test = value.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/);
                if(test) form_class_toggle(e.target, true);
                else form_class_toggle(e.target, false)
            case 'number':
                break;
            default:
                form_class_toggle(e.target, true)
                break
        }
    } else {
        e.target.classList.remove('valid');
        e.target.classList.remove('invalid');
    }
}

function form_class_toggle(target, status) {
    if (status) {
        target.classList.add('valid');
        target.classList.remove('invalid');
    } else {
        target.classList.add('invalid');
        target.classList.remove('valid');
    }
}