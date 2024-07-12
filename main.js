// Google Apps Script code (Code.gs)
function doGet() {
    return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setFaviconUrl('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjt4-SgZZQCJz0MzAwdmSniHrWPg9L6NG2Hn14f13HSh1R0qj9uEqcMRMlP5tbN58hdE2XIK6KkX2tuLZ5zZpbcwHzjoYhwshBLRTvmXe9Nd4YLUfJbn93eS0SsSH7fKtVIl2Q3q8JiDviHms6sVGq1h45RjwJoy21MNYgFSCqcIkyPnEv50-j8w4PNdVVz/s3060/logo.png')
      .setTitle('CDS Payment Status')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }
  
  
  function getStatus(stateCode) {
      if (!stateCode) {
          return 'State code not provided.';
      }
  
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('List of persons that have paid');
      const data = sheet.getDataRange().getValues();
      
      Logger.log(`State Code Received: ${stateCode}`);
      Logger.log(`Data from Sheet: ${JSON.stringify(data)}`);
      
      let message = 'State code not found or no payment recorded.';
  
      for (let i = 1; i < data.length; i++) {
          Logger.log(`Checking row ${i}: ${data[i][2]}`);
          if (data[i][2] && data[i][2].trim() == stateCode.trim()) {
              message = 'Paid';
              break;
          }
      }
  
      Logger.log(`Message: ${message}`);
      return message;
  }
  