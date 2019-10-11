
var key_sec = false;
var capacitores = 100;
var empuxo = 0;
var int_charge;

  window.onload = function(){
    setTimeout(function(){ 
      document.getElementById("key").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 40px;color:red");  
      document.getElementById("key").innerHTML = "Disabled";
    },1000);
    setTimeout(function(){ 
      document.getElementById("emp").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:white");  
      document.getElementById("emp").innerHTML = empuxo+" N";
    },1000);
    setTimeout(function(){ 
      document.getElementById("cap").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:red");  
      document.getElementById("cap").innerHTML = capacitores+"%";
    },1200);
    setTimeout(function(){ 
      document.getElementById("status").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 40px;color:red");  
      document.getElementById("status").innerHTML = "Stand";
    },1400);
    setTimeout(function(){ 
      document.getElementById("cont").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:white");  
      document.getElementById("cont").innerHTML = "Stand";
    },1600);
    setTimeout(function(){ 
      var new_li= document.createElement("li");
      new_li.setAttribute("Style", "color:green;list-style-type: none;font-family:display;font-size:22px;");       
      new_li.innerText = temp()+"Sistema Iniciado!";
      document.getElementById("list").insertBefore(new_li,document.getElementById("list").firstChild);    
    },1800);
  };

  
  // Verifica se alguma tecla foi pressionada
  $(document).keydown(function (e) { 
    if(e.which == 32) key(); 
    if(e.which == 71) verific(); 
    if(e.which == 67) charge(); 
    if(e.which == 70) stop();
  });

  // retorna a data no padrão de exibição (log) quando é chamada
  function temp(){
    var data = new Date();
    var hora = data.getHours();          
    var min  = data.getMinutes();        
    var seg  = data.getSeconds();
    var temp = "("+hora+":"+min+":"+seg+") - ";
    return temp
  }

  function verific(){
    var log_list = document.getElementById("list");
    var new_li_log = document.createElement("li");
    new_li_log.setAttribute("Style", "color:yellow;list-style-type: none;font-family:display;font-size:22px;"); 

    if(key_sec==true && capacitores>90){
      cont();
    }else if(key_sec != true){
      new_li_log.innerText = temp()+"Alerta: Chave de seguranca Disabled!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    }else{
      new_li_log.innerText = temp()+"Alerta: Capacitores com baixa carga!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    }
  }

  function key(){
    var disp = document.getElementById("key")
    if(key_sec==false){
      key_sec=true;
      if(capacitores>90){
        document.getElementById("status").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 40px;color:green");  
        document.getElementById("status").innerHTML = "available";
      }
      disp.setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 40px;color:green");  
      disp.innerHTML = "Activate";
    }else{
      key_sec=false;
      disp.setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 40px;color:red");  
      disp.innerHTML = "Disabled";

      document.getElementById("status").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 40px;color:red");  
      document.getElementById("status").innerHTML = "Disabled";
    }
  }

  function cont() {
    var i = 11;
    var intervalId = setInterval(function() {
      if(key_sec==true){
        if (i-- < 1){
          document.getElementById("cont").innerHTML = "GO";
          start();
          return clearInterval(intervalId);
        }else{
          document.getElementById("cont").innerHTML = String(i);
        };

      }else{
        document.getElementById("cont").innerHTML = "Stand";
        var log_list = document.getElementById("list");
        var new_li_log = document.createElement("li");
        new_li_log.setAttribute("Style", "color:yellow;list-style-type: none;font-family:display;font-size:22px;");       
        new_li_log.innerText = temp()+"Alerta: Contagem Parada";
        log_list.insertBefore(new_li_log ,log_list.firstChild);
        return clearInterval(intervalId);
      };
    }, 1500);
  }


// ------------------------- resquests ----------------------------------//

function charge_start(){
    var charge_s = new XMLHttpRequest();
    charge_s.timeout = 1500; // timeout in ms, 10 seconds
    charge_s.open("POST","http://169.254.4.10",true);
    charge_s.responseType = 'json';
    var pull = "Status:1";
    packet4.send(pull);
  
    charge_s.onload = function() {
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:green;list-style-type: none;font-family:display;font-size:22px;");       
      new_li_log.innerText = temp()+"Carregamento iniciado!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);  
      int_charge = setInterval(charge_reponse, 2000);
    };
    charge_s.onerror = function() {
      //Criando a tag <p> com suas especificações
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
      new_li_log.innerText = temp()+"Erro: Não foi possivel iniciar o corregamento, tente novamente!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    };

    charge_s.ontimeout = function() {
      //Criando a tag <p> com suas especificações
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
      new_li_log.innerText = temp()+"Falha na comunicação com o ignitor, verifique a conexão!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    };
  }

  function charge_reponse(){
    var charge_r =  new XMLHttpRequest();
    charge_r.timeout = 1500; // timeout in ms, 10 seconds
    charge_r.open("POST","http://169.254.4.10",true);
    charge_r.responseType = 'json';
    var pull = "Status:2";
    charge_r.send(pull);
  
    charge_r.onload = function() {
      let responseObj = charge_r.response;
      capacitores= responseObj.cap;
      document.getElementById("cap").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:red");  
      document.getElementById("cap").innerHTML = capacitores+"%";
      if(capacitores>99){
        clearInterval(int_charge);
      }
    };
    charge_r.onerror = function() {
      console.log("Erro: charge off")
    };

    charge_r.ontimeout = function() {
      console.log("Alerta: perca de conexão na resquest temp")
    };
  }
  //realiza o request de ignição e coleta de dados
  function start(){
    var p_start = new XMLHttpRequest();
    p_start.timeout = 2000; // timeout in ms, 10 seconds
    p_start.open("POST","http://169.254.4.10",true);
    var pull = "Status:3";
    p_start.send(pull);
    
    p_start.onload = function() {
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:yellow;list-style-type: none;font-family:display;font-size:22px;");       
      new_li_log.innerText = temp()+"Aviso: ignição inciada!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    };
    p_start.onerror = function() {
      //Criando a tag <p> com suas especificações
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
      new_li_log.innerText = temp()+"Erro: Não foi possivel efetuar o comando, tente novamente!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    };

    p_start.ontimeout = function() {
      //Criando a tag <p> com suas especificações
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
      new_li_log.innerText = temp()+"Falha na comunicação com o ignitor, verifique a conexão!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    };
  } 

  function stop(){
    var p_stop = new XMLHttpRequest();
    p_stop.timeout = 2000;
    p_stop.open("POST","http://169.254.4.10",true);
    var pull = "Status:4";
    p_stop.send(pull);

    p_stop.onload = function() {
      let response = p_stop.response;
      console.log(response);  
      let titulo = "DADOS";
      let blob = new Blob([response], { type: "text/plain;charset=utf-8" });
      
      saveAs(blob, titulo + ".txt");
      
    }
    p_stop.onerror = function() {
      //Criando a tag <p> com suas especificações
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
      new_li_log.innerText = temp()+"Erro: Não foi possivel efetuar o comando, tente novamente!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    };

    p_stop.ontimeout = function() {
      //Criando a tag <p> com suas especificações
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
      new_li_log.innerText = temp()+"Falha na comunicação com o ignitor, verifique a conexão!";
      log_list.insertBefore(new_li_log ,log_list.firstChild);
    };
  }    