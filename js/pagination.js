
var WW = 'L';

var Pagination = {
    code: '',

    Extend: function(data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },

    Add: function(s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a class="ret">' + i + '</a>';
        }
    },

    Last: function() {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },

    First: function() {
        Pagination.code += '<a>1</a><i>...</i>';
    },


    Click: function() {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
    },

    Prev: function() {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
    },

    Next: function() {
        Pagination.page++;

        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
    },

    TypePage: function() {
        Pagination.code = '<input onclick="this.setSelectionRange(0, this.value.length);this.focus();" onkeypress="if (event.keyCode == 13) { this.blur(); }" value="' + Pagination.page + '" /> &nbsp; / &nbsp; ' + Pagination.size;
        Pagination.Finish();
        var v = Pagination.e.getElementsByTagName('input')[0];
        v.click();

        if (WW !== 'T') {
            v.addEventListener("blur", function(event) {

                var p = parseInt(this.value);

                if (!isNaN(parseFloat(p)) && isFinite(p)) {
                    if (p > Pagination.size) {
                        p = Pagination.size;
                    } else if (p < 1) {
                        p = 1;
                    }
                } else {
                    p = Pagination.page;
                }
                Pagination.Init(document.getElementById('pagination'), {
                    size: Pagination.size,
                    page: p,
                    step: Pagination.step
                });
            }, false);
        }
        else {

        }
    },

    Bind: function() {
        var a = Pagination.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
        var d = Pagination.e.getElementsByTagName('i');
        for (i = 0; i < d.length; i++) {
            d[i].addEventListener('click', Pagination.TypePage, false);
        }
    },

    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    Start: function() {
        if (WW === 'S') {
            Pagination.step = 0;
            Pagination.TypePage();
        }
        else {


            if (WW === 'L') {
                Pagination.step = 1;
            }
            else if (WW === 'M') {
                Pagination.step = 2;
            }
            else if (WW === 'S') {
                Pagination.step = 0.5;
            }

            if (Pagination.size < Pagination.step * 1 + 3) {
                Pagination.Add(1, Pagination.size + 1);
            } else if (Pagination.page < Pagination.step * 2 + 1) {
                Pagination.Add(1, Pagination.step * 1 + 4);
                Pagination.Last();
            } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
            } else {
                Pagination.First();
                Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                Pagination.Last();
            }
            Pagination.Finish();
        }
    },

    Buttons: function(e) {
        var nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },

    Create: function(e) {
        var html = [
            '<a class="pr">&#9668;</a>', // previous button
            '<span class="item_pag"></span>', // pagination container
            '<a class="pr">&#9658;</a>' // next button
        ];
        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },

    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
};

var init = function() {

    Pagination.Init(document.getElementById('pagination'), {
        size: 12, // pages size
        page: 1, // selected page
        step: 1 // pages before and after current
    });

    document.getElementById('T').addEventListener('click', function(){
        WW = 'T';


        document.getElementById('L').classList.remove('chosen');

        document.getElementById('container').style.width = '135px';
        Pagination.Start();
    }, false);

    document.getElementById('S').addEventListener('click', function(){
        WW = 'S';

        document.getElementById('S').classList.add('chosen');


        document.getElementById('container').style.width = '250px';
        Pagination.Start();
    }, false);

    document.getElementById('M').addEventListener('click', function(){
        WW = 'M';


        document.getElementById('S').classList.remove('chosen');


        document.getElementById('container').style.width = '300px';
        Pagination.Start();
    }, false);

    document.getElementById('L').addEventListener('click', function(){
        WW = 'L';


        document.getElementById('S').classList.remove('chosen');

        document.getElementById('container').style.width = '450px';
        Pagination.Start();
    }, false);
};

document.addEventListener('DOMContentLoaded', init, false);