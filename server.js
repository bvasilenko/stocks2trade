//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var scrumbler = require('./investertech-scrumbler');

router.use(express.static(path.resolve(__dirname, 'client')));
router.get('/api/v1/links/:mknum', function (req, res) {
  
  var MIN_PRICE = 30;
  var MKNUM = +req.params.mknum;
  
  var winner1day = 'http://www.investertech.com/selects/report.asp?MinPrice=' + MIN_PRICE + '&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=1&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=1000&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=1&updn=Asc&action=Screen&gy=0&GroupBy=3&prd=p&mknum=' + MKNUM;
  var loser1day = 'http://www.investertech.com/selects/report.asp?MinPrice=' + MIN_PRICE + '&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=1&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=1000&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=1&updn=Asc&action=Screen&gy=0&GroupBy=5&prd=p&mknum=' + MKNUM;
  var winner5day = 'http://www.investertech.com/selects/report.asp?MinPrice=' + MIN_PRICE + '&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=0&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=3&updn=Desc&action=Screen&gy=0&GroupBy=3&prd=p1&mknum=' + MKNUM;
  var loser5day = 'http://www.investertech.com/selects/report.asp?MinPrice=' + MIN_PRICE + '&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=2&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=3&updn=Asc&action=Screen&gy=0&GroupBy=5&prd=p1&mknum=' + MKNUM;
  var range1day = 'http://www.investertech.com/selects/report.asp?MinPrice=' + MIN_PRICE + '&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=2&MinNet=1.5&MaxNet=3.0&cRng=on&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=2&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=1000&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=1&updn=Asc&action=Screen&gy=0&GroupBy=7&prd=p&mknum=' + MKNUM;
  var range5day = 'http://www.investertech.com/selects/report.asp?MinPrice=' + MIN_PRICE + '&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=2&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=25&updn=Desc&action=Screen&gy=0&GroupBy=7&prd=p1&mknum=' + MKNUM;
  var newHigh52w = 'http://www.investertech.com/selects/report.asp?MinPrice=' + MIN_PRICE + '&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=1&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=1000&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&gy=1&GroupBy1=13&by=3&updn=Desc&action=Screen&GroupBy=1&prd=p&mknum=' + MKNUM;
  var newLow52w = 'http://www.investertech.com/selects/report.asp?MinPrice=' + MIN_PRICE + '&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=1&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=1000&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&gy=1&GroupBy1=14&by=3&updn=Asc&action=Screen&GroupBy=1&prd=p&mknum=' + MKNUM;

  scrumbler.getAllTickers([
    winner1day,
    winner5day,
    range1day,
    range5day,
    newHigh52w,
  ], function (winners) {
    scrumbler.getAllTickers([
      loser1day,
      loser5day,
      newLow52w,
    ], function (losers) {
      
      var resultFormat = 'https://finviz.com/screener.ashx?v=351&f=ipodate_more1,sh_avgvol_o750,sh_price_o10,ta_averagetruerange_o0.75&ft=4&t={TICKERS}&o=-averagetruerange';
      var resultFormatLong = 'https://stocks2trade-dreaktor.c9users.io/gallery.html?tickers={TICKERS}';
      var resultFormatLong2 = 'https://finviz.com/screener.ashx?v=351&f=ipodate_more1,sh_avgvol_o750,ta_averagetruerange_o0.75,ta_sma200_pa,ta_sma50_sa200&ft=4&t={TICKERS}&o=-averagetruerange';
      var resultFormatShort = 'https://stocks2trade-dreaktor.c9users.io/gallery.html?tickers={TICKERS}';
      var resultFormatShort2 = 'https://finviz.com/screener.ashx?v=351&f=ipodate_more1,sh_avgvol_o750,ta_averagetruerange_o0.75,ta_sma200_pb,ta_sma50_sb200&ft=4&t={TICKERS}&o=-averagetruerange';
      var resultFormat3 = 'https://trades.mindspace.ru/gallery?i=ch&ss={TICKERS}&sz=on&o=trend';

      res.send({
        links: [
          {
            text: 'ALL - Finviz',
            src: resultFormat.replace(/{TICKERS}/g,  winners.concat(losers).join(',')),
            description: winners.concat(losers).join(', '),
          },
          {
            text: 'ALL - TMS',
            src: resultFormat3.replace(/{TICKERS}/g,  winners.join(',')),
          },
          {
            text: 'LONG - Ticker gallery',
            src: resultFormatLong.replace(/{TICKERS}/g,  winners.join(',')),
            description: winners.join(', '),
          },
          {
            text: 'LONG - Finviz',
            src: resultFormatLong2.replace(/{TICKERS}/g,  winners.join(',')),
          },
          {
            text: 'SHORT - Ticker gallery',
            src: resultFormatShort.replace(/{TICKERS}/g,  losers.join(',')),
            description: losers.join(', '),
          },
          {
            text: 'SHORT - Finviz',
            src: resultFormatShort2.replace(/{TICKERS}/g,  losers.join(',')),
          },
        ]
      });
    });
  });
  
  
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
