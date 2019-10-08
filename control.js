
  var key_sec = false;
  var capacitores = 100;


    window.onload = function(){
      setTimeout(function(){ 
        document.getElementById("key").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:red");  
        document.getElementById("key").innerHTML = "Desabled";
      },1000);
      setTimeout(function(){ 
        document.getElementById("cap").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:red");  
        document.getElementById("cap").innerHTML = capacitores+"%";
      },1200);
      setTimeout(function(){ 
        document.getElementById("status").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:red");  
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

    // Verifica se alguma tecla e pressionada
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

    //realiza o request de ignição e coleta de dados
    function start(){
      var packet = new XMLHttpRequest();
      packet.timeout = 2000; // timeout in ms, 10 seconds
      packet.open("POST","http://169.254.4.10",true);
        var pull = "Status:start";
        packet.send(pull);
      
        packet.onload = function() {
          var log_list = document.getElementById("list");
          var new_li_log = document.createElement("li");
          new_li_log.setAttribute("Style", "color:yellow;list-style-type: none;font-family:display;font-size:22px;");       
          new_li_log.innerText = temp()+"Aviso: ignição inciada!";
          log_list.insertBefore(new_li_log ,log_list.firstChild);
        };
        packet.onerror = function() {
          //Criando a tag <p> com suas especificações
          var log_list = document.getElementById("list");
          var new_li_log = document.createElement("li");
          new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
          new_li_log.innerText = temp()+"Erro: Não foi possivel efetuar o comando, tente novamente!";
          log_list.insertBefore(new_li_log ,log_list.firstChild);
        };

        packet.ontimeout = function() {
          //Criando a tag <p> com suas especificações
          var log_list = document.getElementById("list");
          var new_li_log = document.createElement("li");
          new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
          new_li_log.innerText = temp()+"Falha na comunicação com o ignitor, verifique a conexão!";
          log_list.insertBefore(new_li_log ,log_list.firstChild);
        };
      };

      function charge(){
        var packet3 = new XMLHttpRequest();
        packet3.timeout = 2000; // timeout in ms, 10 seconds
        packet3.open("POST","http://169.254.4.10",true);
        var pull = "Status:charge";
        packet3.send(pull);
      
        packet3.onload = function() {
          var log_list = document.getElementById("list");
          var new_li_log = document.createElement("li");
          new_li_log.setAttribute("Style", "color:yellow;list-style-type: none;font-family:display;font-size:22px;");       
          new_li_log.innerText = temp()+"Aviso: carregamento inciado!";
          log_list.insertBefore(new_li_log ,log_list.firstChild);
        };
        packet3.onerror = function() {
          //Criando a tag <p> com suas especificações
          var log_list = document.getElementById("list");
          var new_li_log = document.createElement("li");
          new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
          new_li_log.innerText = temp()+"Erro: Não foi possivel efetuar o comando, tente novamente!";
          log_list.insertBefore(new_li_log ,log_list.firstChild);
        };

        packet3.ontimeout = function() {
          //Criando a tag <p> com suas especificações
          var log_list = document.getElementById("list");
          var new_li_log = document.createElement("li");
          new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
          new_li_log.innerText = temp()+"Falha na comunicação com o ignitor, verifique a conexão!";
          log_list.insertBefore(new_li_log ,log_list.firstChild);
        };
      };  

    function stop(){
      var packet2 = new XMLHttpRequest();
      packet2.timeout = 2000;
      packet2.open("POST","http://169.254.4.10",true);
        var pull = "Status:stop";
        packet2.send(pull);
      
        packet2.onload = function() {
          let response = packet2.response;
          console.log(response);  
        let titulo = "DADOS";
          let blob = new Blob([response], { type: "text/plain;charset=utf-8" });
          saveAs(blob, titulo + ".txt");
           document.getElementById('status').innerHTML = "finalizou";
        }
         packet2.onerror = function() {
          //Criando a tag <p> com suas especificações
          var log_list = document.getElementById("list");
          var new_li_log = document.createElement("li");
          new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
          new_li_log.innerText = temp()+"Erro: Não foi possivel efetuar o comando, tente novamente!";
          log_list.insertBefore(new_li_log ,log_list.firstChild);
        };

        packet2.ontimeout = function() {
          //Criando a tag <p> com suas especificações
          var log_list = document.getElementById("list");
          var new_li_log = document.createElement("li");
          new_li_log.setAttribute("Style", "color:red;list-style-type: none;font-family:display;font-size:22px;");       
          new_li_log.innerText = temp()+"Falha na comunicação com o ignitor, verifique a conexão!";
          log_list.insertBefore(new_li_log ,log_list.firstChild);
        };
    }    

    function verific(){
      var log_list = document.getElementById("list");
      var new_li_log = document.createElement("li");
      new_li_log.setAttribute("Style", "color:yellow;list-style-type: none;font-family:display;font-size:22px;"); 

      if(key_sec==true && capacitores>90){
        cont();
      }else if(key_sec != true){
        new_li_log.innerText = temp()+"Alerta: Chave de seguranca Desabled!";
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
            document.getElementById("status").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:green");  
            document.getElementById("status").innerHTML = "available";
          }
          disp.setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:green");  
          disp.innerHTML = "Activate";
      }else{
        key_sec=false;
        disp.setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:red");  
        disp.innerHTML = "Desabled";

        document.getElementById("status").setAttribute("Style", "font-family:display;margin-top: 30px;font-size: 45px;color:red");  
        document.getElementById("status").innerHTML = "Desabled";
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
