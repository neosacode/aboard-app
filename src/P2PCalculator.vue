<template>
    <div id="p2p-calculator">
        <h3 class="font-weight-bold mb-3"><i class="fas fa-people-carry"></i> P2P</h3>

        <!--<b-dropdown text='De "BTC"' variant="dark mr-2"></b-dropdown>-->

        <!--<i class="far fa-question-circle text-dark d-inline-block mr-2"></i>-->

        <!--<b-dropdown text='Para "BRL"' variant="dark mr-2"></b-dropdown>-->

        <!--<i class="far fa-question-circle text-dark d-inline-block mr-2"></i>-->

        <b-card class="mt-3 bg-gray-900 text-white">

        <b-form-checkbox v-model="is_extra">Tratar comissão como adicional</b-form-checkbox><br>
        <small>Utilizar esta opção sempre que a comissão for tratada como adicional, e não como desconto da negociação</small>

        <hr class="bg-dark row mt-4 mb-4">

        <b-row>
        <b-col sm="6">
          <label>quantidade <i class="far fa-question-circle"></i></label>
          <b-input-group prepend="BTC">
            <b-form-input type="number" class="shadow" placeholder="0,00000000" v-model="qty"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="6">
          <label>preço unitário <i class="far fa-question-circle"></i></label>
          <b-input-group prepend="BRL">
            <b-form-input type="number" class="shadow" placeholder="0,00" v-model="price"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="6 mt-3">
          <label>comissão em % <i class="far fa-question-circle"></i></label>
          <b-input-group prepend="BRL">
            <b-form-input type="number" class="shadow" placeholder="Ex: 1,5 = 1,5%" v-model="percent_comission"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="6 mt-3">
          <label>comissão fixa <i class="far fa-question-circle"></i></label>
          <b-input-group prepend="BRL">
            <b-form-input type="number" class="shadow" placeholder="0,00"  v-model="fix_comission"></b-form-input>
          </b-input-group>
        </b-col>
        </b-row>

        <hr class="bg-dark row mt-4 mb-4">

        <b-row>
            <b-col sm="6" class="text-right">
              quantidade comprador
              <h5 class="mb-3">{{ buyer_qty }} BTC</h5>
            </b-col>
            <b-col sm="6" class="text-right">
              quantidade vendedor
              <h5 class="mb-3">{{ seller_qty }} BTC</h5>
            </b-col>
            <b-col sm="6" class="text-right">
              parte comprador
              <h5>{{ total_buyer }} BRL</h5>
            </b-col>
            <b-col sm="6" class="text-right">
              parte vendedor
              <h5>{{ total_seller }} BRL</h5>
            </b-col>
        </b-row>

        <hr class="bg-dark row mt-4 mb-4">

        <b-row>
            <b-col sm="4">
                <b-dropdown text="Exportar" disabled variant="warning">
                  <b-dropdown-item><i class="fas fa-file-excel"></i> Excel</b-dropdown-item>
                  <b-dropdown-item><i class="fa fa-image"></i> Imagem</b-dropdown-item>
                  <b-dropdown-item><i class="fas fa-file-pdf"></i> PDF</b-dropdown-item>
                </b-dropdown>
            </b-col>
            <b-col sm="8" class="text-right">
                <h3 class="mb-0">{{ final_qty }} BTC</h3>
                <small>QUANTIDADE FINAL</small>
                <h3 class="mb-0">{{ total }} BRL</h3>
                <small>TOTAL</small>
            </b-col>
        </b-row>


        </b-card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                qty: null,
                price: null,
                percent_comission: null,
                fix_comission: null,
                is_extra: false
            }
        },
        computed: {
            buyer_qty: function () {
                let qty = this.qty || 0;
                let price = this.price || 0;
                let percent_comission = this.percent_comission || 0;
                let fix_comission = this.fix_comission || 0;
                let buyer_price = (((qty * price) * parseFloat((100 - percent_comission) / 100)) - fix_comission).toFixed(8);

                if (!this.is_extra) {
                    var buyer_qty = (buyer_price / price).toFixed(8);
                }
                else {
                    var buyer_qty = parseFloat(qty).toFixed(8);
                }

                return isNaN(buyer_qty) ? (0).toFixed(8) : buyer_qty;
            },
            seller_qty: function () {
                let qty = this.qty || 0;
                let price = this.price || 0;
                let percent_comission = this.percent_comission || 0;
                let fix_comission = this.fix_comission || 0;
                let buyer_price = (((qty * price) * parseFloat((100 - percent_comission) / 100)) - fix_comission).toFixed(8);
                let seller_qty = (qty - (buyer_price / price)).toFixed(8) || 0;
                return isNaN(seller_qty) ? (0).toFixed(8) : seller_qty;
            },
            total_buyer: function () {
                let qty = this.qty || 0;
                let price = this.price || 0;
                let percent_comission = this.percent_comission || 0;
                let fix_comission = this.fix_comission || 0;

                if (!this.is_extra) {
                    var buyer_price = (((qty * price) * parseFloat((100 - percent_comission) / 100)) - fix_comission).toFixed(8);
                }
                else {
                    var buyer_price = (qty * price).toFixed(8);
                }

                return buyer_price || 0;
            },
            total_seller: function () {
                let qty = this.qty || 0;
                let price = this.price || 0;
                let total = qty * price;
                let percent_comission = this.percent_comission || 0;
                let fix_comission = this.fix_comission || 0;
                let buyer_price = (((qty * price) * parseFloat((100 - percent_comission) / 100)) - fix_comission).toFixed(8);

                if (!this.is_extra) {
                    var total_seller = (total - buyer_price).toFixed(8)
                }
                else {
                    let comission = total * parseFloat(percent_comission / 100);
                    var total_seller = (parseFloat(fix_comission) + parseFloat(comission)).toFixed(8);
                }

                return total_seller || 0;
            }
            ,
            total: function () {
                let qty = this.qty || 0;
                let price = this.price || 0;
                let percent_comission = this.percent_comission || 0;
                let fix_comission = this.fix_comission || 0;

                if (!this.is_extra) {
                    var total = qty * price;
                }
                else {
                    var total = parseFloat(((qty * price) * (parseFloat(percent_comission / 100) + 1))) + parseFloat(fix_comission);
                }

                return parseFloat(total).toFixed(8) || 0;
            },
            final_qty: function () {
                let qty = this.qty || 0;
                let price = this.price || 0;
                let percent_comission = this.percent_comission || 0;
                let fix_comission = this.fix_comission || 0;


                if (!this.is_extra) {
                    var final_qty = qty;
                }
                else {
                    var final_qty = (qty * (parseFloat(percent_comission / 100) + 1)) + (fix_comission / price);
                }


                return parseFloat(final_qty).toFixed(8) || 0;
            },
        }
    }
</script>