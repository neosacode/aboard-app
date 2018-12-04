<template>
    <div id="arbitrage">
        <h3 class="font-weight-bold mb-3"><i class="fas fa-exchange-alt"></i> ARBITRAGEM</h3>

          <b-row>
            <b-col class="mb-2">

              <div>

                  <b-row>
                    <b-col sm="12">
                      <b-dropdown text="Exchanges" variant="dark mr-2">
                        <b-form-checkbox @click.native="mark_all" class="dropdown-item pl-5 pr-5" v-model="mark_status">
                          <span>Des/marcar todas</span>
                        </b-form-checkbox>
                        <b-dropdown-divider></b-dropdown-divider>
                        <div class="dropdown-scrollable" style="overflow-x: hidden; max-height: 200px;">
                          <b-form-checkbox class="dropdown-item pl-5 pr-5" :value="ex.slug" :id="ex.slug" v-model="exchanges_filter" v-for="ex in exchanges">
                            <span v-text="ex.name"></span>
                            <img :src="ex.icon" height="20" class="ml-1">
                          </b-form-checkbox>
                          </div>
                      </b-dropdown>

                      <i class="far fa-question-circle text-dark d-inline-block mr-2"></i>

                      <b-dropdown text="Pares" variant="dark">
                        <b-form-checkbox class="dropdown-item pl-5 pr-5" value="BTC-USDT" v-model="pairs" disabled>BTC-USDT</b-form-checkbox>
                      </b-dropdown>

                      <i class="far fa-question-circle text-dark d-inline-block ml-2"></i>
                    </b-col>
                    <!--<b-col sm="12" class="mt-3 mb-2">-->
                      <!--<b-row>-->
                        <!--<b-col>-->
                          <!--<b-input-group prepend="BTC">-->
                            <!--<b-form-input size="lg" disabled type="number" placeholder="0,00000000"></b-form-input>-->
                          <!--</b-input-group>-->
                        <!--</b-col>-->
                        <!--<b-col>-->
                          <!--<b-input-group prepend="USDT">-->
                            <!--<b-form-input size="lg" disabled type="number" placeholder="0,00"></b-form-input>-->
                          <!--</b-input-group>-->
                        <!--</b-col>-->
                      <!--</b-row>-->
                    <!--</b-col>-->
                  </b-row>
              </div>
            </b-col>
          </b-row>

          <b-list-group class="mt-2">
            <b-list-group-item :class="{'text-dark': index == 0, 'text-white': index != 0, 'bg-gray-900': index != 0, 'list-group-item-warning': index == 0}" v-for="(frct, index) in forecast">
              <div class="w-100" v-if="frct.x_price < frct.y_price">
                Compre na <strong>{{ frct.x_provider }}</strong> por {{ frct.x_price_human }}<br>
                Venda na <strong>{{ frct.y_provider }}</strong> por {{ frct.y_price_human }}
              </div>
              <div class="w-100" v-if="frct.x_price >= frct.y_price">
                Compre na <strong>{{ frct.y_provider }}</strong> por {{ frct.y_price_human }}<br>
                Venda na <strong>{{ frct.x_provider }}</strong> por {{ frct.x_price_human }}
              </div>
              <h4 class="mb-1" v-if="index == 0">
                Lucro: <strong>{{ frct.profit_human }}</strong>
              </h4>
              <h5 class="mb-1" v-if="index != 0">
                Lucro: <strong>{{ frct.profit_human }}</strong>
              </h5>
            </b-list-group-item>
          </b-list-group>

          <small class="mt-2 d-inline-block"><i class="fas fa-history"></i> Dados atualizados a cada 5 segundos</small>
    </div>
</template>

<script>
     export default {
      data () {
        return {
          exchange: null,
          pair: null,
          exchanges: [],
          exchanges_filter: [],
          pairs: [],
          forecast: [],
          mark_status: true,
        }
      },
      mounted () {
        let vm = this;
        vm.pairs.push('BTC-USDT');

        this.axios.get('http://localhost:8000/api/v1/exchange').then((response) => {
          vm.exchanges = response.data;
          vm.exchanges.forEach((ex) => {
             vm.exchanges_filter.push(ex.slug);
          });

          vm.refresh_forecast();

          setInterval(function () {
            vm.refresh_forecast();
          }, 5000);
        });
      },
      methods: {
          refresh_forecast () {
              let vm = this;

              if (vm.exchanges_filter.length == 0) {
                  vm.forecast = [];
                  return;
              }

              let providers = vm.exchanges_filter.join(',');
              this.axios.get('http://localhost:8000/api/v1/forecast?providers=' + providers).then((response) => {
                vm.forecast = response.data.slice(0, 5);
              });
          },
          mark_all () {
              let vm = this;

              if (!vm.mark_status) {
                vm.exchanges_filter = [];

                vm.exchanges.forEach((ex) => {
                   vm.exchanges_filter.push(ex.slug);
                });
              }
              else {
                vm.exchanges_filter = [];
              }
          },
          toggle_mark () {
              let vm = this;

              if (vm.exchanges_filter.length < vm.exchanges.length) {
                  this.mark_status = false;
              }
              else {
                  this.mark_status = true;
              }
          }
      },
      watch: {
          exchanges_filter () {
              this.toggle_mark();
          }
      }
  }
</script>