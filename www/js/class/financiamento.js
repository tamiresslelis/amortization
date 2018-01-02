var Financiamento = (function() {


  function Financiamento(model) {

    //taxa mensal quando se tem a anual

    this.juros = (((Math.pow((1+(model.juros)),1/12)-1)*100)/100);
    this.valorFinanciado = model.valorFinanciado;
    console.log("valor do financiado"+this.valorFinanciado);
    this.periodoTotal = model.periodo;
    this.somaJuros = 0;
    this.somaPrestacoes = 0;

  };

  Financiamento.prototype.sac = function () {
    var saldoDevedor = [];
    var prestacao = [];
    var taxaJuros = [];
    var grid= [];
    var totalParcelas = [];
      var amortizacao = (this.valorFinanciado / this.periodoTotal);
    if(this.periodoTotal == 0){
      saldoDevedor.push(this.valorFinanciado);

    }

    console.log('Amortizacao'+amortizacao);

    for(var i=0; i <= this.periodoTotal; i++){
    saldoDevedor.push(parseFloat(((this.periodoTotal-i) / this.periodoTotal) * this.valorFinanciado).toFixed(4));

          if(i >0){
            taxaJuros.push(this.juros * saldoDevedor[i-1]);
            this.somaJuros = this.somaJuros + taxaJuros[i];
            prestacao.push(taxaJuros[i] + amortizacao);
            this.somaPrestacoes = this.somaPrestacoes +prestacao[i];

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

    }
    for(var i=0; i <= this.periodoTotal; i++){

        amortizaoNumerador.push((Math.pow((1+this.juros),i-1)));
        amortizacaoDenominador.push(((Math.pow(1+this.juros,this.periodoTotal)-1)));
        amortizacao.push((amortizaoNumerador[i]/amortizacaoDenominador[i]) * (this.valorFinanciado * this.juros));
        saldoDevedorNumerador.push(1-(Math.pow((1+this.juros),(this.periodoTotal-i)*(-1))));
        saldoDevedorDenominador.push(1-(Math.pow((1+this.juros),(this.periodoTotal)*(-1))));
        saldoDevedor.push((saldoDevedorNumerador[i]/saldoDevedorDenominador[i]) * this.valorFinanciado);

        if(i >0){
        taxaJuros.push(this.juros * saldoDevedor[i-1]);
        this.somaJuros = this.somaJuros + taxaJuros[i];
        prestacao.push(taxaJuros[i]+amortizacao[i]);
        this.somaPrestacoes = this.somaPrestacoes +prestacao[i];


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
