$(document).ready(function(){
  
    var cities = [
      {
        name: 'Boston',
        url: 'http://api.openweathermap.org/data/2.5/history/city?q=boston&type=day'
      },{
        name: 'NYC',
        url: 'http://api.openweathermap.org/data/2.5/history/city?q=nyc&type=day'
      },{
        name: 'Hong Kong',
        url: 'http://api.openweathermap.org/data/2.5/history/city?q=hongkong&type=day'
      }
    ];

  var Chart = function(cities){
    this.seriesData = [];
    this.cities = cities;
  };

  
  Chart.prototype.getData = function(name,url) {
    var data = [];
    $.ajax({
      context: this,
      type: 'GET',
      url: url,
      success: function(response){
        console.log(response);
        var items = response.list.sort();
        for (var i = 0; i < response.list.length; i++){
          data.push({
            x : new Date(i *1000),
            y : items[i].main.temp
          })
        }
        this.seriesData.push({name : name, data : data})
        this.drawChart();
      }
    });
  };

  Chart.prototype.drawChart = function() {
    var highchartconfig = {
      title: {
        text: 'Average Temperatures'
      },
      xAxis: {
        type: 'datetime' //Incomplete
      },
      series: this.seriesData
    }
    $('#chart').highcharts(highchartconfig);
  };
    
  Chart.prototype.drawAll = function() {
    this.cities.forEach(function(element){
      chart.getData(element.name,element.url);
    })
  };


  var chart = new Chart(cities);

  chart.drawAll();




})























