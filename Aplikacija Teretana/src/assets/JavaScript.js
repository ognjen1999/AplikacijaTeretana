function chart(){
    var local = JSON.parse(localStorage.getItem("vrednostClanarine"))

   var ukupnoObrisanihClanova = JSON.parse(localStorage.getItem("ukupnoObrisanihClanova"))
   var ukupnoSvihClanova = JSON.parse(localStorage.getItem("ukupnoSvihClanova"));
   var trenutnoAktivnihVezbaca = JSON.parse(localStorage.getItem("trenutnoAktivnihVezbaca"));
  
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
          var data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['Trenutno aktivnih vezbaca',    parseInt(trenutnoAktivnihVezbaca)],
              ['Ukupan broj svih clanova', parseInt(ukupnoSvihClanova)],
              ['Ukupno obrisanih',  parseInt(ukupnoObrisanihClanova)],
          ]);
          
          var options = {
            title: 'Statistika na ukupnom nivou',
            is3D: true,
          };
  
          var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
          chart.draw(data, options);
          console.log(parseInt(local));
      }
  }