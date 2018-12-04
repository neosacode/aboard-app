<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark mb-4">
      <a class="navbar-brand" href="#"><img src="/criptoaboard-white.png" width="200"></a>
    </nav>

    <b-container fluid class="mt-4">
      <b-row>
        <b-col lg="3">
          <b-row>
            <b-col lg="12">
              <Arbitrage></Arbitrage>
            </b-col>

            <b-col lg="12">
              <P2PCalculator class="mt-4"></P2PCalculator>
            </b-col>
          </b-row>
        </b-col>

        <b-col lg="6"></b-col>

        <b-col lg="3">
          <b-row>
            <b-col>
              <h3 class="font-weight-bold mb-3"><i class="fas fa-fire"></i> SINAIS</h3>

              <b-button-group>
                <b-button variant="dark" disabled>Binance</b-button>
                <b-button variant="dark">Bittrex</b-button>
              </b-button-group>

              <b-dropdown variant="primary" right text="% mínima (3%)" class="ml-3">
                <b-form-radio class="dropdown-item pl-5 pr-5" name="min_percent" v-model="min_percent">
                  <span>3%</span>
                </b-form-radio>
                <b-form-radio class="dropdown-item pl-5 pr-5" name="min_percent" v-model="min_percent">
                  <span>5%</span>
                </b-form-radio>
                <b-form-radio class="dropdown-item pl-5 pr-5" name="min_percent" v-model="min_percent">
                  <span>10%</span>
                </b-form-radio>
              </b-dropdown>

              <b-row class="mt-3">
                <b-col sm="6" v-for="n in [1, 2, 3, 4, 5, 6]">
                    <b-card class="shadow-sm border-top-3 text-center border-bottom-3 text-dark border-dark bg-white">
                      <div class="bg-dark card-top-header text-white font-weight-bold p-2 mb-3">
                        BTC / USD<br>
                        <small>LUCRO PREVISTO: 3%</small>
                      </div>
                      <h5 class="font-weight-bold"><i class="fas fa-angle-down"></i> compre</h5>
                      A 650 satoshis

                      <hr class="bg-white row mt-2 mb-2">

                      <h5 class="font-weight-bold"><i class="fas fa-angle-up"></i> venda</h5>
                      <strong>1:</strong> por 650 satoshis<br>
                      <strong>2:</strong> por 680 satoshis<br>
                      <strong>3:</strong> por 720 satoshis


                      <div class="bg-warning card-bottom-header text-dark font-weight-bold p-2 mb-3">
                        <h5 class="font-weight-bold"><i class="fas fa-ban"></i> stoploss</h5>
                        <strong>saia em</strong> 650 satoshis<br>
                      </div>
                    </b-card>

                    <p class="text-center mt-2"><small><i>Informado a 5 minutos atrás</i></small></p>
                  </b-col>
              </b-row>
            </b-col>
          </b-row>

        </b-col>
      </b-row>
    </b-container>


    <p class="mt-5 mb-5 text-center"><small><i>&copy; Todos os direitos reservados a <strong>Criptoaboard</strong>.</i></small></p>
  </div>
</template>

<script>
  import Arbitrage from './Arbitrage.vue'
  import P2PCalculator from './P2PCalculator.vue'

  export default {
      data() {
        return {
            min_percent: false
        }
      },
      components: {
          Arbitrage,
          P2PCalculator,
      }
  }
</script>

<style>

  .border-top-3 {
    border-top-width: 3px;
  }


  .border-bottom-3 {
    border-bottom-width: 3px !important;
  }

  .card-top-header {
    width: calc(100% + 40px);
    margin-left: -20px;
    margin-top: -20px;
  }

  .card-bottom-header {
    width: calc(100% + 40px);
    margin-top: -20px;
    margin-left: -20px;
    position: relative;
    bottom: -38px;
  }
</style>