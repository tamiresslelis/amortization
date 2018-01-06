function getMoney( str )
{
        return parseInt( str.replace(/[\D]+/g,'') );
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

var Financiamento = (function() {

  function Financiamento(model) {


    if(model.valorFinanciado != 0){
          var int = getMoney(model.valorFinanciado );
          var formatoReal = formatReal( int ) ;
          this.valorFinanciado = somenteNumeros(formatoReal);
    }
    //taxa mensal quando se tem a anual
    this.juros = (((Math.pow((1+(model.juros)),1/12)-1)*100)/100);
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
    for(var i=0; i <= this.periodoTotal; i++){
          saldoDevedor.push(parseFloat(((this.periodoTotal-i) / this.periodoTotal) * this.valorFinanciado).toFixed(2));

          if(i >0){
            taxaJuros.push(this.juros * saldoDevedor[i-1]);
            this.somaJuros = this.somaJuros + taxaJuros[i];
            prestacao.push(parseFloat(taxaJuros[i] + amortizacao).toFixed(2));
            this.somaPrestacoes = this.somaPrestacoes + (taxaJuros[i] + amortizacao);
            //console.log(" Total de prestações "+this.somaPrestacoes);
            //console.log("Prestação  " +prestacao[i])

          }else{
          taxaJuros.push(0);
          prestacao.push(0);
        }

               grid.push({
               periodo:i,
               taxa:parseFloat(taxaJuros[i]).toFixed(2),
               prestacao:formatReal(prestacao[i]),
               saldoDevedor:formatReal(saldoDevedor[i]),
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
        saldoDevedor.push(parseFloat((saldoDevedorNumerador[i]/saldoDevedorDenominador[i]) * this.valorFinanciado).toFixed(2));
        //console.log("saldoDevedor "+ saldoDevedor[i]);

        if(i >0){
                taxaJuros.push(this.juros * saldoDevedor[i-1]);
                this.somaJuros = this.somaJuros + taxaJuros[i];
                prestacao.push(parseFloat(taxaJuros[i] + amortizacao[i]).toFixed(2));
                this.somaPrestacoes = this.somaPrestacoes +(taxaJuros[i] + amortizacao[i]);

        }else{
              taxaJuros.push(0);
              prestacao.push(0);
      }
                grid.push({
                       periodo:i,
                       taxa:parseFloat(taxaJuros[i]).toFixed(2),
                       prestacao:formatReal(prestacao[i]),
                       saldoDevedor:formatReal(saldoDevedor[i]),
                       totalJuros:parseFloat(this.somaJuros).toFixed(2),
                       totalParcelas:parseFloat(this.somaPrestacoes).toFixed(2)
        })
      }
      return grid;
  }
  return Financiamento;
})();
