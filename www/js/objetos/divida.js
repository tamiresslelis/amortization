
var Divida = (function(){

  function Divida(mod) {
    if(mod.saldoDevedor != 0){
          var int = getMoney(mod.saldoDevedor );
          var formatoReal = formatReal( int ) ;
          this.saldoDevedor = somenteNumeros(formatoReal);
    }
    var int1 = getMoney(mod.AmortizacaoExtra );
    var formatoReal1 = formatReal( int1 ) ;
    this.AmortizacaoExtra = somenteNumeros(formatoReal1);
    console.log("----: "  +this.AmortizacaoExtra);

    this.periodoTotal = mod.faltam;
    this.diminuirParcela = mod.diminuirParcela;

    //taxa mensAl  quando se tem a anual
    console.log("Mod:"+mod.juros);
    this.juros = (((Math.pow((1+(mod.juros)),1/12)-1)*100)/100);
    console.log("juros mensal----"+this.juros);
    this.faltam = mod.faltam;
    this.inactive1 = mod.inactive1;
    this.inactive2 = mod.inactive2;
    this.n = mod.n;
    this.somaJuros = 0;
    this.somaPrestacoes = 0;
  };

  Divida.prototype.sac = function () {
    var saldoDevedorAtualizado1 = [];
    var prestacao1 = [];
    var taxaJuros1 = [];
    var saldoDevedorAtualizado2 = [];
    var prestacao2 = [];
    var taxaJuros2 = [];
    var grid= [];

    //Diminuir Prazo
    if(this.inactive1 == true){
      this.somaJuros = 0;
      this.somaPrestacoes = 0;
        if(this.AmortizacaoExtra !=0){
            this.somaJuros = 0;
            this.somaPrestacoes = 0;

        if(this.faltam!=0){
          this.periodoTotal = this.faltam;
          /*console.log("Novo periodo total "+this.periodoTotal);
          console.log("Quanto que falta: "+this.faltam);*/
        }
        else{
          this.periodoTotal = 0;
          saldoDevedorAtualizado1.push(this.saldoDevedor);
          saldoDevedorAtualizado2.push(this.saldoDevedor);
        }
        //console.log("00000000000 "+this.saldoDevedor);
        //console.log("O periodo aqui"+ this.periodoTotal);
        var amortizacao1 = ((this.saldoDevedor) / this.periodoTotal);
        //console.log("Valor da amortizacao aqui no for------"+amortizacao1);
        for(var i=0; i <= this.periodoTotal; i++){
              saldoDevedorAtualizado1.push(parseFloat(((this.periodoTotal-i) / this.periodoTotal) * this.saldoDevedor).toFixed(4));
              //console.log('Saldo devedor no periodo' +saldoDevedorAtualizado1[i]);
              if(i >0){
              taxaJuros1.push((this.juros * saldoDevedorAtualizado1[i-1]));
              //console.log("total de juros " + this.somaJuros);
              //console.log('Juros é igual a ' +taxaJuros1[i]);

              prestacao1.push(taxaJuros1[i] + amortizacao1);
              //console.log("PRESTACAO 1: "+prestacao1[i]);
              //pegar somente a prestacao1 na posição 1
              if(i == 1){
                var saldoDevedor_MAmortizacao_MPrestacao = this.saldoDevedor-amortizacao1-this.AmortizacaoExtra;
                /*console.log("VAOR :"+this.saldoDevedor-amortizacao1-this.AmortizacaoExtra);
                console.log('Saldo devedor - amortizacao extra - prestacao :'+saldoDevedor_MAmortizacao_MPrestacao);
                console.log('prestacao'+prestacao1[1])*/
                var emcima = ((1 -this.juros*i)+(this.juros));
                var embaixo = (prestacao1[i]/(this.saldoDevedor-prestacao1[i]-this.AmortizacaoExtra)-this.juros);
                this.n = emcima/embaixo;
                //console.log('Valor de n ='+this.n);
              }
              //  this.somaPrestacoes = this.somaPrestacoes +prestacao1[i];
              //console.log('Prestacao no periodo é igual a ' +prestacao1[i]);
              //console.log("total de prestacoes " + this.somaPrestacoes);
              }else{
                taxaJuros1.push(0);
                prestacao1.push(0);
              }
        }
        var numerodeabatimento = this.AmortizacaoExtra/amortizacao;
        //console.log('numero de abatimento :'+numerodeabatimento);
        var j=0;
        if( this.n >0){
            while(this.n>j){
              j++;
          }
          //console.log('Indice do j:'+ j);
          this.saldoDevedor = saldoDevedor_MAmortizacao_MPrestacao;
          var amortizacao2 = this.saldoDevedor/j;
          //console.log('Saldo devedor - amortizacao extra - prestacao MOSTRA O THIS.SALDODEVEDOR :'+this.saldoDevedor);
          for(var x=0; x <=j; x++){
                                  saldoDevedorAtualizado2.push(parseFloat(((j-x)/j)* this.saldoDevedor).toFixed(2));
                                  //console.log('Saldo devedor no periodo' +saldoDevedorAtualizado2[x]);
                                  if(x >0){
                                  taxaJuros2.push(parseFloat(this.juros * saldoDevedorAtualizado2[x-1]).toFixed(2));
                                  this.somaJuros = this.somaJuros + (this.juros * saldoDevedorAtualizado2[x-1]);
                                  //console.log("total de juros " + this.somaJuros);
                                  console.log('Juros é igual a ' +taxaJuros2[x]);
                                  //console.log("Valor da amortizacao aqui no for"+amortizacao2);
                                  prestacao2.push(parseFloat((this.juros * saldoDevedorAtualizado2[x-1] )+ amortizacao2).toFixed(2));

                                  this.somaPrestacoes = this.somaPrestacoes +((this.juros * saldoDevedorAtualizado2[x-1]) + amortizacao2);
                                  console.log('--Prestacao no periodo é igual a ' +prestacao2[x]);
                                  console.log("--total de prestacoes " + this.somaPrestacoes);
          }else{
                taxaJuros2.push(0);
                prestacao2.push(0);
          }
          grid.push({
                     hoje:parseFloat(this.saldoDevedor).toFixed(2),
                     totalHoje:parseFloat(prestacao1[1]+this.AmortizacaoExtra).toFixed(2),
                     periodo:x,
                     taxa:formatReal(taxaJuros2[x]),
                     prestacao:formatReal(prestacao2[x]),
                     saldoDevedor:formatReal(saldoDevedorAtualizado2[x]),
                     totalJuros:parseFloat(this.somaJuros).toFixed(2),
                     totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2),
                  })
        }
      }else{
        grid.push({
                   hoje:parseFloat(prestacao1[1]).toFixed(2),
                   totalHoje:parseFloat(prestacao1[1]+this.AmortizacaoExtra).toFixed(2),
                   periodo:0,
                   taxa:parseFloat(0),
                   prestacao:parseFloat(0),
                   saldoDevedor:parseFloat(0),
                   totalJuros:parseFloat(0),
                   totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2),
                })
      }
    }
      //Este else é se o valor da AmortizacaoExtra =0;
      else{

        this.somaJuros = 0;
        this.somaPrestacoes = 0;
        if(this.faltam!=0){
          this.periodoTotal = this.faltam;
          //console.log("Novo periodo total "+this.periodoTotal);
          //console.log("Quanto que falta: "+this.faltam);
        }
        else{
          this.periodoTotal = 0;
          saldoDevedorAtualizado1.push(this.saldoDevedor);
        }
        var amortizacao = ((this.saldoDevedor) / this.periodoTotal);
        //console.log("amortizacao"+amortizacao);
        for(var i=0; i <= this.periodoTotal; i++){
              saldoDevedorAtualizado1.push(parseFloat(((this.periodoTotal-i) / this.periodoTotal) * this.saldoDevedor).toFixed(2));
              //console.log('Saldo devedor no periodo' +saldoDevedorAtualizado1[i]);
              if(i >0){
              taxaJuros1.push(parseFloat(this.juros * saldoDevedorAtualizado1[i-1]).toFixed(2));
              this.somaJuros = this.somaJuros + (this.juros * saldoDevedorAtualizado1[i-1]);
              console.log("total de juros " + this.somaJuros);
              console.log('Juros é igual a ' +taxaJuros1[i]);
              console.log("Valor da amortizacao aqui no for"+amortizacao);
              prestacao1.push(parseFloat((this.juros * saldoDevedorAtualizado1[i-1])+ amortizacao).toFixed(2));
              this.somaPrestacoes = this.somaPrestacoes +(this.juros * saldoDevedorAtualizado1[i-1]+ amortizacao);
              console.log('Prestacao no periodo é igual a ' +prestacao1[i]);
              console.log("total de prestacoes " + this.somaPrestacoes);
              }else{
                taxaJuros1.push(0);
                prestacao1.push(0);
              }
              grid.push({
                hoje:parseFloat(this.saldoDevedor).toFixed(2),
                totalHoje:parseFloat(prestacao1[1]+this.AmortizacaoExtra).toFixed(2),
                periodo:i,
                taxa:formatReal(taxaJuros1[i]),
                prestacao:formatReal(prestacao1[i]),
                saldoDevedor:formatReal(saldoDevedorAtualizado1[i]),
                totalJuros:parseFloat(this.somaJuros).toFixed(2),
                totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2),

              })
        }
      }
    }

    //Diminuir Parcela
    if(this.inactive2 == true){

      this.somaJuros = 0;
      this.somaPrestacoes = 0;
        if(this.AmortizacaoExtra !=0){
          this.saldoDevedor = this.saldoDevedor - this.AmortizacaoExtra;
          console.log("Saldo devedor  if" +this.saldoDevedor);
        }
        if(this.faltam!=0){
          this.periodoTotal = this.faltam;
          //console.log("Novo periodo total "+this.periodoTotal);
          //console.log("Quanto que falta: "+this.faltam);
        }else{
          this.periodoTotal = 0;
          saldoDevedorAtualizado1.push(this.saldoDevedor);

        }
        var amortizacao = ((this.saldoDevedor) / this.periodoTotal);
        for(var i=0; i <= this.periodoTotal; i++){
              saldoDevedorAtualizado1.push(parseFloat(((this.periodoTotal-i) / this.periodoTotal) * this.saldoDevedor).toFixed(2));
              console.log('Saldo devedor no periodo' +saldoDevedorAtualizado1[i]);
              if(i >0){
              taxaJuros1.push(parseFloat(this.juros * saldoDevedorAtualizado1[i-1]).toFixed(2));
              this.somaJuros = this.somaJuros + (this.juros * saldoDevedorAtualizado1[i-1]);
              console.log("total de juros " + this.somaJuros);
              console.log('Juros é igual a ' +taxaJuros1[i]);
              console.log("Valor da amortizacao aqui no for"+amortizacao);
              prestacao1.push(parseFloat((this.juros * saldoDevedorAtualizado1[i-1])+ amortizacao).toFixed(2));
              this.somaPrestacoes = this.somaPrestacoes +(this.juros * saldoDevedorAtualizado1[i-1]);
              console.log('Prestacao no periodo é igual a ' +prestacao1[i]);
              console.log("total de prestacoes " + this.somaPrestacoes);
              }else{
                taxaJuros1.push(0);
                prestacao1.push(0);
              }
              grid.push({
                hoje:parseFloat(this.saldoDevedor).toFixed(2),
                totalHoje:parseFloat(prestacao1[1]+this.AmortizacaoExtra).toFixed(2),
                periodo:i,
                taxa:formatReal(taxaJuros1[i]),
                prestacao:formatReal(prestacao1[i]),
                saldoDevedor:formatReal(saldoDevedorAtualizado1[i]),
                totalJuros:parseFloat(this.somaJuros).toFixed(2),
                totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2),
              })
        }
      }

    return grid;
  }
  //Falta fazer para a tabela PRICE
  Divida.prototype.price = function(){
    console.log('tabela PRICE');
    var amortizacao = [];
    var amortizaoNumerador = [];
    var amortizacaoDenominador = [];
    var taxaJuros = [];
    var saldoDevedor = [];
    var saldoDevedorNumerador = [];
    var saldoDevedorDenominador = [];
    var prestacao = [];
    var amortizacao2 = [];
    var amortizaoNumerador2 = [];
    var amortizacaoDenominador2 = [];
    var taxaJuros2 = [];
    var saldoDevedor2 = [];
    var saldoDevedorNumerador2 = [];
    var saldoDevedorDenominador2 = [];
    var prestacao2 = [];
    var grid =[];

    //Diminuir prazo
    if(this.inactive1 == true){
      this.somaJuros = 0;
      this.somaPrestacoes = 0;
      if(this.AmortizacaoExtra !=0){
          console.log("Saldo devedor - if" +this.saldoDevedor);
          console.log('AmortizacaoExtra'+ this.AmortizacaoExtra);
            if(this.faltam!=0){
            this.periodoTotal = this.faltam;
            console.log("Periodo total - if "+this.periodoTotal);
            console.log("Diminuir parcela - if "+this.faltam);
          }else{
          this.periodoTotal = 0;
          saldoDevedor.push(this.saldoDevedor);
          saldoDevedor2.push(this.saldoDevedor);
          }
          //calculo para primeira parcela
          for(var i=0; i <= this.periodoTotal; i++){
          amortizaoNumerador.push((Math.pow((1+this.juros),i-1)));
          console.log('Amortizacao numerodador'+amortizaoNumerador[i]);
          amortizacaoDenominador.push((Math.pow(1+this.juros,this.periodoTotal)-1));
          console.log('Amortizacao denomindor'+amortizacaoDenominador[i]);
          amortizacao.push((amortizaoNumerador[i]/amortizacaoDenominador[i]) * (this.saldoDevedor * this.juros));
          console.log('Amortizacao Price'+amortizacao[i]);
          saldoDevedorNumerador.push(1-(Math.pow((1+this.juros),(this.periodoTotal-i)*(-1))));
          saldoDevedorDenominador.push(1-(Math.pow((1+this.juros),(this.periodoTotal)*(-1))));
          saldoDevedor.push((saldoDevedorNumerador[i]/saldoDevedorDenominador[i]) * this.saldoDevedor);
          if(i >0){
                taxaJuros.push((this.juros * saldoDevedor[i-1]));
                this.somaJuros = this.somaJuros + taxaJuros[i];
                console.log("total de juros " + this.somaJuros);
                prestacao.push(taxaJuros[i]+amortizacao[i]);
                this.somaPrestacoes = this.somaPrestacoes +prestacao[i];
                console.log('Valor da prestacao: '+prestacao[i]);
                console.log("total de prestacoes " + this.somaPrestacoes);
                //pegar somente a prestacao1 na posição 1
                if(i == 1){
                      console.log("Salo devedor aqui no i=1 "+this.saldoDevedor);
                      var saldoDevedor_MAmortizacao_MPrestacao = this.saldoDevedor-amortizacao[i]-this.AmortizacaoExtra;
                      console.log('Saldo devedor - amortizacao extra - prestacao :'+saldoDevedor_MAmortizacao_MPrestacao);
                      var emcima =(prestacao[i]/(this.juros*saldoDevedor_MAmortizacao_MPrestacao));
                      console.log('Emcima'+emcima);
                      var embaixo = (prestacao[i]/(this.juros*saldoDevedor_MAmortizacao_MPrestacao)-1);
                      console.log('embaixo'+embaixo);
                      var y= (emcima/embaixo);
                      console.log('valor de y: '+y);
                      var base=(1+this.juros);
                      console.log('valor de t :'+base);
                      //calculando o novo n
                      function getBaseLog(b,a) {
                            return Math.log(a) / Math.log(b);
                      }
                      var resultado = getBaseLog(base,y);

                      console.log('resultado'+resultado);
                      this.n = resultado;
                      console.log('Valor de n ='+this.n);
                    }

                    console.log('Prestacao no periodo é igual a ' +prestacao[i]);
                    console.log("total de prestacoes " + this.somaPrestacoes);
          }else{
              taxaJuros.push(0);
              prestacao.push(0);
            }
        }//fechou o for

            var j=0;
            if( this.n >0){
              this.somaJuros = 0;
              this.somaPrestacoes = 0;
                while(this.n>j){
                  j++;
              }
              console.log('Indice do j:'+ j);
              this.saldoDevedor = saldoDevedor_MAmortizacao_MPrestacao;

              console.log('Saldo devedor - amortizacao extra - prestacao MOSTRA O THIS.SALDODEVEDOR :'+this.saldoDevedor);
              for(var x=0; x <=j; x++){
                amortizaoNumerador2.push((Math.pow((1+this.juros),x-1)));
                amortizacaoDenominador2.push(((Math.pow(1+this.juros,j)-1)));
                amortizacao2.push((amortizaoNumerador2[x]/amortizacaoDenominador2[x]) * (this.saldoDevedor * this.juros));
                console.log('Amortizacao Price'+amortizacao2[x]);
                saldoDevedorNumerador2.push(1-(Math.pow((1+this.juros),(j-x)*(-1))));
                saldoDevedorDenominador2.push(1-(Math.pow((1+this.juros),(j)*(-1))));
                saldoDevedor2.push((saldoDevedorNumerador2[x]/saldoDevedorDenominador2[x]) * this.saldoDevedor);
                if(x >0){
                      taxaJuros2.push((this.juros * saldoDevedor2[x-1]));
                      this.somaJuros = this.somaJuros + taxaJuros2[x];
                      console.log("total de juros " + this.somaJuros);
                      prestacao2.push(taxaJuros2[x]+amortizacao2[x]);
                      this.somaPrestacoes = this.somaPrestacoes +prestacao2[x];
                      console.log('Valor da prestacao: '+prestacao2[x]);
                      console.log("total de prestacoes " + this.somaPrestacoes);
                      console.log("Valor da prestacao na posição 1---------"+ prestacao[1]);
                }else{
                    taxaJuros2.push(0);
                    prestacao2.push(0);
              }
                        grid.push({
                                   hoje:parseFloat(prestacao[1]).toFixed(2),
                                   totalHoje:parseFloat(prestacao[1]+this.AmortizacaoExtra).toFixed(2),
                                   periodo:x,
                                   taxa:parseFloat(taxaJuros2[x]).toFixed(2),
                                   prestacao:parseFloat(prestacao2[x]).toFixed(2),
                                   saldoDevedor:parseFloat(saldoDevedor2[x]).toFixed(2),
                                   totalJuros:parseFloat(this.somaJuros).toFixed(2),
                                   totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2),
                                })
            }
            //esse else é se o n for menor que 0
          }else{
            grid.push({
                       hoje:parseFloat(prestacao[1]).toFixed(2),
                       totalHoje:parseFloat(prestacao[1]+this.AmortizacaoExtra).toFixed(2),
                       periodo:0,
                       taxa:parseFloat(0),
                       prestacao:parseFloat(0),
                       saldoDevedor:parseFloat(0),
                       totalJuros:parseFloat(0),
                       totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2),
                    })
          }

          //AmortizacaoExtra==0
        }else{

          this.somaJuros = 0;
          this.somaPrestacoes = 0;

          if(this.faltam!=0){
          this.periodoTotal = this.faltam;
          console.log("Periodo total - if "+this.periodoTotal);
          console.log("Diminuir parcela - if "+this.faltam);
          }else{
            this.periodoTotal = 0;
            saldoDevedor.push(this.saldoDevedor);
          }

          for(var i=0; i <= this.periodoTotal; i++){
            amortizaoNumerador.push((Math.pow((1+this.juros),i-1)));
            //console.log('numerador'+amortizaoNumerador[i]);
            amortizacaoDenominador.push(((Math.pow(1+this.juros,this.periodoTotal)-1)));
            //console.log('denomindor'+amortizacaoDenominador[i]);
            //DivisaoAmortizacao.push((amortizaoNumerador[i]/amortizacaoDenominador[i]));
            //console.log('DivisaoAmortizacao '+DivisaoAmortizacao[i]);
            amortizacao.push((amortizaoNumerador[i]/amortizacaoDenominador[i]) * (this.saldoDevedor * this.juros));
            console.log('Amortizacao Price'+amortizacao[i]);
            saldoDevedorNumerador.push(1-(Math.pow((1+this.juros),(this.periodoTotal-i)*(-1))));
            //console.log('Saldo Devedor Numerador :'+saldoDevedorNumerador[i]);
            saldoDevedorDenominador.push(1-(Math.pow((1+this.juros),(this.periodoTotal)*(-1))));
            //console.log('Saldo Devedor denomindor :'+ saldoDevedorDenominador[i]);
            //taxaJuros.push((this.juros*))
            saldoDevedor.push((saldoDevedorNumerador[i]/saldoDevedorDenominador[i]) * this.saldoDevedor);
            if(i >0){
                  taxaJuros.push((this.juros * saldoDevedor[i-1]));
                  this.somaJuros = this.somaJuros + taxaJuros[i];
                  console.log("total de juros " + this.somaJuros);
                  prestacao.push(taxaJuros[i]+amortizacao[i]);
                  this.somaPrestacoes = this.somaPrestacoes +prestacao[i];
                  console.log('Valor da prestacao: '+prestacao[i]);
                  console.log("total de prestacoes " + this.somaPrestacoes);
            }else{
                taxaJuros.push(0);
                prestacao.push(0);
          }
            console.log('Juros: '+taxaJuros[i]);
            console.log('Saldo Devedor '+saldoDevedor[i]);
            grid.push({
                      hoje:parseFloat(prestacao[1]).toFixed(2),
                      totalHoje:parseFloat(prestacao[1]+this.AmortizacaoExtra).toFixed(2),
                      periodo:i,
                      taxa:parseFloat(taxaJuros[i]).toFixed(2),
                      prestacao:parseFloat(prestacao[i]).toFixed(2),
                      saldoDevedor:parseFloat(saldoDevedor[i]).toFixed(2),
                      totalJuros:parseFloat(this.somaJuros).toFixed(2),
                      totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2),

            })
          }
        }

    }
    //Diminuir Parcela

    if(this.inactive2 == true){
      this.somaJuros = 0;
      this.somaPrestacoes = 0;
      if(this.AmortizacaoExtra !=0){
          this.saldoDevedor = this.saldoDevedor - this.AmortizacaoExtra;
          console.log("Saldo devedor - if" +this.saldoDevedor);
      }

      if(this.faltam!=0){
      this.periodoTotal = this.faltam;
      console.log("Periodo total - if "+this.periodoTotal);
      console.log("Diminuir parcela - if "+this.faltam);
      }else{
        this.periodoTotal = 0;
        saldoDevedor.push(this.saldoDevedor);
      }

    for(var i=0; i <= this.periodoTotal; i++){
        amortizaoNumerador.push((Math.pow((1+this.juros),i-1)));
        //console.log('numerador'+amortizaoNumerador[i]);
        amortizacaoDenominador.push(((Math.pow(1+this.juros,this.periodoTotal)-1)));
        //console.log('denomindor'+amortizacaoDenominador[i]);
        //DivisaoAmortizacao.push((amortizaoNumerador[i]/amortizacaoDenominador[i]));
        //console.log('DivisaoAmortizacao '+DivisaoAmortizacao[i]);
        amortizacao.push((amortizaoNumerador[i]/amortizacaoDenominador[i]) * (this.saldoDevedor * this.juros));
        console.log('Amortizacao Price'+amortizacao[i]);
        saldoDevedorNumerador.push(1-(Math.pow((1+this.juros),(this.periodoTotal-i)*(-1))));
        //console.log('Saldo Devedor Numerador :'+saldoDevedorNumerador[i]);
        saldoDevedorDenominador.push(1-(Math.pow((1+this.juros),(this.periodoTotal)*(-1))));
        //console.log('Saldo Devedor denomindor :'+ saldoDevedorDenominador[i]);
        //taxaJuros.push((this.juros*))
        saldoDevedor.push((saldoDevedorNumerador[i]/saldoDevedorDenominador[i]) * this.saldoDevedor);
        if(i >0){
              taxaJuros.push((this.juros * saldoDevedor[i-1]));
              this.somaJuros = this.somaJuros + taxaJuros[i];
              console.log("total de juros " + this.somaJuros);
              prestacao.push(taxaJuros[i]+amortizacao[i]);
              this.somaPrestacoes = this.somaPrestacoes +prestacao[i];
              console.log('Valor da prestacao: '+prestacao[i]);
              console.log("total de prestacoes " + this.somaPrestacoes);
        }else{
            taxaJuros.push(0);
            prestacao.push(0);
      }
        console.log('Juros: '+taxaJuros[i]);
        console.log('Saldo Devedor '+saldoDevedor[i]);
        grid.push({

                  periodo:i,
                  taxa:parseFloat(taxaJuros[i]).toFixed(2),
                  prestacao:parseFloat(prestacao[i]).toFixed(2),
                  saldoDevedor:parseFloat(saldoDevedor[i]).toFixed(2),
                  totalJuros:parseFloat(this.somaJuros).toFixed(2),
                  totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2),

        })
      }
    }
      return grid;


}


  return Divida;
})();

function getMoney( str )
{
        str = str.replace(/[\D]+/g,'');
        return parseInt( str );
}

function formatReal( int )
{
        var tmp = int+'';
        tmp = tmp.replace(/[\.]([0-9]{2})$/g, ",$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
}
function somenteNumeros(formato) {
    var palavra = formato;
    var somente_numeros = palavra.replace(/\D+/g, "");
    return somente_numeros/100;
}
function somenteNumerosMeses(num) {
     var er = /[^0-9.]/;
     er.lastIndex = 0;
     var campo = num;
     if (er.test(campo.value)) {
       campo.value = "";
     }
 }
