$(document).ready(function() {

$('p').editable("http://scratch.ggravarr.net/editor/widgets/textwidget/js/save.php", { 
      indicator : "<img src='img/indicator.gif'>",
      type   : 'textarea',
      submitdata: { _method: "put" },
      select : false,
      submit : 'Save',
      cancel : 'cancel',
      cssclass : "editable"
  });


$('#site_title h1 a').editable("http://scratch.ggravarr.net/editor/widgets/textwidget/js/save.php", { 
      indicator : "<img src='img/indicator.gif'>",
      type   : 'textarea',
      submitdata: { _method: "put" },
      select : false,
      submit : 'Save',
      cancel : 'cancel',
      cssclass : "editable"
  });


$('.content_box_content h2').editable("http://scratch.ggravarr.net/editor/widgets/textwidget/js/save.php", { 
      indicator : "<img src='img/indicator.gif'>",
      type   : 'textarea',
      submitdata: { _method: "put" },
      select : false,
      submit : 'Save',
      cancel : 'cancel',
      cssclass : "editable"
  });


$('.content_box_content h3').editable("http://scratch.ggravarr.net/editor/widgets/textwidget/js/save.php", { 
      indicator : "<img src='img/indicator.gif'>",
      type   : 'textarea',
      submitdata: { _method: "put" },
      select : false,
      submit : 'Save',
      cancel : 'cancel',
      cssclass : "editable"
  });


$('#templatemo_menu li a').editable("http://scratch.ggravarr.net/editor/widgets/textwidget/js/save.php", { 
      indicator : "<img src='img/indicator.gif'>",
      type   : 'textarea',
      submitdata: { _method: "put" },
      select : false,
      cssclass : "editable",
	  onblur: "submit"
  });


$('.tmo_list li').editable("http://scratch.ggravarr.net/editor/widgets/textwidget/js/save.php", { 
      indicator : "<img src='img/indicator.gif'>",
      type   : 'textarea',
      submitdata: { _method: "put" },
      select : false,
      submit : 'Save',
      cancel : 'cancel',
      cssclass : "editable"
  });

});

