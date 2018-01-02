var Financiamento = (function() {


  function Financiamento(model) {

    //taxa mensal quando se tem a anual
    console.log("Model:"+model.juros);
    this.juros = (((Math.pow((1+(model.juros)),1/12)-1)*100)/100);
    console.log("juros mensal --->"+this.juros);

    //this.juros= model.juros;
    this.valorFinanciado = model.valorFinanciado;
    this.periodoTotal = model.periodo;
    console.log("juros divide por 100" +this.juros);
    console.log("valorFinanciado"+this.valorFinanciado);
    this.somaJuros = 0;
    this.somaPrestacoes = 0;

  };

  Financiamento.prototype.sac = function () {
    var saldoDevedor = [];
    var prestacao = [];
    var taxaJuros = [];
    var grid= [];
    var totalParcelas = [];
    if(this.periodoTotal == 0){

      saldoDevedor.push(this.valorFinanciado);
      console.log("saldoDevedor"+this.valorFinanciado);
    }
    var amortizacao = (this.valorFinanciado / this.periodoTotal);
    console.log('Amortizacao'+amortizacao);
    //console.log('Juros ' + this.juros);
    for(var i=0; i <= this.periodoTotal; i++){
    saldoDevedor.push(parseFloat(((this.periodoTotal-i) / this.periodoTotal) * this.valorFinanciado).toFixed(4));
          console.log('Saldo devedor no periodo' +saldoDevedor[i]);
          if(i >0){
            taxaJuros.push(this.juros * saldoDevedor[i-1]);
            this.somaJuros = this.somaJuros + taxaJuros[i];
            console.log("total de juros " + this.somaJuros);
            console.log('Juros é igual a ' +taxaJuros[i]);
            prestacao.push(taxaJuros[i] + amortizacao);
            this.somaPrestacoes = this.somaPrestacoes +prestacao[i];
            console.log("total de prestacoes " + this.somaPrestacoes);
          }else{
          taxaJuros.push(0);
          prestacao.push(0);
        }
        console.log('Prestacao no periodo é igual a ' +prestacao[i]);
               grid.push({
               periodo:i,
               taxa:parseFloat(taxaJuros[i]).toFixed(2),
               prestacao:parseFloat(prestacao[i]).toFixed(2),
               saldoDevedor:parseFloat(saldoDevedor[i]).toFixed(2),
               totalJuros:parseFloat(this.somaJuros).toFixed(2),
               totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2)

          })

    }
    console.log('Tamanho do vertor grid:'+grid.length);
    return grid;
  };

  Financiamento.prototype.price = function(){
    var amortizacao = [];
    var amortizaoNumerador = [];
    var amortizacaoDenominador = [];
    var taxaJuros = [];
    var saldoDevedor = [];
    var saldoDevedorNumerador = [];
    var saldoDevedorDenominador = [];
    var somaJuros = [];
    var prestacao = [];
    var grid =[];

    if(this.periodoTotal == 0){
      saldoDevedor.push(this.valorFinanciado);
      console.log("saldoDevedor"+this.valorFinanciado);
    }
    for(var i=0; i <= this.periodoTotal; i++){

        amortizaoNumerador.push((Math.pow((1+this.juros),i-1)));
        //console.log('numerador'+amortizaoNumerador[i]);
        amortizacaoDenominador.push(((Math.pow(1+this.juros,this.periodoTotal)-1)));
        //console.log('denomindor'+amortizacaoDenominador[i]);
        //DivisaoAmortizacao.push((amortizaoNumerador[i]/amortizacaoDenominador[i]));
        //console.log('DivisaoAmortizacao '+DivisaoAmortizacao[i]);
        amortizacao.push((amortizaoNumerador[i]/amortizacaoDenominador[i]) * (this.valorFinanciado * this.juros));
        //console.log('Amortizacao Price'+amortizacao[i]);

        //taxaJuros.push((this.juros*))

        saldoDevedorNumerador.push(1-(Math.pow((1+this.juros),(this.periodoTotal-i)*(-1))));
        console.log('Saldo Devedor Numerador :'+saldoDevedorNumerador[i]);
        saldoDevedorDenominador.push(1-(Math.pow((1+this.juros),(this.periodoTotal)*(-1))));
        console.log('Saldo Devedor denomindor :'+ saldoDevedorDenominador[i]);
        saldoDevedor.push((saldoDevedorNumerador[i]/saldoDevedorDenominador[i]) * this.valorFinanciado);
        console.log('Saldo Devedor '+saldoDevedor[i]);


        if(i >0){
        taxaJuros.push(this.juros * saldoDevedor[i-1]);
        this.somaJuros = this.somaJuros + taxaJuros[i];
        console.log("total de juros " + this.somaJuros);
        console.log('Juros: if' +taxaJuros[i]);
        prestacao.push(taxaJuros[i]+amortizacao[i]);
        this.somaPrestacoes = this.somaPrestacoes +prestacao[i];
        console.log("total de prestacoes: " + this.somaPrestacoes);
        console.log('Valor da prestacao: '+prestacao[i]);

        }else{
        taxaJuros.push(0);
        prestacao.push(0);
      }

                grid.push({
                 periodo:i,
                 taxa:parseFloat(taxaJuros[i]).toFixed(2),
                 prestacao:parseFloat(prestacao[i]).toFixed(2),
                 saldoDevedor:parseFloat(saldoDevedor[i]).toFixed(2),
                 totalJuros:parseFloat(this.somaJuros).toFixed(2),
                 totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2)
        })
      }
      return grid;
  }
  return Financiamento;
})();
