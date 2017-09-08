queue()
   .defer(d3.json, "/bitcoin/project")
   .await(makeGraphs);
 
function makeGraphs(error, bitcoinJson) {
    
   //Create a Crossfilter instance
   var ndx = crossfilter(bitcoinJson);
 
   // Compare Market Prices By Year
    var yearDim = ndx.dimension(function (d) {
        return d["Date"];
    });

    var bitcoin_per_year = yearDim.group().reduceSum(function (d) {
        return d["MarketPrice"];
    });

    var gold_per_year = yearDim.group().reduceSum(function (d) {
        return d["GOLD/USD"];
    });

    var oil_per_year = yearDim.group().reduceSum(function (d) {
        return d["Brent Oil/USD"];
    });

    var newCompositeChart = dc.compositeChart("#newCompositeChart");

    newCompositeChart
        .width(800)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .x(d3.time.scale().domain([2009,2017]))
        .elasticY(true)
        .yAxisLabel("USDollars")
        .compose([
            dc.lineChart(newCompositeChart)
                .dimension(yearDim)
                .colors('black')
                .group(oil_per_year, 'Oil'),
            dc.lineChart(newCompositeChart)
                .dimension(yearDim)
                .colors('red')
                .group(gold_per_year, 'Gold'),
            dc.lineChart(newCompositeChart)
                .dimension(yearDim)
                .colors('green')
                .group(bitcoin_per_year, 'Bitcoin')
        ]);


   //Bitcoin Market Price By Year

    var bitcoin_mktprice = yearDim.group().reduceSum(function (d) {
        return d["MarketPrice"];});

    var priceByYearChart = dc.barChart("#price-by-year-chart");

    priceByYearChart
        .width(800)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(yearDim)
        .group(bitcoin_mktprice)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(4);



    // Trade Volume By Year
    var trade_vol = yearDim.group().reduceSum(function (d) {
        return d["TradeVolumeUSDExchange"];
    });

    var volByYearChart = dc.lineChart("#vol-by-year-chart");

    volByYearChart
        .width(800)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(yearDim)
        .group(trade_vol)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(4);

    // Total Transaction Amount By Year
    var total_txn_by_year = yearDim.group().reduceSum(function (d) {
        return d["TotalTransactions"];
    });
    
    var totalTransactionsByYearChart = dc.pieChart("#total-transaction-by-year-chart");

    totalTransactionsByYearChart
        .height(220)
        .radius(90)
        .transitionDuration(1500)
        .dimension(yearDim)
        .group(total_txn_by_year);


    // Total Bitcoin in Circulation Amount By Year
    var total_circ_by_year = yearDim.group().reduceSum(function (d) {
        return d["TotalinCirculation"];
    });
    
    var totalCirculationByYearChart = dc.pieChart("#total-circulation-by-year-chart");

    totalCirculationByYearChart
        .height(220)
        .radius(90)
        .transitionDuration(1500)
        .dimension(yearDim)
        .group(total_circ_by_year);



    //Average Daily Transaction Number  

    var Average_Daily_Trans_Dim = ndx.dimension(function (d) {
       return d["TotalDailyTransactions"];
    });

    var Average_Summed_Up = Average_Daily_Trans_Dim.groupAll().reduceSum(function (d) {
        return d["TotalDailyTransactions"];
    });
    
    var avg_Daily_trans = dc.numberDisplay("#total-daily-transactions");

    avg_Daily_trans
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(Average_Summed_Up)
        .formatNumber(d3.format(".3s"));


    //Average Annual Transaction Number  

    var Average_Daily_Trans_Dim = ndx.dimension(function (d) {
       return d["TotalTransactions"];
    });

    var Average_Summed_Up = Average_Daily_Trans_Dim.groupAll().reduceSum(function (d) {
        return d["TotalTransactions"];
    });
    
    var avg_Daily_trans = dc.numberDisplay("#total-transactions");

    avg_Daily_trans
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(Average_Summed_Up)
        .formatNumber(d3.format(".3s"));

    
    //Bitcoin Transactions Avg Vol By Year

    var bitcoin_transactions = yearDim.group().reduceSum(function (d) {
        return d["TotalTransactions"];});

    var trans_avg_volChart = dc.barChart("#avgtrans-by-year-chart");

    trans_avg_volChart
        .width(800)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(yearDim)
        .group(bitcoin_transactions)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(4);

    //Total Transaction Fees in USD  

    var Total_Tran_Fee_Dim = ndx.dimension(function (d) {
       return d["TotalTransactionFeesinUSD"];
    });

    var Average_Summed_Up = Total_Tran_Fee_Dim.groupAll().reduceSum(function (d) {
        return d["TotalTransactionFeesinUSD"];
    });
    
    var avg_Daily_trans = dc.numberDisplay("#total-transactions-fees");

    avg_Daily_trans
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(Average_Summed_Up)
        .formatNumber(d3.format(".3s"));

    
    //Average Cost per Transaction in USD  

    var Average_Daily_Trans_Dim = ndx.dimension(function (d) {
       return d["CostperTransactionUSD"];
    });

    var Average_Summed_Up = Average_Daily_Trans_Dim.groupAll().reduceSum(function (d) {
        return d["CostperTransactionUSD"];
    });
    
    var avg_trans_cost = dc.numberDisplay("#cost-per-transaction");

    avg_trans_cost
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(Average_Summed_Up)
        .formatNumber(d3.format(".3s"));

   //Market Cap

    var MarketCapDim = ndx.dimension(function (d) {
       return d["MarketCap"];
   });

   var Market_Capitalisation = yearDim.group().reduceSum(function (d) {
        return d["MarketCap"];});

   var Mkt_Cap_Chart = dc.rowChart("#Market-Cap");

   Mkt_Cap_Chart
       .width(800)
       .height(250)
       .dimension(yearDim)
       .group(Market_Capitalisation)
       .xAxis().ticks(8);

   dc.renderAll();
}