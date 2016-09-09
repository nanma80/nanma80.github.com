$("#upperbound").keyup(function(event){
    if(event.keyCode == 13){
        $("#reload-record").click();
    }
});

$("#target-number").keyup(function(event){
    if(event.keyCode == 13){
        $("#single-record-query").click();
    }
});

$("#digit").keyup(function(event){
    if(event.keyCode == 13){
        $("#single-record-query").click();
    }
});

loadRecords = function() {
  var topN = 100;
  $(".new-records-table > tbody > tr").remove();
  var lowerbound = parseInt($("#lowerbound").val(), 10);
  var upperbound = parseInt($("#upperbound").val(), 10);
  var queryRange = [lowerbound, upperbound];
  var query = "{gte:" + queryRange[0] + ",lte:" + queryRange[1] + "}";

  $.ajax({
    url: "http://www.euclidea.xyz/api/v1/game/numbers/solutions/records?&query=" + query
  }).success(function(resp) {
    if (resp.records) {
      $.each(resp.records, function (index, record) { record.date = new Date(record.update_date); });
      resp.records.sort(function(record1, record2) { return record2.date - record1.date;});
      var tableLength = 0;
      $.each(resp.records, function (index, record) {
        if (tableLength < topN)
          if (record.digits > '0')
            $(".new-records-table").find('tbody')
              .append($('<tr>')
                .append($('<td>')
                  .text(record.target + "#" + record.digits)
                ).append($('<td>')
                  .text(record.digits_count)
                ).append($('<td>')
                  .text(record.date)
                )
              );
        tableLength ++;
      });
    }
  });
};

clearQueryHistory = function() {
  $(".single-record-table > tbody > tr").remove();
};

singleRecordQuery = function() {
  var targetNumber = parseInt($("#target-number").val(), 10);
  var digit = parseInt($("#digit").val(), 10);
  var query = "[" + targetNumber + "," + digit + "]";

  $.ajax({
    url: "http://www.euclidea.xyz/api/v1/game/numbers/solutions/records?&query=" + query
  }).success(function(resp) {
    if (resp.records.length > 0) {
      $.each(resp.records, function (index, record) {
        record.date = new Date(record.update_date);

        $(".single-record-table").find('tbody')
          .prepend($('<tr>')
            .append($('<td>')
              .text(record.target + "#" + record.digits)
            ).append($('<td>')
              .text(record.digits_count)
            ).append($('<td>')
              .text(record.date)
            )
          );
      });
    } else {
      $(".single-record-table").find('tbody')
          .prepend($('<tr>')
            .append($('<td>')
              .text(targetNumber + "#" + digit)
            ).append($('<td>')
              .text('-')
            ).append($('<td>')
              .text('-')
            )
          );
    }
  });
};

loadContest = function() {
  $.ajax({
    url: "http://www.euclidea.xyz/api/v1/game/numbers/challenges/now"
  }).success(function(resp) {
    $("#contest-number").text(resp.number);
    $("#contest-gold").text(resp.gold);
    $("#contest-silver").text(resp.silver);
    $("#contest-bronze").text(resp.bronze);

    var query = "{gte:" + resp.number + ",lte:" + resp.number + "}";
    $.ajax({
      url: "http://www.euclidea.xyz/api/v1/game/numbers/solutions/records?&query=" + query
    }).success(function(contestNumberResp) {
      $(".contest-table > tbody > tr").remove();
      if (contestNumberResp.records) {
        contestNumberResp.records.sort(function(record1, record2) { return record2.digits - record1.digits;});

        $.each(contestNumberResp.records, function (index, record) {
          record.date = new Date(record.update_date);

          $(".contest-table").find('tbody')
            .prepend($('<tr>')
              .append($('<td>')
                .text(record.target + "#" + record.digits)
              ).append($('<td>')
                .text(record.digits_count)
              ).append($('<td>')
                .text(record.date)
              )
            );
        });
      }

    });
  });
};

loadRecords();
loadContest();
